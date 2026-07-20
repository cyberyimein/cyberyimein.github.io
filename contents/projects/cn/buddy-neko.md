# BuddyNeko：让 StackChan 成为 Agent 的猫咪伙伴

BuddyNeko 是一个面向 M5Stack CoreS3 StackChan 的社区 Buddy 设计。它把 CoreS3 变成猫咪形态的桌面终端：高层 AI、STT/TTS、工具调用与策略运行在主机，设备则专注于表情、触摸、摄像头、音频、LED 和舵机动作，通过轻量的 Call Buddy 协议互相连接。

## 从 Agent Host 到实体 Buddy

Agent 如果只能返回文字，就很难成为一个真正存在于桌面上的伙伴。编码、思考、等待审批、完成和报错这些状态，都可以通过表情、灯光、动作和触摸反馈变得可见。BuddyNeko 的方向不是把复杂推理塞进 ESP32，而是让设备保持简单、可编译、可调试，把模型调用、工具执行和策略判断留给主机 Agent。

这也为 Anomalo 一类的 Agent Host 提供了一个清晰的实体边界：主机拥有 AI、STT、TTS、工具和授权策略，StackChan 负责把状态表现出来，并把触摸、音频和传感器事件送回主机。

## 当前实现

- 为 CoreS3 屏幕提供 16 色猫咪精灵动画，固件当前标识为 `0.7.0`。
- 支持 115200 波特率的 USB Serial，以及可选的 TCP 文本/事件传输。
- 用 Call Buddy 命令驱动 idle、listening、thinking、speaking、coding、approval、done 和 error 等状态。
- 支持触摸交互、审批回应、舵机移动、RGB 灯效、摄像头跟随和可选的主机视觉接口。
- 通过半双工 PCM16 传输麦克风与扬声器音频，让语音处理继续运行在主机侧。
- 提供无第三方依赖的 Python 工具，用于素材生成、显示捕获和开发主机租约维护。

## Call Buddy 与安全边界

协议采用逐行文本命令和 JSON Lines 事件，先以 USB Serial 为主，也可以复用同样的模型连接 TCP Agent。开发模式必须通过 USB Serial 显式申请短期租约并持续续租，设备不会因为接入 USB 电源就自动切换到开发主机；租约过期后会回到部署主机。

设备端只采集审批意图，最终是否执行仍由主机的授权策略决定。舵机动作也保留在固件的安全范围内。这个边界让实体设备可以快速迭代，同时避免把安全判断隐藏在一个不可观察的硬件交互里。

## Technical Specifications

C++ / Arduino / ESP32-S3 / M5Stack CoreS3 / StackChan BSP / Python / USB Serial / TCP / PCM16

## 项目状态

BuddyNeko 当前处于活跃开发阶段，固件已经可以面向真实 CoreS3 StackChan 硬件编译。它是一个社区设计的实体 Buddy，不是 M5Stack 官方出厂固件；后续会继续完善它与独立 Agent Host 的连接，让桌面上的表情、动作、语音和审批都能成为 Agent 工作流的一部分。
