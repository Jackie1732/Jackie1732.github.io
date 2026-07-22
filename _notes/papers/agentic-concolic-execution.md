---
title: Agentic Concolic Execution论文阅读
description: ConcoLLMic以源码插桩、执行抽象和工具增强LLM Agent扩展混合符号执行的环境建模与约束求解能力。
date: 2026-07-22
updated: 2026-07-22
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

论文提出Agentic Concolic Execution，并实现原型ConcoLLMic。系统以源码插桩获得具体执行轨迹，以执行抽象向LLM Agent提供路径相关证据，再由路径约束概括Agent和约束求解Agent生成下一轮测试驱动。其主要目标是降低传统动态符号执行对语言语义模型、运行时模型和大规模SMT公式的依赖。{% cite luo2026agenticconcolic %}

论文将具体执行验证放在每轮测试末尾。生成输入只有达到目标分支或带来新覆盖时才保留，因此LLM的错误约束和错误求解难以持续污染后续输入集合。该机制提供基于实际运行的反馈，分析结果仍受插桩粒度、编译结果、环境准备和LLM推理质量约束。

## 问题与研究定位

传统混合符号执行同时执行具体程序和符号程序。执行器将路径上的比较、算术和内存操作编码为约束，再翻转某个分支条件并请求SMT求解器构造新输入。KLEE等系统依赖LLVM bitcode语义、符号内存、库函数和POSIX环境模型实现该过程。循环分支组合、浮点、字符串、位级运算和外部系统交互会扩大建模和求解成本。

论文围绕两项困难展开：

1. 现代程序的语言构造和环境交互需要大量人工符号模型。文件、网络、命令行参数、动态库和外部服务共同影响可达路径。
2. 完整路径约束可能包含大量变量、位向量和条件。SMT求解在复杂数据格式、浮点和环境状态下容易成为探索瓶颈。

ConcoLLMic将符号化重心从逐条LLVM指令解释提升到源码块、具体轨迹和路径语义概括。LLM负责理解目标分支与高层条件，Python和Z3负责格式构造、精确计算和可满足性检查。系统因此形成以具体执行证据约束的Agent测试框架。{% cite luo2026agenticconcolic %}

## 核心系统

### 源码插桩与执行抽象

插桩模块按控制流边界划分源代码块，并插入带唯一标识符的轨迹语句。静态映射 $M$ 将块标识符关联到文件、函数和源码行范围。插桩程序运行后输出块序列，系统再利用 $M$ 和源代码构建执行抽象 $EA(\widetilde{P}\mid I)$。

执行抽象保存函数调用关系、已执行块、未覆盖块和路径相关源码位置。它为Agent提供足以选择目标分支的局部上下文，并避免将完整仓库或完整符号状态持续放入上下文。块级轨迹提供覆盖信息，函数调用链和精确控制流仍存在近似。

~~~text
测试输入 I
→ 插桩程序执行
→ 块ID轨迹 T
→ T + M + 源代码
→ 执行抽象 EA(Ṕ|I)
~~~

### 双Agent测试循环

路径约束概括Agent从执行抽象中选择当前路径上的目标分支，读取相关源码，输出目标分支、路径条件和预期新增覆盖行。约束求解Agent将路径条件转化为测试驱动。它可以直接推理简单条件，通过Z3处理位级和算术关系，并通过Python准备文件、参数、环境变量或外部服务。

每轮循环维护待探索输入集合WorkList。新输入经过具体执行验证后，目标翻转成功或产生新覆盖时进入WorkList。该筛选规则将LLM输出转化为可观察的运行时结果，并使失败候选在单轮内终止。

~~~text
EA(Ṕ|I)
→ 概括Agent选择分支并给出路径条件
→ 求解Agent生成harness.py与输入 I′
→ 具体执行验证
→ 新覆盖或目标可达时将 I′ 加入WorkList
~~~

## 与传统执行器的差异

KLEE在LLVM层构造精确的符号表达式，并在条件分支处创建可行状态。其优势来自形式化指令语义和SMT模型，限制来自路径爆炸、求解开销和环境模型覆盖范围。AFL++通过输入变异与覆盖反馈积累种子，具有高吞吐特征，复杂条件和环境状态通常需要较长的探索过程。

ConcoLLMic将环境操作保留在具体执行中。Agent可以构造动态库包装器、命令行参数、文件内容和环境变量等测试条件。bc案例通过生成malloc包装库并设置LD_PRELOAD，使分配调用返回空指针，从而覆盖内存分配失败处理分支。测试驱动同时包含运行环境和字节输入。{% cite luo2026agenticconcolic %}

系统未提供传统符号执行器的完整语义健全性。LLM生成的路径条件属于高层概括，具体执行验证确认输入效果。验证失败的候选会被舍弃，验证成功也只证明当前构建、当前环境和当前输入下的行为。

## 实验证据

单语言C/C++实验以GCov分支覆盖率为统一指标。ConcoLLMic相对KLEE、KLEE-Pending、SymCC和SymSan的平均分支覆盖率分别提高233%、135%、130%和115%，相对AFL++提高81%。比较在8个真实对象上进行，每个工具运行5次，单次预算为48小时。{% cite luo2026agenticconcolic %}

多语言实验覆盖Python-C、Java-C、Python-Java和Go-C++系统。论文使用内部行覆盖率描述跨语言进展，并在C/C++对象上测得该指标与GCov行覆盖率的平均和中位相关系数均为94%。ultrajson、jansi、py4j和protobuf-go相对初始输入的覆盖率分别增长3.5倍、8.2倍、1.9倍和1.9倍。

FP-Bench中的26个可测试程序用于验证复杂约束处理。ConcoLLMic的平均分支覆盖率为77.87%，KLEE-Float为64.81%，基础KLEE为37.67%。结果显示高层约束概括可以减少对专用浮点符号模型的依赖，Python和Z3仍承担精确计算任务。

漏洞评估在C/C++对象上结合AddressSanitizer和UndefinedBehaviorSanitizer，在多语言对象上使用运行时异常和崩溃作为检测信号。ConcoLLMic发现11个此前未知的错误，测试驱动记录输入、参数、环境设置和外部准备步骤，支持具体执行复现。{% cite luo2026agenticconcolic %}

## 可信度与局限

插桩阶段的内部行覆盖率与GCov呈现94%的平均和中位相关系数。目标行验证的精确率为84%，F1值为81%。内部覆盖率适合驱动测试调度，不能代替完整的源码级或分支级真实覆盖度量。块边界遗漏、未插桩控制流和调用链近似都会造成偏差。

系统平均每生成一个测试输入消耗69秒和0.21美元。插桩平均成本为每千行代码0.56美元，并支持按函数增量重插桩。LLM延迟使ConcoLLMic的输入吞吐量低于传统执行器，论文以目标明确的输入质量交换测试速度。{% cite luo2026agenticconcolic %}

论文评估使用Claude 3.7 Sonnet。模型训练数据与开源基准之间可能存在重合，作者使用训练截止日期之后发布的krep和confetti减轻该风险。LLM错误、源码插桩不完整、外部环境不可复现和编译器优化删除路径都会限制测试结果。AddressSanitizer和UndefinedBehaviorSanitizer报告已执行路径上的错误，无法恢复优化阶段已经删除的未定义行为分支。

## 总结

Agentic Concolic Execution将传统混合符号执行重构为插桩观测、语义概括、工具求解和具体验证组成的闭环。该设计扩大了环境构造和跨语言测试的适用范围，并以运行时反馈约束LLM输出。它适合作为复杂程序的候选路径探索器，与fuzzing、传统符号执行和人工审计共同组成测试流程。
