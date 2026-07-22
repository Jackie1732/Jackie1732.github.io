---
title: CONCOLLMIC：面向跨语言路径探索的 Agentic Concolic Execution
description: 解析CONCOLLMIC如何通过源码插桩、执行抽象、双Agent与具体验证扩展混合符号执行。
date: 2026-07-22
updated: 2026-07-22
permalink: /notes/papers/agentic-concolic-execution/
track: papers
content_type: paper-review
status: reviewed
audience: 关注动态符号执行、程序测试和LLM Agent的安全研究人员。
prerequisites: [符号执行, SMT求解, 模糊测试, LLVM基础]
categories: [security, program-analysis]
tags: [DSE, concolic-execution, KLEE, AFL++, LLM-agent, SMT, program-testing]
math: true
mermaid: false
article_tools: true
bibliography: true
toc: true
paper:
  title: Agentic Concolic Execution
  authors: Zhengxiong Luo, Huan Zhao, Dylan Wolff, Cristian Cadar, Abhik Roychoudhury
  venue: IEEE Symposium on Security and Privacy
  year: 2026
  arxiv: 2511.20555
  pdf: https://arxiv.org/pdf/2511.20555
  code: https://github.com/ConcoLLMic/ConcoLLMic
---

## 摘要

论文提出 Agentic Concolic Execution，并实现原型 CONCOLLMIC。系统以源码插桩记录具体执行轨迹，以执行抽象向 LLM Agent 提供路径相关证据，再由路径约束概括 Agent 和约束求解 Agent 生成下一轮测试驱动。其目标是降低传统动态符号执行对语言语义模型、运行时环境模型和大规模 SMT 公式的依赖。{% cite luo2026agenticconcolic %}

CONCOLLMIC 将每轮候选输入放回插桩程序中具体执行。候选输入只有到达目标分支或带来新增覆盖时才进入 WorkList。该闭环将 Agent 输出约束为可观察的运行时结果，并保留了输入、命令行参数、文件、环境变量和外部准备步骤组成的可复现测试驱动。

## 问题与研究定位

传统混合符号执行同时维护具体状态和符号状态。执行器将路径上的比较、算术和内存操作编码为公式，在分支处翻转一个条件，再请求 SMT 求解器构造新输入。KLEE 在 LLVM bitcode 层完成指令语义、符号内存和库函数模型的解释。循环路径组合、浮点运算、字符串、位级计算和外部环境交互共同扩大了建模与求解成本。

CONCOLLMIC 将分析粒度提升到源代码块、具体轨迹和高层路径语义。LLM Agent 负责理解目标分支与程序意图，Python、Z3 和编译工具负责数值计算、可满足性检查与环境准备。该设计覆盖了传统 DSE 中人工模型投入较大的环境约束，也保留具体验证作为测试输入的最终准入条件。

### 浮点动机实例

图 1 的程序接收两个命令行字符串，将其转换为单精度浮点数，并逐个枚举区间内可表示的浮点值。循环体通过复制浮点数位表示、递增整数表示、再复制回浮点变量的方式获得下一个可表示值。区间中的浮点值数量不超过 20 时，程序进入缺陷分支。

{% include figure.html
  src='/assets/figures/papers/agentic-concolic-execution/figure-1-motivating-example.png'
  alt='FP-Bench浮点动机示例及插桩语句'
  number='1'
  caption='FP-Bench中的浮点计数程序。蓝色语句表示源码级执行追踪插桩。'
  source='Agentic Concolic Execution'
  source_url='https://arxiv.org/pdf/2511.20555'
%}

从初始输入推导完整路径公式时，循环迭代会产生大量与浮点位向量有关的子句。CONCOLLMIC 先将目标表述为两个浮点数之间的可表示值少于 20 个，再由求解 Agent 调用 Python 计算相邻单精度浮点值，构造满足条件的具体端点。图 4 展示了该过程的实际工具调用轨迹。该实例说明系统将实现级约束提炼为高层约束，再将精确计算交给受控工具。

## 系统设计

### 源码插桩与执行抽象

系统在由条件分支和循环自然界定的源代码块边界插入带唯一标识符的追踪语句。插桩阶段产生两个工件：运行时输出块序列的插桩程序 $\widetilde{P}$，以及从文件路径和块标识符映射到函数与源代码行范围的映射 $M$。映射 $M$ 使运行时日志能够回链到对应的源代码位置。

