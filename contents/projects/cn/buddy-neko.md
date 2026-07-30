# BuddyNeko：给 Agent 一个猫咪形的桌面接口

BuddyNeko 是面向 M5Stack CoreS3 StackChan 的社区 Buddy 设计。它把 CoreS3 变成猫咪形桌面终端：主机 Agent 负责 AI、STT/TTS、工具调用和授权策略，设备负责表情、触摸、摄像头、音频、LED 与舵机动作。当前固件版本为 v0.7.0。

## 背景与目标

如果 Agent 只能返回文字，编码、思考、等待审批、完成和报错等状态就很难在桌面上被感知。BuddyNeko 的目标是把这些状态投影到一个真实设备上，同时保持 ESP32 固件的职责足够小，便于编译、调试和更换主机 Agent。

因此，复杂推理不放在设备端。主机拥有模型调用、工具执行和授权策略，StackChan 通过 Call Buddy 协议显示状态，并把触摸、音频和传感事件送回主机。

## 设计与实现

Call Buddy 使用逐行文本命令和 JSON Lines 事件。USB Serial 以 115200 波特率工作；配置 Wi-Fi 后，也可以通过 TCP 传输同样的命令和事件，并在同一连接上传输半双工 PCM16 音频。

固件包含状态机、16 色猫咪精灵、触摸处理、RGB 灯效、舵机控制、摄像头运动跟随和显示捕获。开发主机需要通过 USB Serial 显式申请并续租短期租约；租约过期后，设备回到部署主机。

## 当前能力

- 在 CoreS3 屏幕上显示 16 色猫咪动画。
- 通过 Call Buddy 控制 idle、listening、thinking、speaking、coding、approval、done 和 error 等状态。
- 支持 USB Serial、可选 TCP、触摸交互、审批回应、舵机移动和 RGB 灯效。
- 使用摄像头进行低频运动跟随，并可选择把视觉帧发送给主机接口。
- 通过半双工 PCM16 传输麦克风与扬声器音频，让语音处理运行在主机侧。
- 提供无第三方依赖的 Python 工具，用于素材生成、屏幕捕获和开发主机租约维护。

## 边界与取舍

BuddyNeko 是社区设计，不是 M5Stack 官方出厂固件，也不是 Xiaozhi 固件。设备不运行高层 AI；它只负责交互表现、采集和小范围动作控制。

触摸审批事件只表达用户意图，最终是否执行仍由主机授权策略决定。USB 供电不会自动选择开发主机，舵机动作也受固件安全范围限制。项目面向可信的本地或局域网环境，不能把设备协议本身当作完整的身份认证层。

## 状态与下一步

BuddyNeko 当前处于活跃开发阶段，固件已经可以面向真实 CoreS3 StackChan 硬件编译。下一步是继续完善它与独立 Agent Host 的连接，让表情、动作、语音和审批稳定地成为 Agent 工作流的一部分。

## 技术栈

C++ / Arduino / ESP32-S3 / M5Stack CoreS3 / StackChan BSP / Python / USB Serial / TCP / PCM16
