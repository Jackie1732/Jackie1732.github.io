---
title: "D2L 现代循环神经网络：门控、深层与序列到序列"
description: "用于记录门控循环单元、长短期记忆网络及序列到序列建模的结构、推导和边界。"
date: 2026-09-03
updated: 2026-09-03
permalink: /notes/deep-learning/d2l/modern-recurrent-neural-networks/
track: foundations
content_type: study-note
status: draft
audience: "已经理解基础循环神经网络与通过时间反向传播的读者。"
prerequisites: [循环神经网络, 通过时间反向传播]
categories: [deep-learning]
tags: [d2l, recurrent-neural-network, gru, lstm, encoder-decoder, sequence-to-sequence, pytorch]
series: "D2L 基础"
series_order: 9
math: true
toc: true
---

## 笔记范围

本篇对应 D2L 第 9 章“现代循环神经网络”，用于后续记录以下内容：

- 门控循环单元（GRU）与长短期记忆网络（LSTM）。
- 深度循环神经网络与双向循环神经网络。
- 机器翻译数据处理、编码器—解码器架构与序列到序列学习。
- 预测序列的搜索问题与束搜索。

当前仅建立笔记结构，具体定义、公式、实现与实验结论随学习进度补充。

## 阅读来源

- A. Zhang 等，[D2L：第 9 章 现代循环神经网络](https://zh.d2l.ai/chapter_recurrent-modern/index.html)。