给定输入 $I$，插桩程序输出执行轨迹 $T$。系统结合 $T$、$M$、源文件和覆盖记录生成执行抽象 $EA(\widetilde{P}\mid I)$。执行抽象保留函数调用关系、已执行块、未覆盖块、目标行和局部源代码上下文。它以较小的文本表示向 Agent 提供路径信息，也保留了按需请求更多代码片段的入口。

{% include figure.html
  src='/assets/figures/papers/agentic-concolic-execution/figure-2-workflow.png'
  alt='CONCOLLMIC插桩与测试流程'
  number='2'
  caption='CONCOLLMIC由插桩阶段和迭代测试阶段组成。灰色模块由LLM驱动。'
  source='Agentic Concolic Execution'
  source_url='https://arxiv.org/pdf/2511.20555'
%}

图 2 的阶段一对应插桩程序和映射 $M$ 的构建。阶段二从初始输入集合开始，具体执行维护覆盖信息，执行抽象驱动两个 Agent 生成候选输入，验证模块决定输入是否回流 WorkList。崩溃输入被单独记录，覆盖导向输入继续用于后续路径探索。

### 双 Agent 测试循环

路径约束概括 Agent 从执行抽象中选择未覆盖目标分支，读取相关代码，并生成自包含的高层路径约束。约束中包含输入格式、变量关系、运行条件和预期覆盖行。约束求解 Agent 将这些约束转化为 `harness.py` 中的测试驱动，并可调用 Python、Z3、编译器或本地命令准备精确数值和执行环境。

两类 Agent 的接口是路径约束。概括 Agent 解决应当翻转哪一条分支以及该路径需要满足什么语义条件，求解 Agent 解决如何构造具体输入和环境。每次生成后都执行目标程序，验证成功的输入成为后续搜索种子，失败候选在当前轮结束。

{% include figure.html
  src='/assets/figures/papers/agentic-concolic-execution/figure-4-agent-workflow.png'
  alt='概括Agent与求解Agent在浮点实例上的工作流'
  number='4'
  caption='两个Agent在浮点实例上的协同过程。概括Agent选择未覆盖分支并提炼约束，求解Agent通过代码执行计算具体浮点端点。'
  source='Agentic Concolic Execution'
  source_url='https://arxiv.org/pdf/2511.20555'
%}

图 4 左侧的概括 Agent 将未覆盖的缺陷分支归纳为三个条件：程序接收两个命令行参数，两个参数可解析为满足大小关系的浮点数，区间内可表示的单精度浮点数数量至多为 20。右侧求解 Agent 以初始值 1.0 为起点，执行 Python 代码计算第 20 个可表示值，并据此构造新的命令行输入。工具返回的计算结果进入后续动作历史，测试生成过程因而具有可检查的中间证据。

### 环境约束的构造能力

CONCOLLMIC 的测试驱动包含程序输入以外的环境状态。论文在 `bc` 中选择内存分配失败处理分支作为目标。正常执行很难使 `malloc` 返回空指针，求解 Agent 生成 C 语言分配器包装器，编译为共享库，并通过 `LD_PRELOAD` 拦截分配调用。包装器在预定次数后返回空指针，目标程序因而进入错误处理路径。

{% include figure.html
  src='/assets/figures/papers/agentic-concolic-execution/figure-6-environment-case.png'
  alt='bc内存分配失败环境约束案例'
  number='6'
  caption='bc案例中，求解Agent生成分配器包装库并利用LD_PRELOAD构造内存分配失败环境。'
  source='Agentic Concolic Execution'
  source_url='https://arxiv.org/pdf/2511.20555'
%}

该案例体现了论文的关键边界。Agent 可以通过工具组合构造外部状态，具体执行仍负责确认目标行是否实际到达。系统获得了环境操控能力，同时仍受限于本地依赖、权限、操作系统语义和测试环境的可复现性。

## 实验证据

### 单语言覆盖率

论文在 8 个 C/C++ 真实程序上使用 GCov 分支覆盖率进行比较。每个工具重复运行 5 次，单次预算为 48 小时。CONCOLLMIC 相对 KLEE、KLEE-Pending、SymCC、SymSan 的平均分支覆盖率分别提高 233%、135%、130% 和 115%，相对 AFL++ 提高 81%。{% cite luo2026agenticconcolic %}

