---
title:          "Android 工程监测系统"
date:           2025-01-15 00:01:00 +0800
selected:       true
pub:            "项目经验"
pub_date:       "2025"
abstract: >-
  为工程监测 Android App 增加精量科技（BLE/JSON）、天宝（SPP）、徕卡（SPP）三类蓝牙设备的对接能力。
cover:          /assets/images/covers/cover1.jpg
authors:
- 陈启欢*
links:
  Description: |
    **技术栈:** Android (Java), BLE, 经典蓝牙(SPP), JSBridge
    
    **项目简介:** 为工程监测 Android App 增加精量科技（BLE/JSON）、天宝（SPP）、徕卡（SPP）三类蓝牙设备的对接能力。

    **项目描述:**
    - **精量科技设备对接:** 独立完成 BLE 通信协议对接，分别适配手动款设备（实时角度数据显示）和自动款设备（一次性返回全部测点数据，JSON 解析后自动填充）
    - **天宝/徕卡设备对接:** 通过经典蓝牙（SPP）向设备发送指令并接收响应；设计 Device 抽象层统一封装两类设备的协议差异；通过 JSBridge 暴露接口供 H5 调用，支持 BF 测量法数据采集
    - **健壮性处理:** 统一处理徕卡错误码映射（12032-12039 对应中文提示）、多包数据拼接、响应超时及特殊字符过滤
---