{% include figure.html
  src='/assets/figures/papers/agentic-concolic-execution/figure-5-coverage.png'
  alt='八个C和C加加程序的GCov分支覆盖率增长曲线'
  number='5'
  caption='八个C/C++对象的GCov分支覆盖率增长。实线和阴影表示均值与标准差，虚线表示30分钟覆盖停滞后的CONCOLLMIC退出位置。'
  source='Agentic Concolic Execution'
  source_url='https://arxiv.org/pdf/2511.20555'
%}

图 5 中的红线表示 CONCOLLMIC。多个对象在前几个小时内快速达到较高覆盖，再因覆盖停滞提前退出。图中的比较关系说明方法将测试预算集中在较难的路径上，并不表示单个输入生成的吞吐量高于覆盖反馈模糊测试。论文将这种特征归因于高层约束推理和环境构造能力。

多语言评估覆盖 Python-C、Java-C、Python-Java 和 Go-C++ 组合。内部行覆盖率在 C/C++ 对象上与 GCov 行覆盖率的平均和中位相关系数均为 94%。相对初始输入，ultrajson、jansi、py4j 和 protobuf-go 的覆盖率分别增长 3.5 倍、8.2 倍、1.9 倍和 1.9 倍。该结果表明统一文本日志和源码插桩可以跨越不同运行时收集探索信号。

### 复杂约束、漏洞与验证

FP-Bench 的 26 个可测试程序用于评估复杂浮点约束。CONCOLLMIC 的平均分支覆盖率为 77.87%，KLEE-Float 为 64.81%，基础 KLEE 为 37.67%。论文将差异与高层约束概括、外部精确计算和工具调用结合使用联系起来。

漏洞评估在 C/C++ 对象中结合 AddressSanitizer 与 UndefinedBehaviorSanitizer，在多语言对象中使用运行时异常和崩溃作为检测信号。系统报告 11 个此前未知的问题，其中 9 个已被确认和修复。每个候选都通过记录输入、参数、环境设置和外部步骤的 `harness.py` 重新具体执行，复现验证构成报告漏洞前的必要环节。

### 插桩保真度与开销

覆盖驱动测试依赖内部追踪是否足以反映真实执行。图 8 左侧给出内部行覆盖率与 GCov 行覆盖率的相关性分布，平均和中位值均为 94%。右侧给出目标行验证结果，精确率为 84%，F1 值为 81%。

{% include figure.html
  src='/assets/figures/papers/agentic-concolic-execution/figure-8-fidelity.png'
  alt='CONCOLLMIC插桩覆盖追踪与目标行验证结果'
  number='8'
  caption='内部覆盖追踪与GCov覆盖结果的对照，以及目标行验证的混淆矩阵。'
  source='Agentic Concolic Execution'
  source_url='https://arxiv.org/pdf/2511.20555'
%}

插桩边界、未插桩控制流和 GCov 的统计规则会造成两类覆盖指标的差异。该测量说明内部覆盖可以用于搜索调度，也限定了其解释范围。论文报告的平均插桩成本为每千行代码 0.56 美元，平均生成一个测试输入耗时 69 秒、成本 0.21 美元。LLM 调用延迟使其输入吞吐量低于传统执行器。

## 局限性

CONCOLLMIC 不提供传统符号执行器的语义完备性或形式化健全性保证。块级日志和调用链重建存在近似，Agent 的路径约束也可能遗漏实现细节。具体验证确认的是当前构建、当前输入和当前环境中的实际可达性。

C/C++ 中的未定义行为还受编译选项影响。有符号整数溢出、无效指针访问等行为可能在优化阶段被删除或改写。AddressSanitizer 与 UndefinedBehaviorSanitizer 能报告实际执行到且仍存在于构建产物中的检测点，无法恢复编译优化已经删除的路径。论文以编译后的可执行程序为测试对象，未解决该类被优化删除的路径恢复问题。

## 总结

CONCOLLMIC 将混合符号执行组织为源码插桩、执行抽象、高层路径概括、工具增强求解和具体验证组成的闭环。该框架将环境设置纳入测试驱动，并以运行时结果筛选 Agent 生成的候选路径。它适合作为 fuzzing、传统符号执行和人工审计之间的补充路径探索组件。{% cite luo2026agenticconcolic %}
