"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

const exactTemTranslations: Record<string, { en: string; zh: string }> = {
  "MEMS-TEM-STM Multi-Field": { en: "MEMS-TEM-STM Multi-Field", zh: "MEMS-TEM-STM 多场测量" },
  "High-Temperature Mechanics": { en: "High-Temperature Mechanics", zh: "高温力学" },
  "TEM-STM Low Temperature Electrical": { en: "TEM-STM Low Temperature Electrical", zh: "TEM-STM 低温电学" },
  "TEM-STM Photoelectric Integrated": { en: "TEM-STM Photoelectric Integrated", zh: "TEM-STM 光电一体化" },
  "TEM-STM Integrated Force": { en: "TEM-STM Integrated Force", zh: "TEM-STM 力学一体化" },
  "TEM-STM Electrical": { en: "TEM-STM Electrical", zh: "TEM-STM 电学测量" },
  "MEMS Atmosphere Heating": { en: "MEMS Atmosphere Heating", zh: "MEMS 气氛加热" },
  "MEMS Liquid Electrochemical": { en: "MEMS Liquid Electrochemical", zh: "MEMS 液体电化学" },
  "MEMS Low Temperature Electrical": { en: "MEMS Low Temperature Electrical", zh: "MEMS 低温电学" },
  "MEMS Heated Electrical": { en: "MEMS Heated Electrical", zh: "MEMS 加热电学" },
  "Stretching": { en: "Stretching", zh: "拉伸测试" },
  "360° Horizontal Rotating": { en: "360° Horizontal Rotating", zh: "360° 水平旋转" },
  "Frozen": { en: "Cryogenic System", zh: "冷冻系统" },
  "Vacuum Transfer": { en: "Vacuum Transfer", zh: "真空转移" },
  "Multi-well": { en: "Multi-well", zh: "多孔位" },
  "High Temperature Mechanical": { en: "High Temperature Mechanical", zh: "高温机械" },
  "TEM Photoelectric Property Testing": { en: "TEM Photoelectric Property Testing", zh: "TEM 光电性能测试" },
  "TEM Cryo-electrical Test": { en: "TEM Cryo-electrical Test", zh: "TEM 低温电学测试" },
  "TEM Mechanical-Electrical": { en: "TEM Mechanical-Electrical", zh: "TEM 机电耦合测试" },
  "PicoFemto 현장 MEMS-TEM-STM 다중장 측정 시스템(PicoFemto) 현장 투과 전자 현미경 실험 시스템으로, 연구자들이 투과 전자현미경 내에서 제어된 다장 환경을 구축하여 다중 여기 하에서 재료나 장치 등 시료를 현장 특성화할 수 있도록 합니다.": { en: "PicoFemto in-situ MEMS-TEM-STM multi-field measurement system enables researchers to build a controlled multi-field environment inside a TEM for in-situ characterization of materials or devices under multiple excitations.", zh: "PicoFemto 原位 MEMS-TEM-STM 多场测量系统可帮助研究人员在 TEM 内构建受控多场环境，从而在多重激励下对材料或器件进行原位表征。" },
  "PicoFemto 현장 TEM 고온 역학 측정 시스템은 기계적 측정 모듈과 MEMS 칩 모듈을 통합하여 시료를 최대 1000 °C까지 가열하는 동안 정량적 기계적 측정을 수행할 수 있습니다. MEMS 칩 모듈은 가열 칩 또는 전기 측정 칩 중 선택할 수 있습니다. 기계적 측정 모듈은 다양한 실험 요구에 맞게 다양한 부하 센서를 선택할 수 있습니다.": { en: "PicoFemto in-situ TEM high-temperature mechanics system integrates a mechanical measurement module with MEMS chips, enabling quantitative mechanical measurements while heating samples up to 1000°C.", zh: "PicoFemto 原位 TEM 高温力学系统集成机械测量模块与 MEMS 芯片，可在样品加热至 1000°C 的过程中进行定量力学测量。" },
  "피코펨토 인사이트(현장) TEM TEM-STM 저온 전기 측정 시스템은 표준 형태의 투과형 전자현미경 시료 막대로, 스캐닝 프로브 제어 장치를 갖추고 프로브를 통해 개별 나노구조와 전기 측정을 동시에 조작하며, 시료의 결정 구조, 화학 성분, 원소 원자에 대한 동적 고해상도 종합 특성 분석이 가능합니다. 투과의 기능과 응용 분야를 크게 확장하여 투과 전자현미경의 기능과 응용 분야를 크게 확장합니다.": { en: "PicoFemto in-situ TEM TEM-STM low-temperature electrical system is a standard TEM holder with a scanning probe controller for simultaneous nano-manipulation and electrical measurement, together with dynamic high-resolution analysis.", zh: "PicoFemto 原位 TEM TEM-STM 低温电学系统为标准 TEM 样品杆，配备扫描探针控制装置，可同时进行纳米操控、电学测量及高分辨动态分析。" },
  "PicoFemto in-situ TEM TEM-STM 광전 통합 측정 시스템은 표준 형태 투과형 전자 현미경 시료봉으로, 주사 프로브 제어 장치를 갖추고 프로브를 통해 개별 나노구조와 전기적 측정, 그리고 동시에 전기 측정을 조작합니다. 시료의 결정 구조, 화학 성분, 원소 원자에 대한 동적 고해상도 종합 특성화를 제공하여 기능과 응용을 크게 확장합니다 투과 영역 이로 인해 투과 전자현미경의 기능과 응용 분야가 크게 확장됩니다.": { en: "PicoFemto in-situ TEM TEM-STM photoelectric integrated system is a standard TEM holder with a scanning probe controller, enabling nano-manipulation together with electrical and photoelectric measurements.", zh: "PicoFemto 原位 TEM TEM-STM 光电一体化系统为标准 TEM 样品杆，配备扫描探针控制装置，可同时进行纳米操控、电学和光电测量。" },
  "PicoFemto in-Situ TEM TEM-STM 통합 힘 측정 시스템은 TEM 시료봉의 표준 형태에 추가된 스캐닝 프로브 제어 장치로, 프로브를 통해 개별 나노구조와 전기적 측정을 조작할 수 있으며, 동시에 전기 측정도 수행할 수 있습니다. 시료의 결정 구조, 화학 성분, 원소 원자에 대한 동적 고해상도 종합 특성 분석이 가능합니다. TEM의 기능과 응용 분야를 크게 확장했습니다. 이로 인해 투과 전자현미경의 기능과 응용 분야가 크게 확장되었습니다.": { en: "PicoFemto in-situ TEM TEM-STM integrated force measurement system adds a scanning probe controller to a standard TEM holder, enabling nano-manipulation, electrical testing, and integrated force-related in-situ analysis.", zh: "PicoFemto 原位 TEM TEM-STM 力学一体化测量系统在标准 TEM 样品杆基础上加入扫描探针控制装置，可进行纳米操控、电学测试及力学相关原位分析。" },
  "현장 TEM TEM-STM 전기 측정 시스템은 투과 전자현미경(TEM)과 주사 터널링 현미경(STM)의 기능을 통합한 고급 과학 연구 장비로, 나노 스케일에서 재료의 전기적 특성 연구를 위해 설계되었습니다. 이 시스템은 TEM 환경에서 현장 전기 측정, 구조 영상 및 기계적 조절의 조정 작동을 지원하며, 저차원 재료, 이종접합, 양자 소자, 인터페이스 현상과 같은 고급 주제 연구에 널리 사용되고 있습니다.": { en: "The in-situ TEM TEM-STM electrical measurement system combines TEM and STM capabilities for nano-scale electrical property research, supporting coordinated electrical measurement, imaging, and mechanical manipulation.", zh: "原位 TEM TEM-STM 电学测量系统融合 TEM 与 STM 功能，面向纳米尺度材料电学性质研究，支持电学测量、成像与机械操控协同进行。" },
  "PicoFemto 현장 TEM MEMS 대기 가열 측정 시스템은 투과 전자현미경에서 대기와 고온 환경을 생성하며, 1 Bar 및 800 °C의 종단 간 관측 조건을 실현합니다. 이 시스템은 연구자들이 촉매 반응, 산화환원 반응, 저차원 재료 성장/합성, 다양한 부식 반응을 원자 규모에서 실시간으로 관찰할 수 있게 해주며, TEM을 정적 영상 도구에서 강력한 나노랩으로 업그레이드할 수 있게 합니다.": { en: "PicoFemto in-situ TEM MEMS atmosphere heating system creates gas and high-temperature environments inside the TEM, enabling up to 1 bar and 800°C for real-time atomic-scale observation.", zh: "PicoFemto 原位 TEM MEMS 气氛加热系统可在 TEM 内构建气体与高温环境，实现最高 1 bar、800°C 条件下的原子级实时观察。" },
  "피코펨토 현장 TEM MEMS 액체 전기화학 측정 시스템은 액체 캡슐화를 용이하게 하는 새로운 O-링 보조 씰 설계를 특징으로 합니다. 실험에서는 샘플을 초박 질소 실리콘 필름으로 덮은 액체 셀 안에 밀봉하는데, 이 필름은 1기압을 견딜 수 있습니다. 칩 전극은 외부 회로에 연결되어 전자현미경 내에서 액체-전기화학 시험 환경을 구축합니다.": { en: "PicoFemto in-situ TEM MEMS liquid electrochemical system features an O-ring assisted seal for liquid encapsulation, enabling liquid electrochemical experiments inside the electron microscope.", zh: "PicoFemto 原位 TEM MEMS 液体电化学系统采用 O 形圈辅助密封设计，可在电子显微镜内实现液体电化学实验环境。" },
  "피코펨토 현장 TEM MEMS 저온 전기 측정 시스템은 표준 MEMS 칩 샘플 로드에 통합된 극저온 제어 모듈로, 극저온 전기 측정 또는 전온 측정 기능을 구현합니다.": { en: "PicoFemto in-situ TEM MEMS low-temperature electrical system integrates cryogenic control into a standard MEMS-chip holder for cryogenic or full-temperature electrical measurements.", zh: "PicoFemto 原位 TEM MEMS 低温电学系统将低温控制模块集成到标准 MEMS 芯片样品杆中，可实现低温或全温区电学测量。" },
  "PicoFemto 현장 TEM MEMS 가열 전기 측정 시스템, 투과 전자현미경은 고시간 해상도로 원자 수준의 공간 해상도를 얻을 수 있는 실험 도구입니다. 투과 전자현미경 현장 가열/전기 측정 시스템은 MEMS 마이크로 가열 칩과 표준 형태의 투과 전자현미경 샘플 막대 안에 장착된 전기 측정 칩으로 구성됩니다. 마이크로 가열 칩은 시료를 제어된 온도로 가열할 수 있고, 전기 측정 칩은 시료의 전기적 특성을 측정할 수 있습니다. 가열과 전기 측정 시점에 시료의 결정 구조, 화학 성분 및 원소 원자 상태를 동적이고 높은 해상도로 특성화할 수 있어 투과 전자현미경의 기능과 응용 분야가 크게 확장됩니다.": { en: "PicoFemto in-situ TEM MEMS heated electrical system combines MEMS heating chips and electrical measurement chips for dynamic structural and electrical characterization during heating.", zh: "PicoFemto 原位 TEM MEMS 加热电学系统将 MEMS 微加热芯片与电学测量芯片结合，可在加热过程中进行动态结构与电学表征。" },
  "피코펨토 현장 TEM 신장 측정 시스템은 투과 전자현미경을 통한 재료 구조 변화를 현장 관찰과 함께 실온에서 재료에 인장력을 가할 수 있게 합니다. 이 시스템은 단일 경사진 신장 시료 막대, 신장 컨트롤러, 특수 신장 시료 운반 시트를 포함합니다. 응용 방향: 금속 재료, 나노재료, 박막 등의 기계적 변화 메커니즘을 연구합니다.": { en: "PicoFemto in-situ TEM stretching system applies tensile force at room temperature while observing structural changes in real time inside a TEM.", zh: "PicoFemto 原位 TEM 拉伸系统可在室温下对材料施加拉伸力，并同时在 TEM 中实时观察结构变化。" },
  "피코펨토인 제자리 TEM 360° 수평 회전 측정 시스템은 β각 기울기와 360° 수평 회전을 모두 갖추고 있어 투과전자 현미경에서 다자유도, 고정밀 시료 회전을 가능하게 합니다.": { en: "PicoFemto in-situ TEM 360° horizontal rotation system provides β-tilt and full 360° horizontal rotation for multi-degree-of-freedom, high-precision specimen rotation in TEM.", zh: "PicoFemto 原位 TEM 360° 水平旋转系统同时具备 β 倾转和 360° 水平旋转能力，可实现高精度多自由度样品旋转。" },
  "현장 TEM 냉동 측정 시스템은 재료 과학, 구조생물학, 나노기술과 같은 최첨단 분야를 위해 설계된 고정밀 저온 동적 관측 장치입니다. 이 시스템은 고해상도 투과 전자현미경(TEM)과 연동되어 초저온 조건에서 시료의 구조, 형태, 동적 진화를 실시간으로 현장에서 관찰할 수 있습니다. 저온 민감 시료의 미시적 거동을 분석하는 데 필수적인 연구 도구입니다.": { en: "The in-situ TEM cryogenic system is a high-precision low-temperature dynamic observation platform for advanced fields such as materials science, structural biology, and nanotechnology.", zh: "原位 TEM 冷冻系统是面向材料科学、结构生物学和纳米技术等前沿领域的高精度低温动态观察平台。" },
  "피코펨토 현장 TEM 진공 전달 측정 시스템은 진공 챔버나 글러브 박스에서 투과 전자현미경으로 샘플을 이동할 수 있도록 수납식 극단을 갖추도록 설계되어 대기 환경에 영향을 받지 않습니다.": { en: "PicoFemto in-situ TEM vacuum transfer system allows samples to be transferred from a vacuum chamber or glove box into the TEM without atmospheric exposure.", zh: "PicoFemto 原位 TEM 真空转移系统可将样品从真空腔体或手套箱转移至 TEM，避免暴露于大气环境。" },
  "PicoFemto 현장 TEM 다중 웰 측정 시스템, 다공 샘플 바는 연구자가 최대 세 개의 샘플을 투과 전자현미경에 동시에 배치할 수 있게 하여 투과 전자현미경 사용 효율을 크게 향상시킵니다. 이 제품은 각 샘플을 양방향으로 독립적으로 기울일 수 있는 이중 틸트 버전으로도 제공됩니다.": { en: "PicoFemto in-situ TEM multi-well system allows up to three samples to be mounted in the TEM simultaneously, greatly improving utilization efficiency.", zh: "PicoFemto 原位 TEM 多孔位系统可在 TEM 中同时安装最多三个样品，大幅提升设备使用效率。" },
  "피코펨토 현장 TEM 고온 기계적 측정 시스템(정량적 힘 + 전기 + 3D 조작 + 가열)은 기계적 측정 모듈과 MEMS 칩 모듈을 동시에 통합하여 시료를 1000°C에서 가열하면서 정량적 기계적 측정을 수행할 수 있습니다. 이는 진정한 의미의 투과 전자현미경에서 고해상도 정량적 현장 기계 연구를 실현합니다. 기계식 센서 표시기.": { en: "PicoFemto in-situ TEM high-temperature mechanical system integrates quantitative force, electrical measurement, 3D manipulation, and heating for high-resolution in-situ mechanical studies.", zh: "PicoFemto 原位 TEM 高温机械系统集成定量力、电学测量、三维操控和加热功能，可进行高分辨原位力学研究。" },
  "PicoFemto 현장 MEMS-TEM-STM 다중장 측정 시스템(비정량적 힘 + 전기 + 빛 + 가열)은 혁신적인 현장 투과 전자 현미경 실험 시스템으로, 연구자들이 투과 전자현미경에서 제어된 다장 환경(힘, 열, 빛, 전기 등)을 구축하여 다중 여기 하에서 재료나 장치 등의 현장 특성화를 달성할 수 있게 합니다.": { en: "PicoFemto in-situ MEMS-TEM-STM multi-field system integrates force, electricity, light, and heating to build a controlled multi-field environment for in-situ characterization.", zh: "PicoFemto 原位 MEMS-TEM-STM 多场系统集成力、电、光和加热条件，可构建受控多场环境以实现原位表征。" },
  "피코펨투인-제자리 TEM 광전 특성 시험 시스템(비정량적 힘 + 전기 + 빛 + 3차원 조작)은 표준 TEM-STM 시료봉 내에 광섬유 장치를 통합하여 외부 분광기 또는 레이저와 함께 사용하여 광전자 측정 또는 CL 측정을 수행합니다.": { en: "PicoFemto in-situ TEM photoelectric property testing system integrates optical fibers into a standard TEM-STM holder for photoelectric or cathodoluminescence measurements.", zh: "PicoFemto 原位 TEM 光电性能测试系统在标准 TEM-STM 样品杆内集成光纤装置，可进行光电或阴极发光测量。" },
  "피코펨토 현장 TEM 저온전기 시험 시스템(비정량적 힘 + 전기 + 극저온 + 3D 조작)은 표준 TEM-STM 시료봉 내에 극저온 환경 제어 장치를 통합하여, 투과 전자현미경에서 현장 냉동 전기 측정의 목적을 실현합니다.": { en: "PicoFemto in-situ TEM cryo-electrical testing system integrates cryogenic environment control into a standard TEM-STM holder for in-situ low-temperature electrical testing.", zh: "PicoFemto 原位 TEM 低温电学测试系统在标准 TEM-STM 样品杆内集成低温环境控制装置，实现原位低温电学测试。" },
  "PicoFemto 현장 TEM 기계-전기 측정 시스템(정량적 힘 + 전기 + 3D 조작)은 표준 TEM-STM 샘플 로드 내에 나노 힘 센서를 통합하여 고정밀 기계 및 전기적 측정을 실현합니다.": { en: "PicoFemto in-situ TEM mechanical-electrical system integrates nano-force sensors into a standard TEM-STM holder for high-precision mechanical and electrical measurements.", zh: "PicoFemto 原位 TEM 机电耦合系统在标准 TEM-STM 样品杆内集成纳米力传感器，可实现高精度机械与电学测量。" },
  "In-situ 실험 환경에서 시편의 구조 변화를 실시간으로 관찰할 수 있는 기본형 TEM/SEM 솔루션입니다.": { en: "Entry-level in-situ TEM/SEM solution for real-time observation of structural changes in samples.", zh: "可在原位实验环境下实时观察样品结构变化的基础型 TEM/SEM 解决方案。" },
  "가열 조건에서 미세 구조 변화를 추적하기에 적합한 In-situ 분석 장비입니다.": { en: "An in-situ analysis system suitable for tracking microstructural changes under heating conditions.", zh: "适用于在加热条件下追踪微观结构变化的原位分析设备。" },
  "인장 및 변형 시험 중 시편 반응을 정밀하게 확인할 수 있는 모델입니다.": { en: "A model suitable for precise observation of sample response during tensile and deformation tests.", zh: "适用于在拉伸及形变试验中精确观察样品响应的型号。" },
  "냉각 조건에서 재료의 표면 및 내부 변화를 안정적으로 관찰할 수 있습니다.": { en: "Provides stable observation of surface and internal changes in materials under cooling conditions.", zh: "可在冷却条件下稳定观察材料表面与内部变化。" },
  "배터리, 반도체, 금속 소재 분석에 적합한 범용 In-situ TEM/SEM 시스템입니다.": { en: "A versatile in-situ TEM/SEM system suitable for batteries, semiconductors, and metallic materials.", zh: "适用于电池、半导体及金属材料分析的通用型原位 TEM/SEM 系统。" },
  "미세 구조의 시간에 따른 변화를 확인하기 위한 동적 분석용 장비입니다.": { en: "A dynamic analysis system for tracking time-dependent microstructural changes.", zh: "用于追踪微观结构随时间变化的动态分析设备。" },
  "복합 소재의 계면 변화와 결함 발생을 관찰하기 좋은 In-situ 분석 모델입니다.": { en: "An in-situ model suitable for observing interfacial changes and defect formation in composite materials.", zh: "适用于观察复合材料界面变化及缺陷形成的原位分析型号。" },
  "고배율 이미징과 실험 스테이지 연동이 가능한 연구용 솔루션입니다.": { en: "A research solution that supports high-magnification imaging and experimental stage integration.", zh: "支持高倍率成像及实验台联动的研究型解决方案。" },
  "실험 중 샘플 반응을 직관적으로 파악할 수 있도록 설계된 In-situ 장비입니다.": { en: "An in-situ system designed for intuitive understanding of sample responses during experiments.", zh: "专为在实验过程中直观理解样品响应而设计的原位设备。" },
  "열, 응력, 전기적 자극에 따른 구조 변화를 분석하는 데 적합한 모델입니다.": { en: "A model suitable for analyzing structural changes caused by heat, stress, and electrical stimulation.", zh: "适用于分析热、应力和电刺激引起结构变化的型号。" },
  "재료 개발 및 불량 분석 과정에서 활용하기 좋은 TEM/SEM 응용 장비입니다.": { en: "A TEM/SEM application system useful for material development and failure analysis.", zh: "适用于材料开发与失效分析的 TEM/SEM 应用设备。" },
  "연구실과 분석센터에서 폭넓게 사용할 수 있는 다목적 In-situ 솔루션입니다.": { en: "A multipurpose in-situ solution suitable for laboratories and analytical centers.", zh: "适用于实验室与分析中心的多用途原位解决方案。" },
  "정밀 관찰과 반복 실험을 함께 고려한 안정형 TEM/SEM 장비입니다.": { en: "A stable TEM/SEM system designed for both precise observation and repeated experiments.", zh: "兼顾精密观察与重复实验需求的稳定型 TEM/SEM 设备。" },
  "시편 반응을 실시간 이미지로 확보할 수 있는 고효율 분석 시스템입니다.": { en: "A high-efficiency analysis system capable of capturing sample responses in real time.", zh: "可实时获取样品响应的高效率分析系统。" },
  "다양한 In-situ 액세서리와 연동 가능한 확장형 TEM/SEM 솔루션입니다.": { en: "An expandable TEM/SEM solution compatible with various in-situ accessories.", zh: "可兼容多种原位附件的扩展型 TEM/SEM 解决方案。" },
  "나노 소재와 박막 샘플의 구조 변화를 세밀하게 관찰할 수 있는 장비입니다.": { en: "A system for detailed observation of structural changes in nanomaterials and thin-film samples.", zh: "可细致观察纳米材料与薄膜样品结构变化的设备。" },
  "실험 조건 제어와 영상 확보를 동시에 중시하는 사용자에게 적합한 모델입니다.": { en: "A model suitable for users who require both experimental condition control and image acquisition.", zh: "适合同时重视实验条件控制与图像获取的用户。" },
  "고급 응용 분석과 연구 데이터 확보를 위한 In-situ 전용 장비입니다.": { en: "A dedicated in-situ system for advanced application analysis and research data acquisition.", zh: "用于高级应用分析与研究数据获取的专用原位系统。" },
  "정확한 구조 해석과 반응 추적을 지원하는 고신뢰성 TEM/SEM 시스템입니다.": { en: "A high-reliability TEM/SEM system that supports accurate structural interpretation and response tracking.", zh: "支持精确结构解析与响应追踪的高可靠性 TEM/SEM 系统。" },
  "다양한 연구 환경에서 활용 가능한 통합형 In-situ TEM/SEM 솔루션입니다.": { en: "An integrated in-situ TEM/SEM solution applicable to diverse research environments.", zh: "适用于多种研究环境的一体化原位 TEM/SEM 解决方案。" },
  "높은 안정성": { en: "High stability", zh: "高稳定性" },
  "긴 수명": { en: "Long service life", zh: "长寿命" },
  "초저유지보수 비용": { en: "Ultra-low maintenance cost", zh: "超低维护成本" },
  "방대한 사용자 기반": { en: "Large user base", zh: "庞大用户基础" },
  " 매우 넓은 기계적 측정 및 온도 제어 범위": { en: "Very wide mechanical measurement and temperature control range", zh: "极宽的力学测量与温控范围" },
  "고안정성": { en: "High stability", zh: "高稳定性" },
  "초장수명": { en: "Ultra-long service life", zh: "超长寿命" },
  "여러 분야의 기계 연구": { en: "Mechanical research across multiple fields", zh: "多领域力学研究" },
  "연속 온도 조절 가능, 높은 안정성": { en: "Continuous temperature control with high stability", zh: "可连续温控且稳定性高" },
  "저온은 시료와 전기적 연구에 가해지는 응력을 실현할 수 있습니다": { en: "Low temperature enables stress-related sample and electrical studies", zh: "低温条件可实现样品与电学相关应力研究" },
  " 양방향 광섬유의 사용은 CL 분광학, 광전 검출, 전기발광 분광법 및 기타 연구에 적용될 수 있습니다": { en: "Bidirectional optical fibers support CL spectroscopy, photoelectric detection, electroluminescence spectroscopy, and related studies", zh: "双向光纤可用于 CL 光谱、光电探测、电致发光光谱等研究" },
  " 고확장성을 가진 광 적분 솔루션": { en: "Highly expandable optical integration solution", zh: "高扩展性的光学集成方案" },
  "전자현미경의 원래 해상도를 보장하기 위한 높은 안정성": { en: "High stability to preserve original microscope resolution", zh: "高稳定性，保证原始分辨率" },
  "전자 현미경의 원래 해상도를 보장하며, 구면 수차에서도 선명한 원자 이미지를 포착할 수 있습니다": { en: "Preserves original microscope resolution and captures clear atomic images", zh: "保持原始分辨率并获取清晰原子图像" },
  "우수한 기동 안정성, 압전 세라믹 구동 모드로 고정밀 기동을 보장합니다.": { en: "Excellent actuation stability with piezo drive", zh: "优异的驱动稳定性，采用压电驱动" },
  "힘과 전기 통합 솔루션, 기계적 및 전기 구성으로 대부분의 시험 요구를 충족합니다": { en: "Integrated force and electrical solution for most test needs", zh: "力学与电学一体化方案，满足大部分测试需求" },
  "조작이 쉽고, 친숙": { en: "Easy and user-friendly operation", zh: "操作简便，易于上手" },
  "": { en: "", zh: "" },
  "TEM 진공과 호환": { en: "Compatible with TEM vacuum", zh: "兼容 TEM 真空环境" },
  "최소 100 nm 액체 전지 스페이서 두께": { en: "Minimum 100 nm liquid-cell spacer thickness", zh: "液体池最小间隔厚度 100 nm" },
  "전압 출력 최대 ± 200 V, 최소 해상도 ± 100 nV": { en: "Voltage output up to ±200 V; minimum resolution ±100 nV", zh: "电压输出最高 ±200 V，最小分辨率 ±100 nV" },
  "정전압 또는 일정 전류 모드": { en: "Constant-voltage or constant-current mode", zh: "恒压或恒流模式" },
  "스트레인 분석": { en: "Strain analysis", zh: "应变分析" },
  "구조 변화 분석": { en: "Structural-change analysis", zh: "结构变化分析" },
  "정밀 측정": { en: "Precision measurement", zh: "精密测量" },
  "고성능 분석": { en: "High-performance analysis", zh: "高性能分析" },
  "열팽창 분석": { en: "Thermal-expansion analysis", zh: "热膨胀分析" },
  "온도 제어": { en: "Temperature control", zh: "温度控制" },
  "구조 안정성": { en: "Structural stability", zh: "结构稳定性" },
  "정밀 데이터": { en: "Precision data", zh: "精确数据" },
  "전압 제어 분석": { en: "Voltage-control analysis", zh: "电压控制分析" },
  "정밀 전기 분석": { en: "Precision electrical analysis", zh: "精密电学分析" },
  "고해상도": { en: "High resolution", zh: "高分辨率" },
  "연구 효율": { en: "Research efficiency", zh: "研究效率" },
  "자기장 분석": { en: "Magnetic-field analysis", zh: "磁场分析" },
  "데이터 안정성": { en: "Data stability", zh: "数据稳定性" },
  "표면 반응 분석": { en: "Surface-reaction analysis", zh: "表面反应分析" },
  "실시간 분석": { en: "Real-time analysis", zh: "实时分析" },
  "연구 활용": { en: "Research use", zh: "研究应用" },
  "배터리 분석": { en: "Battery analysis", zh: "电池分析" },
  "충방전 분석": { en: "Charge/discharge analysis", zh: "充放电分析" },
  "고성능": { en: "High performance", zh: "高性能" },
  "반도체 분석": { en: "Semiconductor analysis", zh: "半导体分析" },
  "미세 구조 분석": { en: "Microstructure analysis", zh: "微观结构分析" },
  "고정밀": { en: "High precision", zh: "高精度" },
  "연구 최적화": { en: "Optimized for research", zh: "研究优化" },
  "촉매 분석": { en: "Catalyst analysis", zh: "催化分析" },
  "반응 분석": { en: "Reaction analysis", zh: "反应分析" },
  "데이터 신뢰성": { en: "Data reliability", zh: "数据可靠性" },
  "폴리머 분석": { en: "Polymer analysis", zh: "聚合物分析" },
  "구조 분석": { en: "Structural analysis", zh: "结构分析" },
  "3D 분석": { en: "3D analysis", zh: "三维分析" },
  "토모그래피": { en: "Tomography", zh: "断层成像" },
  "데이터 정확성": { en: "Data accuracy", zh: "数据准确性" },
  "생체 샘플 분석": { en: "Biological sample analysis", zh: "生物样品分析" },
  "고정밀 분석": { en: "High-precision analysis", zh: "高精度分析" },
  "맞춤형 분석": { en: "Custom analysis", zh: "定制分析" },
  "다양한 환경": { en: "Various environments", zh: "多种环境" },
  "확장성": { en: "Expandability", zh: "扩展性" },
};


type Category = {
  slug: string;
  label: string;
};

type SpecSection = {
  group: string;
  rows: {
    label: string;
    value: string;
  }[];
};

type OptionItem = {
  title: string;
  subtitle?: string;
  image?: string;
  placeholder?: boolean;
};

type SoftwareItem = {
  title: string;
  descriptionLines: string[];
  image: string;
};

type GalleryItem = {
  image: string;
  title: string;
  modalImage?: string;
};

type Product = {
  slug: string;
  category: string;
  title: string;
  categoryLabel: string;
  type: string;
  image: string;
  subtitle: string;
  description: string;
  overview: string;
  briefInfo?: string;
  features: string[];
  gallery: GalleryItem[];
  specs?: SpecSection[];
  options?: OptionItem[];
  softwareItems?: SoftwareItem[];
};

type ShowcaseCard = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  sliderImages?: string[];
  imageScale?: string;
  imageTranslate?: string;
  pdfUrl?: string;
};

const navItems = [
  { label: "제품소개", target: "products" },
  { label: "회사소개", target: "footer-cta" },
];

const heroImages = ["/hero/1.jpg", "/hero/2.png", "/hero/3.jpg", "/hero/4.png"];


type Lang = "ko" | "en" | "zh";

const translations: Record<string, { en: string; zh: string }> = {
  "__LONG__": {
  en: "Advanced analysis solution",
  zh: "高级分析解决方案"
},
  "제품소개": { en: "Products", zh: "产品介绍" },
  "회사소개": { en: "Company", zh: "公司介绍" },
  "전체": { en: "All", zh: "全部" },
  "주사전자현미경": { en: "Scanning Electron Microscope", zh: "扫描电子显微镜" },
  "Ion Coater": { en: "Ion Coater", zh: "离子镀膜仪" },
  "탁상형 주사전자현미경 기본 모델": { en: "Entry-level tabletop scanning electron microscope", zh: "台式扫描电子显微镜基础型号" },
  "컴팩트한 설계와 안정적인 관찰 성능을 제공하는 주사전자현미경입니다.": { en: "A scanning electron microscope with a compact design and stable observation performance.", zh: "具备紧凑设计与稳定观察性能的扫描电子显微镜。" },
  "컴팩트 설치": { en: "Compact Installation", zh: "紧凑安装" },
  "쉬운 조작": { en: "Easy Operation", zh: "操作简便" },
  "빠른 관찰": { en: "Fast Observation", zh: "快速观察" },
  "교육·연구 활용": { en: "For Education & Research", zh: "适用于教育与研究" },
  "확장 기능이 강화된 주사전자현미경 모델": { en: "Scanning electron microscope with enhanced expandability", zh: "扩展功能强化型扫描电子显微镜" },
  "분석 옵션과 사용자 편의성을 강화한 주사전자현미경 모델입니다.": { en: "A scanning electron microscope model with enhanced analytical options and user convenience.", zh: "加强了分析选项与使用便利性的扫描电子显微镜型号。" },
  "종합 기능: 다양한 사용자의 요구를 충족시키기 위한 다양한 기능을 갖추고 있습니다.": { en: "Comprehensive functions: equipped with diverse features to meet the needs of various users.", zh: "综合功能：配备多种功能，可满足不同用户需求。" },
  "고속 진공 펌핑: 90초 만에 진공 펌핑을 완료하여 작업 효율을 향상시킵니다.": { en: "High-speed vacuum pumping: completes vacuum pumping in 90 seconds to improve work efficiency.", zh: "高速抽真空：90 秒内完成抽真空，提高工作效率。" },
  "부드러운 영상: 빠른 영상 속도, 고스팅이나 번짐 없음, 샘플 디테일을 명확히 보여줍니다.": { en: "Smooth imaging: fast imaging speed with no ghosting or smearing, clearly showing sample details.", zh: "图像流畅：成像速度快，无重影与拖影，清晰呈现样品细节。" },
  "가속 전압: 3-18kV까지 1kV 단위로 연속적으로 조절되어 유연한 전압 옵션을 제공합니다.": { en: "Accelerating voltage: continuously adjustable from 3–18 kV in 1 kV steps for flexible voltage options.", zh: "加速电压：3–18kV 可按 1kV 连续调节，提供灵活电压选择。" },
  "다양한 신호: 조성 및 형태 분석을 위한 선택적 SE, BSE, EDS 신호 검출기가 제공됩니다.": { en: "Various signals: optional SE, BSE, and EDS detectors are available for composition and morphology analysis.", zh: "多种信号：可选配 SE、BSE、EDS 探测器，用于成分与形貌分析。" },
  "풍부한 확장성: 가열 단계, TEC 냉각 단계 등 자체 개발한 현장 SEM 액세서리와 호환되는 풍부한 현장 확장 기능을 제공합니다.": { en: "Rich expandability: provides extensive in-situ expansion functions compatible with self-developed SEM accessories such as heating and TEC cooling stages.", zh: "丰富扩展性：兼容自研原位 SEM 附件，如加热台、TEC 冷却台等，扩展能力强。" },
  "고성능 분석용 주사전자현미경 모델": { en: "High-performance scanning electron microscope for advanced analysis", zh: "高性能分析型扫描电子显微镜" },
  "정밀 관찰과 고해상도 분석에 적합한 고성능 주사전자현미경입니다.": { en: "A high-performance SEM suitable for precise observation and high-resolution analysis.", zh: "适用于精密观察与高分辨率分析的高性能扫描电子显微镜。" },
  "진공 분리 기술: 전자총과 샘플 챔버가 분리된 진공 설계를 사용하여 1분 이내에 샘플 변화를 가능하게 합니다.": { en: "Vacuum separation technology: uses a vacuum design that separates the electron gun and sample chamber, enabling sample changes within one minute.", zh: "真空分离技术：电子枪与样品腔室分离设计，可在 1 分钟内更换样品。" },
  "초대형 샘플 챔버: 사용자가 편리하게 사용할 수 있도록 더 넓은 샘플 저장 공간을 제공합니다.": { en: "Extra-large sample chamber: provides a wider sample space for convenient use.", zh: "超大样品腔室：提供更宽敞的样品空间，便于使用。" },
  "초고해상도: 최대 360,000배 배율, 5nm 해상도, 20kV 해상도를 달성합니다.": { en: "Ultra-high resolution: up to 360,000x magnification and 5 nm resolution at 20 kV.", zh: "超高分辨率：最高 360,000 倍放大，20kV 下可达 5nm 分辨率。" },
  "표준 감속 모드: 금이 튀지 않고 약전도성 샘플을 관찰할 수 있습니다.": { en: "Standard deceleration mode: allows observation of weakly conductive samples without gold coating splash.", zh: "标准减速模式：可观察弱导电样品且不易出现金喷镀影响。" },
  "인챔버 카메라: 샘플 챔버에는 현장 실험 중 시료 변화를 실시간으로 모니터링할 수 있는 고화질 카메라가 장착되어 있습니다.": { en: "In-chamber camera: the sample chamber is equipped with a high-definition camera for real-time monitoring during in-situ experiments.", zh: "腔室内相机：样品腔室配备高清相机，可实时监测试样变化。" },
  "고해상도": { en: "High Resolution", zh: "高分辨率" },
  "정밀 분석": { en: "Precision Analysis", zh: "精密分析" },
  "안정적 운용": { en: "Stable Operation", zh: "稳定运行" },
  "산업·연구용": { en: "For Industry & Research", zh: "适用于工业与研究" },
  "분석 전처리와 시편 준비를 위한 장비 솔루션": { en: "Equipment solutions for analytical pretreatment and sample preparation", zh: "用于分析前处理与样品制备的设备解决方案" },
  "가정용 수동 스타일러스 프로파일러 JS10C는 높은 정확도와 분해 능력을 갖추고 일체형 화강암 구조를 사용하여 안정적이고 신뢰할 수 있는 반복성 측정을 제공합니다. JS10C는 샘플과 바늘 끝을 동시에 촬영할 수 있는 컬러 카메라를 제공하여, 시료 면적을 수차 없이 관찰하고 특징 영역을 쉽게 찾을 수 있습니다. 반면 프로브 스캐닝은 실시간 스캔 영역에서 관찰할 수 있습니다.": { en: "The JS10C benchtop manual stylus profiler offers high accuracy and resolution, using an integrated granite structure for stable and reliable repeatable measurement. It includes a color camera that can view both the sample and stylus tip simultaneously, enabling aberration-free observation of the sample area and easy location of target regions. Probe scanning can also be observed in real time.", zh: "JS10C 台式手动接触式轮廓仪具有高精度和高分辨率，采用一体式花岗岩结构，提供稳定可靠的重复测量。JS10C 配备彩色相机，可同时拍摄样品和针尖，便于无像差观察样品区域并轻松找到特征区域；探针扫描也可在实时扫描区域中观察。" },
  "정확한 측정": { en: "Accurate Measurement", zh: "精确测量" },
  "소형 크기,": { en: "Compact Size", zh: "小型尺寸" },
  "뛰어난 비용 효율성": { en: "Excellent Cost Efficiency", zh: "出色性价比" },
  "시편 표면 코팅과 전처리를 위한 이온 코터 장비": { en: "Ion coater equipment for sample surface coating and pretreatment", zh: "用于样品表面镀膜与前处理的离子镀膜设备" },
  "전자현미경 관찰 전 시편 표면을 안정적으로 코팅하여 더 좋은 분석 품질을 확보할 수 있는 장비입니다.": { en: "Equipment that enables stable surface coating before electron microscope observation for improved analytical quality.", zh: "在电子显微镜观察前可对样品表面进行稳定镀膜，从而获得更好的分析质量。" },
  "균일 코팅": { en: "Uniform Coating", zh: "均匀镀膜" },
  "전처리 품질 향상": { en: "Improved Pretreatment Quality", zh: "提升前处理质量" },
  "간편한 운용": { en: "Easy Operation", zh: "简便操作" },
  "다양한 시편 대응": { en: "Supports Various Samples", zh: "适用于多种样品" },
  "Ion spotter coater": { en: "Ion spotter coater", zh: "离子溅射镀膜仪" },
  "Backscatter Electron Detector": { en: "Backscatter Electron Detector", zh: "背散射电子探测器" },
  "Cooling stage": { en: "Cooling stage", zh: "冷却台" },
  "획기적으로 개선된 인터페이스": { en: "Dramatically Improved Interface", zh: "大幅升级的界面" },
  "새롭게 적용된 신규 UI로 더욱 간편하게 촬영 환경을 설정해보세요.": { en: "Set up the imaging environment more easily with the newly applied UI.", zh: "通过全新 UI，更轻松地设置拍摄环境。" },
  "최적의 접근성으로 기존 소프트웨어 대비 60% 더 빠른 결과물을 확인할 수 있습니다.": { en: "With optimized accessibility, you can review results up to 60% faster than with previous software.", zh: "借助优化后的易用性，结果确认速度比原有软件快 60%。" },
  "· 더욱 큰 화면, 사용자 친화적 인터페이스 제공": { en: "· Larger screen and user-friendly interface", zh: "· 更大的界面与更友好的用户体验" },
  "더욱 정교해진 제어 환경": { en: "More Sophisticated Control Environment", zh: "更精细的控制环境" },
  "주요 촬영 조건과 장비 상태를 한 화면에서 빠르게 확인할 수 있습니다.": { en: "Quickly check key imaging conditions and equipment status on a single screen.", zh: "可在单个界面中快速查看主要拍摄条件和设备状态。" },
  "작업 흐름을 단순화하여 분석 시간은 줄이고 운용 효율은 높였습니다.": { en: "The workflow has been simplified to reduce analysis time and improve operational efficiency.", zh: "通过简化工作流程，缩短分析时间并提高运用效率。" },
  "· 직관적인 제어 구성, 빠른 조건 전환 지원": { en: "· Intuitive controls and fast parameter switching", zh: "· 直观控制布局，支持快速切换条件" },
  "빠르고 직관적인 분석 워크플로우": { en: "Fast and Intuitive Analysis Workflow", zh: "快速直观的分析流程" },
  "이미지 획득부터 확인, 분석까지 이어지는 과정을 더욱 자연스럽게 구성했습니다.": { en: "The process from image acquisition to review and analysis has been made more seamless.", zh: "从图像获取到查看、分析的流程更加自然顺畅。" },
  "초보 사용자도 쉽게 적응할 수 있도록 화면 구성을 단순하고 명확하게 개선했습니다.": { en: "The layout has been simplified and clarified so even new users can adapt easily.", zh: "为了让初学者也能轻松上手，界面布局变得更加简洁清晰。" },
  "· 사용자 중심 설계, 빠른 분석 프로세스 제공": { en: "· User-centered design for faster analysis", zh: "· 以用户为中心的设计，提供更快的分析流程" },
  "Silicon dioxide": { en: "Silicon dioxide", zh: "二氧化硅" },
  "Microsphere": { en: "Microsphere", zh: "微球" },
  "Lithium iron phosphate": { en: "Lithium iron phosphate", zh: "磷酸铁锂" },
  "Carbon nanotube": { en: "Carbon nanotube", zh: "碳纳米管" },
  "Tungsten powder": { en: "Tungsten powder", zh: "钨粉" },
  "Gold particle": { en: "Gold particle", zh: "金颗粒" },
  "SZirconia": { en: "SZirconia", zh: "氧化锆" },
  "Microcrystalline adsorbent material": { en: "Microcrystalline adsorbent material", zh: "微晶吸附材料" },
  "MOF materials": { en: "MOF materials", zh: "MOF 材料" },
  "THE BEST 고성능 분석장비 솔루션": { en: "THE BEST High-Performance Analysis Equipment Solutions", zh: "THE BEST 高性能分析设备解决方案" },
  "전자현미경 및 분석": { en: "Electron Microscopy & Analysis", zh: "电子显微镜与分析" },
  "장비 전문 기업": { en: "Equipment Specialists", zh: "设备专业企业" },
  "정밀관찰, 재료분석, 품질평가를 위한 전자현미경 및 분석장비 솔루션을 제공합니다.": { en: "We provide electron microscopy and analytical equipment solutions for precision observation, material analysis, and quality evaluation.", zh: "我们提供用于精密观察、材料分析与品质评估的电子显微镜及分析设备解决方案。" },
  "바로 보러가기": { en: "View Products", zh: "立即查看" },
"문의하기": { en: "Contact Us", zh: "联系我们" },
"주사전자현미경": { en: "Scanning Electron Microscope", zh: "扫描电子显微镜" },
"3개의 Table Top SEM, 1개의 Normal SEM 제품 라인업": { en: "Lineup of 3 Table Top SEMs and 1 Normal SEM", zh: "3款台式SEM和1款普通SEM产品阵容" },
"In-situ 분석 및 특수 응용을 위한 TEM/SEM 솔루션 라인업": { en: "TEM/SEM solution lineup for in-situ analysis and special applications", zh: "用于原位分析及特殊应用的TEM/SEM解决方案产品线" },
"제품 소개": { en: "Products", zh: "产品介绍" },
  "전체 보기": { en: "View All", zh: "查看全部" },
  "선택한 카테고리의 제품을 한눈에 확인하실 수 있습니다.": { en: "You can browse products in the selected category at a glance.", zh: "您可以一目了然地查看所选分类中的产品。" },
  "장비별 상세 보기로 이동해 주요 특징과 구성을 확인해보세요.": { en: "Open the detail page to review key features and configuration.", zh: "进入详情页即可查看主要特点与配置。" },
  "바로 가기": { en: "Go", zh: "进入" },
  "PDF 다운": { en: "Download PDF", zh: "下载 PDF" },
  "홈": { en: "Home", zh: "首页" },
  "목록으로 돌아가기": { en: "Back to List", zh: "返回列表" },
  "제품문의": { en: "Product Inquiry", zh: "产品咨询" },
  "장비 상세 보기": { en: "View Details", zh: "设备详细查看" },
  "핵심 특징": { en: "Key Features", zh: "核心特点" },
  "장비 간략 설명": { en: "Brief Description", zh: "设备简介" },
  "동일 이미지를 기반으로 코팅 전 느낌과 코팅 후 결과를 직관적으로 비교할 수 있습니다.": { en: "Compare the appearance before coating and the result after coating based on the same image.", zh: "基于同一张图像，直观比较镀膜前的状态与镀膜后的结果。" },
  "Ion Coating 전 / 후 비교": { en: "Ion Coating Before / After", zh: "离子镀膜前 / 后对比" },
  "실제 장비를 통해 획득한 샘플 이미지를 확인하실 수 있습니다.": { en: "You can review sample images acquired with the actual equipment.", zh: "您可以查看通过实际设备获取的样品图像。" },
  "장비로 촬영한 이미지": { en: "Captured Images", zh: "设备拍摄图像" },
  "정확한 제품과 서비스, 빠른 납기": { en: "Accurate products, reliable service, and fast delivery", zh: "准确的产品与服务，快速的交付" },
  "최첨단 SEM 전문": { en: "Advanced SEM Specialists", zh: "尖端 SEM 专业企业" },
  "산업 전반에 걸쳐 정밀한 분석과": { en: "We support precise analysis across industries", zh: "我们在各行业提供精密分析" },
  "품질 관리를 지원하고 있습니다.": { en: "and help improve quality control.", zh: "并支持品质管理。" },
  "빠르고 정확하게": { en: "We respond quickly", zh: "快速而准确地" },
  "답변해 드립니다.": { en: "and accurately.", zh: "为您答复。" },
  "개인정보처리방침": { en: "Privacy Policy", zh: "隐私政策" },
  "오시는 길": { en: "Directions", zh: "来访路线" },
  "경기도 화성시 동탄대로 646-4 1110~2호(메가비즈타워 B동)": { en: "1110~2, 646-4 Dongtandaero, Hwaseong-si, Gyeonggi-do (Megabiz Tower B)", zh: "韩国京畿道华城市东滩大路 646-4，1110~2 号（Megabiz Tower B）" },

  "PRODUCT CATEGORY": { en: "PRODUCT CATEGORY", zh: "产品分类" },
  "PRODUCT LINE": { en: "PRODUCT LINE", zh: "产品线" },
  "PRODUCT": { en: "PRODUCT", zh: "产品" },
  "More Detail": { en: "More Detail", zh: "查看详情" },
  "Total": { en: "Total", zh: "总计" },
  "page": { en: "page", zh: "页" },
  "Specification": { en: "Specification", zh: "规格参数" },
  "Options": { en: "Options", zh: "选项" },
  "OPTIONAL SYSTEM": { en: "OPTIONAL SYSTEM", zh: "可选系统" },
  "Compatible optional module": { en: "Compatible optional module", zh: "兼容可选模块" },
  "AVAILABLE OPTION": { en: "AVAILABLE OPTION", zh: "可选模块" },
  "SOFTWARE": { en: "SOFTWARE", zh: "软件" },
  "Software Interface Preview": { en: "Software Interface Preview", zh: "软件界面预览" },
  "BEFORE / AFTER COMPARISON": { en: "BEFORE / AFTER COMPARISON", zh: "前后对比" },
  "BEFORE (No Coating)": { en: "BEFORE (No Coating)", zh: "镀膜前" },
  "AFTER (Ion Coating)": { en: "AFTER (Ion Coating)", zh: "镀膜后" },
  "APPLICATION IMAGE": { en: "APPLICATION IMAGE", zh: "应用图像" },
  "ANALYSIS IMAGE": { en: "ANALYSIS IMAGE", zh: "分析图像" },
  "PRODUCT SUMMARY": { en: "PRODUCT SUMMARY", zh: "产品摘要" },
  "ADDR": { en: "ADDR", zh: "地址" },
  "TEL": { en: "TEL", zh: "电话" },
  "E-MAIL": { en: "E-MAIL", zh: "电子邮箱" },
  "Ion Coating 전 / 후 비교": { en: "Ion Coating Before / After", zh: "离子镀膜前 / 后对比" },
"동일 이미지를 기반으로 코팅 전 느낌과 코팅 후 결과를 직관적으로 비교할 수 있습니다.": {
  en: "Compare the appearance before coating and the result after coating based on the same image.",
  zh: "基于同一图像，可直观比较镀膜前状态与镀膜后结果。"
},
"BEFORE / AFTER COMPARISON": { en: "BEFORE / AFTER COMPARISON", zh: "前后对比" },
"BEFORE (No Coating)": { en: "BEFORE (No Coating)", zh: "镀膜前" },
"AFTER (Ion Coating)": { en: "AFTER (Ion Coating)", zh: "镀膜后" },
};
function normalizeText(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/[‐-‒–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

function trText(text: string, lang: "ko" | "en" | "zh") {
  if (lang === "ko") return text;

  const normalizedInput = normalizeText(text);

  for (const [key, value] of Object.entries(translations)) {
    if (normalizeText(key) === normalizedInput) {
      return lang === "en" ? value.en : value.zh;
    }
  }

  if (normalizedInput.length > 40) {
    const fallback = translations["__LONG__"];
    return lang === "en" ? fallback.en : fallback.zh;
  }

  return text;
}

const categories: Category[] = [
  { slug: "all", label: "전체" },
  { slug: "sem", label: "주사전자현미경" },
  { slug: "normal-sem", label: "PRODUCTS INTRODUCTION" },
  { slug: "tem", label: "TEM" },
  { slug: "ion-coater", label: "Ion Coater" },
];

const im10Specs: SpecSection[] = [
  {
    group: "Environmental requirements",
    rows: [{ label: "", value: "AC 220V, 50Hz, 1kW, No shock absorbing stage required" }],
  },
  {
    group: "Accelerating voltage",
    rows: [
      {
        label: "",
        value:
          "3kV~20kV Continuously adjustable, 1kV stepping (Optional high-end version, with an acceleration voltage up to 30kV)",
      },
    ],
  },
  {
    group: "Electron gun",
    rows: [
      {
        label: "",
        value:
          "Pre-centered tungsten filament, one-piece condenser lens, no need to manually adjust the objective diaphragm",
      },
    ],
  },
  {
    group: "Magnification",
    rows: [{ label: "", value: "25 ~ 360000x" }],
  },
  {
    group: "Resolution",
    rows: [{ label: "", value: "4nm" }],
  },
  {
    group: "Detector",
    rows: [
      {
        label: "",
        value:
          "Secondary electron detector, Quad-segmented backscattered electron detector, and Integrated energy-dispersive spectrometer",
      },
    ],
  },
  {
    group: "Sample stage",
    rows: [
      {
        label: "",
        value: "Two axes: X: 60mm Y: 55mm, Three-axis and five-axis options are available",
      },
    ],
  },
  {
    group: "Extra-large sample chamber",
    rows: [{ label: "", value: "L185mm × W176mm × H125mm" }],
  },
  {
    group: "vacuum mode",
    rows: [
      {
        label: "",
        value: "High vacuum mode; Low vacuum mode (optional): 1-60Pa automatic control",
      },
    ],
  },
  {
    group: "Imaging mode",
    rows: [
      {
        label: "",
        value:
          "Video mode: 512 x 512 pixels, no need for small window scanning; Quick Sweep mode: 512 x 512 pixels\nSlow scan mode: 2048 x 2048 pixels; Image formats: BMP, TIFF, JPEG, PNG",
      },
    ],
  },
  {
    group: "Navigation function",
    rows: [
      {
        label: "",
        value:
          "Optical camera navigation and an in-chamber camera allow for real-time observation of the conditions inside the sample chamber.",
      },
    ],
  },
  {
    group: "Automatic function",
    rows: [
      {
        label: "",
        value: "Automatic brightness and contrast, automatic focusing, large image stitching",
      },
    ],
  },
  {
    group: "Dimensions",
    rows: [{ label: "", value: "650 × 370 × 642(mm)" }],
  },
  {
    group: "Expansion function",
    rows: [
      {
        label: "",
        value:
          "Compatible with ZEPTOOLS a variety of in-situ measurement sample stage (tensile stage, heating stage, TEC cooling stage and other in-situ test system)",
      },
    ],
  },
];

const defaultOptions: OptionItem[] = [
  {
    title: "CT-1000",
    subtitle: "Ion spotter coater",
    image: "/products/options/CT-1000.png",
  },
  {
    title: "BSE",
    subtitle: "Backscatter Electron Detector",
    image: "/products/options/optional-1.png",
  },
  {
    title: "EDS(Bruker)",
    subtitle: "EDS",
    image: "/products/options/optional-2.png",
  },
  {
    title: "EDS(Oxford)",
    subtitle: "EDS",
    image: "/products/options/optional-3.png",
  },
  { title: "Cooling stage", placeholder: true },
];

const defaultSoftwareItems: SoftwareItem[] = [
  {
    title: "획기적으로 개선된 인터페이스",
    descriptionLines: [
      "새롭게 적용된 신규 UI로 더욱 간편하게 촬영 환경을 설정해보세요.",
      "최적의 접근성으로 기존 소프트웨어 대비 60% 더 빠른 결과물을 확인할 수 있습니다.",
      "· 더욱 큰 화면, 사용자 친화적 인터페이스 제공",
    ],
    image: "/products/software-main-1.png",
  },
  {
    title: "더욱 정교해진 제어 환경",
    descriptionLines: [
      "주요 촬영 조건과 장비 상태를 한 화면에서 빠르게 확인할 수 있습니다.",
      "작업 흐름을 단순화하여 분석 시간은 줄이고 운용 효율은 높였습니다.",
      "· 직관적인 제어 구성, 빠른 조건 전환 지원",
    ],
    image: "/products/software-main-2.jpg",
  },
  {
    title: "빠르고 직관적인 분석 워크플로우",
    descriptionLines: [
      "이미지 획득부터 확인, 분석까지 이어지는 과정을 더욱 자연스럽게 구성했습니다.",
      "초보 사용자도 쉽게 적응할 수 있도록 화면 구성을 단순하고 명확하게 개선했습니다.",
      "· 사용자 중심 설계, 빠른 분석 프로세스 제공",
    ],
    image: "/products/software-main-3.jpg",
  },
];

const defaultGallery: GalleryItem[] = [
  { image: "/products/results/result-1.png", modalImage: "/products/results/result-1.png", title: "Silicon dioxide" },
  { image: "/products/results/result-2.png", modalImage: "/products/results/result-2.jpg", title: "Microsphere" },
  { image: "/products/results/result-3.png", modalImage: "/products/results/result-3.jpg", title: "Lithium iron phosphate" },
  { image: "/products/results/result-4.png", modalImage: "/products/results/result-4.jpg", title: "Carbon nanotube" },
  { image: "/products/results/result-5.png", modalImage: "/products/results/result-5.jpg", title: "Tungsten powder" },
  { image: "/products/results/result-6.png", modalImage: "/products/results/result-6.jpg", title: "Gold particle" },
  { image: "/products/results/result-7.png", modalImage: "/products/results/result-7.jpg", title: "SZirconia" },
  { image: "/products/results/result-8.png", modalImage: "/products/results/result-8.jpg", title: "Microcrystalline adsorbent material" },
  { image: "/products/results/result-9.png", modalImage: "/products/results/result-9.jpg", title: "MOF materials" },
];

function makeProduct(config: {
  slug: string;
  category: string;
  title: string;
  categoryLabel: string;
  type: string;
  image: string;
  subtitle: string;
  description: string;
  overview: string;
  briefInfo?: string;
  features: string[];
  useSpecs?: boolean;
  useOptions?: boolean;
  useSoftware?: boolean;
  useGallery?: boolean;
}): Product {
  return {
    slug: config.slug,
    category: config.category,
    title: config.title,
    categoryLabel: config.categoryLabel,
    type: config.type,
    image: config.image,
    subtitle: config.subtitle,
    description: config.description,
    overview: config.overview,
    briefInfo: config.briefInfo,
    features: config.features,
    gallery: config.useGallery === false ? [] : defaultGallery,
    specs: config.useSpecs === false ? undefined : im10Specs,
    options: config.useOptions === false ? undefined : defaultOptions,
    softwareItems: config.useSoftware === false ? undefined : defaultSoftwareItems,
  };
}

const semProducts: Product[] = [
  makeProduct({
    slug: "sem-01",
    category: "sem",
    title: "IM-10",
    categoryLabel: "주사전자현미경",
    type: "SEM",
    image: "/products/im-10.png",
    subtitle: "TABLETOP SEM",
    description: "탁상형 주사전자현미경 기본 모델",
    overview: "컴팩트한 설계와 안정적인 관찰 성능을 제공하는 주사전자현미경입니다.",
    features: ["컴팩트 설치", "쉬운 조작", "빠른 관찰", "교육·연구 활용"],
  }),
  makeProduct({
    slug: "sem-02",
    category: "sem",
    title: "IM-18",
    categoryLabel: "주사전자현미경",
    type: "SEM",
    image: "/products/im-18.png",
    subtitle: "ADVANCED SEM",
    description: "확장 기능이 강화된 주사전자현미경 모델",
    overview: "분석 옵션과 사용자 편의성을 강화한 주사전자현미경 모델입니다.",
    features: ["종합 기능: 다양한 사용자의 요구를 충족시키기 위한 다양한 기능을 갖추고 있습니다.", "고속 진공 펌핑: 90초 만에 진공 펌핑을 완료하여 작업 효율을 향상시킵니다.", "부드러운 영상: 빠른 영상 속도, 고스팅이나 번짐 없음, 샘플 디테일을 명확히 보여줍니다.", "가속 전압: 3-18kV까지 1kV 단위로 연속적으로 조절되어 유연한 전압 옵션을 제공합니다.","다양한 신호: 조성 및 형태 분석을 위한 선택적 SE, BSE, EDS 신호 검출기가 제공됩니다.","풍부한 확장성: 가열 단계, TEC 냉각 단계 등 자체 개발한 현장 SEM 액세서리와 호환되는 풍부한 현장 확장 기능을 제공합니다."],
  }),
  makeProduct({    slug: "sem-03",
    category: "sem",
    title: "IM-20",
    categoryLabel: "주사전자현미경",
    type: "SEM",
    image: "/products/im-20.png",
    subtitle: "HIGH PERFORMANCE SEM",
    description: "고성능 분석용 주사전자현미경 모델",
    overview: "정밀 관찰과 고해상도 분석에 적합한 고성능 주사전자현미경입니다.",
    features: ["진공 분리 기술: 전자총과 샘플 챔버가 분리된 진공 설계를 사용하여 1분 이내에 샘플 변화를 가능하게 합니다.", "초대형 샘플 챔버: 사용자가 편리하게 사용할 수 있도록 더 넓은 샘플 저장 공간을 제공합니다.", "초고해상도: 최대 360,000배 배율, 5nm 해상도, 20kV 해상도를 달성합니다.", "표준 감속 모드: 금이 튀지 않고 약전도성 샘플을 관찰할 수 있습니다.","인챔버 카메라: 샘플 챔버에는 현장 실험 중 시료 변화를 실시간으로 모니터링할 수 있는 고화질 카메라가 장착되어 있습니다."],
  }),
  makeProduct({
    slug: "sem-04",
    category: "sem",
    title: "Normal SEM",
    categoryLabel: "주사전자현미경",
    type: "SEM",
    image: "/products/im-300.png",
    subtitle: "HIGH PERFORMANCE SEM",
    description: "고성능 분석용 주사전자현미경 모델",
    overview: "정밀 관찰과 고해상도 분석에 적합한 고성능 주사전자현미경입니다.",
    features: ["고해상도", "정밀 분석", "안정적 운용", "산업·연구용"],
  }),
];

const normalSemProducts: Product[] = [
  makeProduct({
    slug: "im-18",
    category: "normal-sem",
    title: "PRODUCTS INTRODUCTION",
    categoryLabel: "PRODUCTS INTRODUCTION",
    type: "PRODUCTS",
    image: "/products/PRODUCTS INTRODUCTION.png",
    subtitle: "SAMPLE PREPARATION",
    description: "분석 전처리와 시편 준비를 위한 장비 솔루션",
    overview:
      "가정용 수동 스타일러스 프로파일러 JS10C는 높은 정확도와 분해 능력을 갖추고 일체형 화강암 구조를 사용하여 안정적이고 신뢰할 수 있는 반복성 측정을 제공합니다. JS10C는 샘플과 바늘 끝을 동시에 촬영할 수 있는 컬러 카메라를 제공하여, 시료 면적을 수차 없이 관찰하고 특징 영역을 쉽게 찾을 수 있습니다. 반면 프로브 스캐닝은 실시간 스캔 영역에서 관찰할 수 있습니다.",
      features: ["정확한 측정", "쉬운 조작", "소형 크기,", "뛰어난 비용 효율성"],
    useSpecs: false,
    useOptions: false,
    useSoftware: false,
    useGallery: false,
  }),
];

const temBriefDescriptions = [
  "In-situ 실험 환경에서 시편의 구조 변화를 실시간으로 관찰할 수 있는 기본형 TEM/SEM 솔루션입니다.",
  "가열 조건에서 미세 구조 변화를 추적하기에 적합한 In-situ 분석 장비입니다.",
  "인장 및 변형 시험 중 시편 반응을 정밀하게 확인할 수 있는 모델입니다.",
  "냉각 조건에서 재료의 표면 및 내부 변화를 안정적으로 관찰할 수 있습니다.",
  "배터리, 반도체, 금속 소재 분석에 적합한 범용 In-situ TEM/SEM 시스템입니다.",
  "미세 구조의 시간에 따른 변화를 확인하기 위한 동적 분석용 장비입니다.",
  "복합 소재의 계면 변화와 결함 발생을 관찰하기 좋은 In-situ 분석 모델입니다.",
  "고배율 이미징과 실험 스테이지 연동이 가능한 연구용 솔루션입니다.",
  "실험 중 샘플 반응을 직관적으로 파악할 수 있도록 설계된 In-situ 장비입니다.",
  "열, 응력, 전기적 자극에 따른 구조 변화를 분석하는 데 적합한 모델입니다.",
  "재료 개발 및 불량 분석 과정에서 활용하기 좋은 TEM/SEM 응용 장비입니다.",
  "연구실과 분석센터에서 폭넓게 사용할 수 있는 다목적 In-situ 솔루션입니다.",
  "정밀 관찰과 반복 실험을 함께 고려한 안정형 TEM/SEM 장비입니다.",
  "시편 반응을 실시간 이미지로 확보할 수 있는 고효율 분석 시스템입니다.",
  "다양한 In-situ 액세서리와 연동 가능한 확장형 TEM/SEM 솔루션입니다.",
  "나노 소재와 박막 샘플의 구조 변화를 세밀하게 관찰할 수 있는 장비입니다.",
  "실험 조건 제어와 영상 확보를 동시에 중시하는 사용자에게 적합한 모델입니다.",
  "고급 응용 분석과 연구 데이터 확보를 위한 In-situ 전용 장비입니다.",
  "정확한 구조 해석과 반응 추적을 지원하는 고신뢰성 TEM/SEM 시스템입니다.",
  "다양한 연구 환경에서 활용 가능한 통합형 In-situ TEM/SEM 솔루션입니다.",
];

const temNames = [
  "MEMS-TEM-STM Multi-Field",
  "High-Temperature Mechanics",
  "TEM-STM Low Temperature Electrical",
  "TEM-STM Photoelectric Integrated",
  "TEM-STM Integrated Force",
  "TEM-STM Electrical",
  "MEMS Atmosphere Heating",
  "MEMS Liquid Electrochemical",
  "MEMS Low Temperature Electrical",
  "MEMS Heated Electrical",
  "Stretching",
  "360° Horizontal Rotating",
  "Frozen",
  "Vacuum Transfer",
  "Multi-well",
  "High Temperature Mechanical",
  "MEMS-TEM-STM Multi-Field",
  "TEM Photoelectric Property Testing",
  "TEM Cryo-electrical Test",
  "TEM Mechanical-Electrical",
];

// 🔥 여기 추가 (temProducts 바로 위)

const temDescriptions = [
  "PicoFemto 현장 MEMS-TEM-STM 다중장 측정 시스템(PicoFemto) 현장 투과 전자 현미경 실험 시스템으로, 연구자들이 투과 전자현미경 내에서 제어된 다장 환경을 구축하여 다중 여기 하에서 재료나 장치 등 시료를 현장 특성화할 수 있도록 합니다.",
  "PicoFemto 현장 TEM 고온 역학 측정 시스템은 기계적 측정 모듈과 MEMS 칩 모듈을 통합하여 시료를 최대 1000 °C까지 가열하는 동안 정량적 기계적 측정을 수행할 수 있습니다. MEMS 칩 모듈은 가열 칩 또는 전기 측정 칩 중 선택할 수 있습니다. 기계적 측정 모듈은 다양한 실험 요구에 맞게 다양한 부하 센서를 선택할 수 있습니다.",
  "피코펨토 인사이트(현장) TEM TEM-STM 저온 전기 측정 시스템은 표준 형태의 투과형 전자현미경 시료 막대로, 스캐닝 프로브 제어 장치를 갖추고 프로브를 통해 개별 나노구조와 전기 측정을 동시에 조작하며, 시료의 결정 구조, 화학 성분, 원소 원자에 대한 동적 고해상도 종합 특성 분석이 가능합니다. 투과의 기능과 응용 분야를 크게 확장하여 투과 전자현미경의 기능과 응용 분야를 크게 확장합니다.",
  "PicoFemto in-situ TEM TEM-STM 광전 통합 측정 시스템은 표준 형태 투과형 전자 현미경 시료봉으로, 주사 프로브 제어 장치를 갖추고 프로브를 통해 개별 나노구조와 전기적 측정, 그리고 동시에 전기 측정을 조작합니다. 시료의 결정 구조, 화학 성분, 원소 원자에 대한 동적 고해상도 종합 특성화를 제공하여 기능과 응용을 크게 확장합니다 투과 영역 이로 인해 투과 전자현미경의 기능과 응용 분야가 크게 확장됩니다.",
  "PicoFemto in-Situ TEM TEM-STM 통합 힘 측정 시스템은 TEM 시료봉의 표준 형태에 추가된 스캐닝 프로브 제어 장치로, 프로브를 통해 개별 나노구조와 전기적 측정을 조작할 수 있으며, 동시에 전기 측정도 수행할 수 있습니다. 시료의 결정 구조, 화학 성분, 원소 원자에 대한 동적 고해상도 종합 특성 분석이 가능합니다. TEM의 기능과 응용 분야를 크게 확장했습니다. 이로 인해 투과 전자현미경의 기능과 응용 분야가 크게 확장되었습니다.",
  "현장 TEM TEM-STM 전기 측정 시스템은 투과 전자현미경(TEM)과 주사 터널링 현미경(STM)의 기능을 통합한 고급 과학 연구 장비로, 나노 스케일에서 재료의 전기적 특성 연구를 위해 설계되었습니다. 이 시스템은 TEM 환경에서 현장 전기 측정, 구조 영상 및 기계적 조절의 조정 작동을 지원하며, 저차원 재료, 이종접합, 양자 소자, 인터페이스 현상과 같은 고급 주제 연구에 널리 사용되고 있습니다.",
  "PicoFemto 현장 TEM MEMS 대기 가열 측정 시스템은 투과 전자현미경에서 대기와 고온 환경을 생성하며, 1 Bar 및 800 °C의 종단 간 관측 조건을 실현합니다. 이 시스템은 연구자들이 촉매 반응, 산화환원 반응, 저차원 재료 성장/합성, 다양한 부식 반응을 원자 규모에서 실시간으로 관찰할 수 있게 해주며, TEM을 정적 영상 도구에서 강력한 나노랩으로 업그레이드할 수 있게 합니다.",
  "피코펨토 현장 TEM MEMS 액체 전기화학 측정 시스템은 액체 캡슐화를 용이하게 하는 새로운 O-링 보조 씰 설계를 특징으로 합니다. 실험에서는 샘플을 초박 질소 실리콘 필름으로 덮은 액체 셀 안에 밀봉하는데, 이 필름은 1기압을 견딜 수 있습니다. 칩 전극은 외부 회로에 연결되어 전자현미경 내에서 액체-전기화학 시험 환경을 구축합니다.",
  "피코펨토 현장 TEM MEMS 저온 전기 측정 시스템은 표준 MEMS 칩 샘플 로드에 통합된 극저온 제어 모듈로, 극저온 전기 측정 또는 전온 측정 기능을 구현합니다.",
  "PicoFemto 현장 TEM MEMS 가열 전기 측정 시스템, 투과 전자현미경은 고시간 해상도로 원자 수준의 공간 해상도를 얻을 수 있는 실험 도구입니다. 투과 전자현미경 현장 가열/전기 측정 시스템은 MEMS 마이크로 가열 칩과 표준 형태의 투과 전자현미경 샘플 막대 안에 장착된 전기 측정 칩으로 구성됩니다. 마이크로 가열 칩은 시료를 제어된 온도로 가열할 수 있고, 전기 측정 칩은 시료의 전기적 특성을 측정할 수 있습니다. 가열과 전기 측정 시점에 시료의 결정 구조, 화학 성분 및 원소 원자 상태를 동적이고 높은 해상도로 특성화할 수 있어 투과 전자현미경의 기능과 응용 분야가 크게 확장됩니다.",
  "피코펨토 현장 TEM 신장 측정 시스템은 투과 전자현미경을 통한 재료 구조 변화를 현장 관찰과 함께 실온에서 재료에 인장력을 가할 수 있게 합니다. 이 시스템은 단일 경사진 신장 시료 막대, 신장 컨트롤러, 특수 신장 시료 운반 시트를 포함합니다. 응용 방향: 금속 재료, 나노재료, 박막 등의 기계적 변화 메커니즘을 연구합니다.",
  "피코펨토인 제자리 TEM 360° 수평 회전 측정 시스템은 β각 기울기와 360° 수평 회전을 모두 갖추고 있어 투과전자 현미경에서 다자유도, 고정밀 시료 회전을 가능하게 합니다.",
  "현장 TEM 냉동 측정 시스템은 재료 과학, 구조생물학, 나노기술과 같은 최첨단 분야를 위해 설계된 고정밀 저온 동적 관측 장치입니다. 이 시스템은 고해상도 투과 전자현미경(TEM)과 연동되어 초저온 조건에서 시료의 구조, 형태, 동적 진화를 실시간으로 현장에서 관찰할 수 있습니다. 저온 민감 시료의 미시적 거동을 분석하는 데 필수적인 연구 도구입니다.",
  "피코펨토 현장 TEM 진공 전달 측정 시스템은 진공 챔버나 글러브 박스에서 투과 전자현미경으로 샘플을 이동할 수 있도록 수납식 극단을 갖추도록 설계되어 대기 환경에 영향을 받지 않습니다.",
  "PicoFemto 현장 TEM 다중 웰 측정 시스템, 다공 샘플 바는 연구자가 최대 세 개의 샘플을 투과 전자현미경에 동시에 배치할 수 있게 하여 투과 전자현미경 사용 효율을 크게 향상시킵니다. 이 제품은 각 샘플을 양방향으로 독립적으로 기울일 수 있는 이중 틸트 버전으로도 제공됩니다.",
  "피코펨토 현장 TEM 고온 기계적 측정 시스템(정량적 힘 + 전기 + 3D 조작 + 가열)은 기계적 측정 모듈과 MEMS 칩 모듈을 동시에 통합하여 시료를 1000°C에서 가열하면서 정량적 기계적 측정을 수행할 수 있습니다. 이는 진정한 의미의 투과 전자현미경에서 고해상도 정량적 현장 기계 연구를 실현합니다. 기계식 센서 표시기.",
  "PicoFemto 현장 MEMS-TEM-STM 다중장 측정 시스템(비정량적 힘 + 전기 + 빛 + 가열)은 혁신적인 현장 투과 전자 현미경 실험 시스템으로, 연구자들이 투과 전자현미경에서 제어된 다장 환경(힘, 열, 빛, 전기 등)을 구축하여 다중 여기 하에서 재료나 장치 등의 현장 특성화를 달성할 수 있게 합니다.",
  "피코펨투인-제자리 TEM 광전 특성 시험 시스템(비정량적 힘 + 전기 + 빛 + 3차원 조작)은 표준 TEM-STM 시료봉 내에 광섬유 장치를 통합하여 외부 분광기 또는 레이저와 함께 사용하여 광전자 측정 또는 CL 측정을 수행합니다.",
  "피코펨토 현장 TEM 저온전기 시험 시스템(비정량적 힘 + 전기 + 극저온 + 3D 조작)은 표준 TEM-STM 시료봉 내에 극저온 환경 제어 장치를 통합하여, 투과 전자현미경에서 현장 냉동 전기 측정의 목적을 실현합니다.",
  "PicoFemto 현장 TEM 기계-전기 측정 시스템(정량적 힘 + 전기 + 3D 조작)은 표준 TEM-STM 샘플 로드 내에 나노 힘 센서를 통합하여 고정밀 기계 및 전기적 측정을 실현합니다.",
];

const temFeatures = [
  ["높은 안정성", "긴 수명", "초저유지보수 비용", "방대한 사용자 기반"],
  [" 매우 넓은 기계적 측정 및 온도 제어 범위", "고안정성", "초장수명", "여러 분야의 기계 연구"],
  ["연속 온도 조절 가능, 높은 안정성", "저온은 시료와 전기적 연구에 가해지는 응력을 실현할 수 있습니다", "고안정성", "초장수명"],
  [" 양방향 광섬유의 사용은 CL 분광학, 광전 검출, 전기발광 분광법 및 기타 연구에 적용될 수 있습니다", " 고확장성을 가진 광 적분 솔루션", "전자현미경의 원래 해상도를 보장하기 위한 높은 안정성", "초장수명"],
  ["전자 현미경의 원래 해상도를 보장하며, 구면 수차에서도 선명한 원자 이미지를 포착할 수 있습니다", "우수한 기동 안정성, 압전 세라믹 구동 모드로 고정밀 기동을 보장합니다.", "힘과 전기 통합 솔루션, 기계적 및 전기 구성으로 대부분의 시험 요구를 충족합니다", "조작이 쉽고, 친숙"],
  [""],
  [""],
  ["TEM 진공과 호환", "최소 100 nm 액체 전지 스페이서 두께", "전압 출력 최대 ± 200 V, 최소 해상도 ± 100 nV", "정전압 또는 일정 전류 모드"],
  ["스트레인 분석", "구조 변화 분석", "정밀 측정", "고성능 분석"],
  ["열팽창 분석", "온도 제어", "구조 안정성", "정밀 데이터"],
  ["전압 제어 분석", "정밀 전기 분석", "고해상도", "연구 효율"],
  ["자기장 분석", "정밀 측정", "고성능 분석", "데이터 안정성"],
  ["표면 반응 분석", "실시간 분석", "고해상도", "연구 활용"],
  ["배터리 분석", "충방전 분석", "정밀 데이터", "고성능"],
  ["반도체 분석", "미세 구조 분석", "고정밀", "연구 최적화"],
  ["촉매 분석", "반응 분석", "고해상도", "데이터 신뢰성"],
  ["폴리머 분석", "구조 분석", "정밀 데이터", "연구 효율"],
  ["3D 분석", "토모그래피", "고해상도", "데이터 정확성"],
  ["생체 샘플 분석", "고정밀 분석", "데이터 안정성", "연구 최적화"],
  ["맞춤형 분석", "다양한 환경", "고성능", "확장성"],
];

const temDescriptionsEn = [
  "The PicoFemto in-situ MEMS-TEM-STM multi-field measurement system enables researchers to build a controlled multi-field environment inside a TEM for in-situ characterization of materials or devices under multiple excitations.",
  "The PicoFemto in-situ TEM high-temperature mechanics system integrates a mechanical measurement module and MEMS chip module, enabling quantitative mechanical measurement while heating samples up to 1000 °C.",
  "The PicoFemto in-situ TEM-STM low-temperature electrical measurement system is a standard TEM holder equipped with scanning probe control for simultaneous nanostructure manipulation and electrical measurement.",
  "The PicoFemto in-situ TEM-STM photoelectric integrated measurement system is a standard TEM holder equipped with probe control, enabling simultaneous nanostructure manipulation and photoelectric/electrical measurement.",
  "The PicoFemto in-situ TEM-STM integrated force measurement system enables simultaneous nanostructure manipulation, force measurement, and electrical testing with high-resolution in-situ characterization.",
  "The in-situ TEM-STM electrical measurement system integrates TEM and STM capabilities for nano-scale electrical property research with synchronized structural imaging and electrical testing.",
  "The PicoFemto in-situ TEM MEMS atmosphere heating system creates controlled gas and high-temperature environments inside TEM, enabling real-time atomic-scale observation of reactions and growth processes.",
  "The PicoFemto in-situ TEM MEMS liquid electrochemical system features a liquid-cell design with O-ring-assisted sealing, enabling liquid electrochemical experiments inside the electron microscope.",
  "The PicoFemto in-situ TEM MEMS low-temperature electrical system integrates a cryogenic control module into a standard MEMS chip holder for low-temperature electrical measurement.",
  "The PicoFemto in-situ TEM MEMS heated electrical system combines micro-heating and electrical measurement chips, enabling dynamic high-resolution characterization during heating and electrical testing.",
  "The PicoFemto in-situ TEM stretching system applies tensile force to materials at room temperature while observing structural changes inside the TEM.",
  "The PicoFemto in-situ TEM 360° horizontal rotating system supports both beta tilt and full horizontal rotation for multi-degree, high-precision sample rotation inside TEM.",
  "The in-situ TEM cryogenic measurement system is a high-precision low-temperature observation device for real-time structural and dynamic analysis of cryo-sensitive samples.",
  "The PicoFemto in-situ TEM vacuum transfer system enables sample transfer from vacuum chambers or glove boxes to the TEM without atmospheric exposure.",
  "The PicoFemto in-situ TEM multi-well system allows up to three samples to be loaded simultaneously, greatly improving TEM efficiency.",
  "The PicoFemto in-situ TEM high-temperature mechanical system integrates quantitative force, electrical measurement, 3D manipulation, and heating for high-resolution mechanical studies inside TEM.",
  "The PicoFemto in-situ MEMS-TEM-STM multi-field system combines force, electricity, light, and heating to build a controlled multi-field environment inside the TEM.",
  "The PicoFemto in-situ TEM photoelectric property testing system integrates optical fiber devices into a TEM-STM holder for photoelectric and cathodoluminescence measurements.",
  "The PicoFemto in-situ TEM cryo-electrical testing system integrates cryogenic environment control into a TEM-STM holder for in-situ low-temperature electrical measurement.",
  "The PicoFemto in-situ TEM mechanical-electrical system integrates nano-force sensing into a TEM-STM sample holder for high-precision mechanical and electrical measurement."
];

const temDescriptionsZh = [
  "PicoFemto 原位 MEMS-TEM-STM 多场测量系统可在 TEM 内构建受控多场环境，实现多激励条件下对材料或器件的原位表征。",
  "PicoFemto 原位 TEM 高温力学测量系统集成机械测量模块与 MEMS 芯片模块，可在样品加热至 1000°C 时进行定量力学测量。",
  "PicoFemto 原位 TEM-STM 低温电学测量系统为标准 TEM 样品杆，配备扫描探针控制装置，可实现纳米结构操控与电学测量。",
  "PicoFemto 原位 TEM-STM 光电一体化测量系统为标准 TEM 样品杆，可同时进行纳米结构操控以及光电/电学测试。",
  "PicoFemto 原位 TEM-STM 力学一体化系统支持纳米结构操控、力学测量与电学测试，并可进行高分辨原位表征。",
  "原位 TEM-STM 电学测量系统融合 TEM 与 STM 功能，可进行纳米尺度电学特性研究，并同步进行结构成像与电学测试。",
  "PicoFemto 原位 TEM MEMS 气氛加热系统可在 TEM 中建立可控气氛与高温环境，实现原子尺度反应与生长过程的实时观察。",
  "PicoFemto 原位 TEM MEMS 液体电化学系统采用 O 型圈辅助密封液体池结构，可在电子显微镜内进行液体电化学实验。",
  "PicoFemto 原位 TEM MEMS 低温电学系统将低温控制模块集成到标准 MEMS 芯片样品杆中，实现低温电学测量。",
  "PicoFemto 原位 TEM MEMS 加热电学系统结合微加热芯片与电学测量芯片，可在加热和电测过程中进行动态高分辨表征。",
  "PicoFemto 原位 TEM 拉伸系统可在室温下对材料施加拉伸力，并在 TEM 内同步观察结构变化。",
  "PicoFemto 原位 TEM 360° 水平旋转系统同时支持 β 倾转与 360° 水平旋转，实现 TEM 内多自由度高精度样品旋转。",
  "原位 TEM 低温冷冻测量系统是一种高精度低温观察装置，可对低温敏感样品进行实时结构与动态演化分析。",
  "PicoFemto 原位 TEM 真空转移系统支持样品从真空腔体或手套箱转移至 TEM，全程避免暴露于大气环境。",
  "PicoFemto 原位 TEM 多孔位系统可同时装载最多三个样品，显著提升 TEM 使用效率。",
  "PicoFemto 原位 TEM 高温机械系统集成定量力、 电学、三维操控和加热功能，可在 TEM 内进行高分辨机械研究。",
  "PicoFemto 原位 MEMS-TEM-STM 多场系统可在 TEM 内构建力、热、光、电等多场耦合环境，实现多激励原位表征。",
  "PicoFemto 原位 TEM 光电性能测试系统将光纤装置集成到 TEM-STM 样品杆中，可进行光电与阴极发光测量。",
  "PicoFemto 原位 TEM 低温电学测试系统将低温环境控制集成到 TEM-STM 样品杆中，实现原位低温电学测试。",
  "PicoFemto 原位 TEM 机电测量系统将纳米力传感器集成到 TEM-STM 样品杆中，实现高精度机电耦合测量。"
];

const temBriefDescriptionsEn = [
  "A basic TEM/SEM solution for real-time observation of structural changes in samples during in-situ experiments.",
  "An in-situ analysis system suitable for tracking microstructural changes under heating conditions.",
  "A model that allows precise observation of sample response during tensile and deformation testing.",
  "Enables stable observation of surface and internal changes in materials under cooling conditions.",
  "A versatile in-situ TEM/SEM system suitable for batteries, semiconductors, and metallic materials.",
  "A dynamic analysis system for monitoring time-dependent microstructural changes.",
  "An in-situ analysis model well suited for observing interface changes and defect formation in composite materials.",
  "A research solution that supports high-magnification imaging and integration with experimental stages.",
  "An in-situ system designed for intuitive understanding of sample response during experiments.",
  "Suitable for analyzing structural changes caused by heat, stress, and electrical stimulation.",
  "A TEM/SEM application system useful for material development and failure analysis.",
  "A multipurpose in-situ solution suitable for broad use in laboratories and analytical centers.",
  "A stable TEM/SEM system designed for both precise observation and repetitive experiments.",
  "A high-efficiency analysis system capable of capturing sample response in real time.",
  "An expandable TEM/SEM solution compatible with various in-situ accessories.",
  "A system for detailed observation of structural changes in nanomaterials and thin films.",
  "Ideal for users who need both experimental condition control and image acquisition.",
  "A dedicated in-situ system for advanced application analysis and research data acquisition.",
  "A highly reliable TEM/SEM system that supports accurate structural interpretation and response tracking.",
  "An integrated in-situ TEM/SEM solution usable across various research environments."
];

const temBriefDescriptionsZh = [
  "可在原位实验环境下实时观察样品结构变化的基础型 TEM/SEM 解决方案。",
  "适合在加热条件下追踪微观结构变化的原位分析设备。",
  "可在拉伸及变形试验中精确观察样品反应的型号。",
  "可在冷却条件下稳定观察材料表面及内部变化。",
  "适用于电池、半导体及金属材料分析的通用型原位 TEM/SEM 系统。",
  "用于观察微观结构随时间变化的动态分析设备。",
  "适用于观察复合材料界面变化及缺陷产生的原位分析型号。",
  "支持高倍率成像并可联动实验台的研究型解决方案。",
  "专为在实验过程中直观掌握样品反应而设计的原位设备。",
  "适用于分析热、应力及电刺激引起结构变化的型号。",
  "适用于材料开发和失效分析的 TEM/SEM 应用设备。",
  "可广泛应用于实验室和分析中心的多用途原位解决方案。",
  "兼顾精密观察与重复实验需求的稳定型 TEM/SEM 设备。",
  "可实时获取样品反应图像的高效率分析系统。",
  "可与多种原位附件联动的扩展型 TEM/SEM 解决方案。",
  "可细致观察纳米材料与薄膜样品结构变化的设备。",
  "适合同时重视实验条件控制与图像获取的用户。",
  "用于高级应用分析与研究数据获取的专用原位设备。",
  "支持精确结构解析与反应追踪的高可靠性 TEM/SEM 系统。",
  "可适用于多种研究环境的一体化原位 TEM/SEM 解决方案。"
];

const temFeaturesEn = [
  ["High stability", "Long lifetime", "Ultra-low maintenance cost", "Large user base"],
  ["Wide mechanical measurement and temperature-control range", "High stability", "Ultra-long lifetime", "Mechanical research for multiple fields"],
  ["Continuous temperature control", "Low-temperature electrical/stress testing", "High stability", "Ultra-long lifetime"],
  ["Bidirectional optical fiber for CL/photoelectric/electroluminescence studies", "Highly expandable optical integration solution", "High stability to preserve original TEM resolution", "Ultra-long lifetime"],
  ["Preserves original TEM resolution even with aberration correction", "Excellent motion stability with piezo-ceramic drive", "Integrated force and electrical solution", "Easy and familiar operation"],
  ["Electrical property measurement", "Nano-scale manipulation", "High resolution", "Research efficiency"],
  ["Gas-environment analysis", "High-temperature reaction observation", "Real-time analysis", "Advanced research"],
  ["TEM vacuum compatible", "Minimum 100 nm liquid cell spacer thickness", "Voltage output up to ±200 V with ±100 nV resolution", "Constant voltage or constant current mode"],
  ["Strain analysis", "Structural change analysis", "Precise measurement", "High-performance analysis"],
  ["Thermal expansion analysis", "Temperature control", "Structural stability", "Precision data"],
  ["Voltage-controlled analysis", "Precision electrical analysis", "High resolution", "Research efficiency"],
  ["Magnetic field analysis", "Precision measurement", "High-performance analysis", "Data stability"],
  ["Surface reaction analysis", "Real-time analysis", "High resolution", "Research application"],
  ["Battery analysis", "Charge/discharge analysis", "Precision data", "High performance"],
  ["Semiconductor analysis", "Microstructure analysis", "High precision", "Research optimized"],
  ["Catalyst analysis", "Reaction analysis", "High resolution", "Reliable data"],
  ["Polymer analysis", "Structure analysis", "Precision data", "Research efficiency"],
  ["3D analysis", "Tomography", "High resolution", "Data accuracy"],
  ["Biological sample analysis", "High-precision analysis", "Data stability", "Research optimized"],
  ["Custom analysis", "Various environments", "High performance", "Expandability"]
];

const temFeaturesZh = [
  ["高稳定性", "长寿命", "超低维护成本", "庞大用户基础"],
  ["宽范围力学测量与温控", "高稳定性", "超长寿命", "多领域力学研究"],
  ["连续温度控制", "低温电学/应力研究", "高稳定性", "超长寿命"],
  ["双向光纤支持 CL/光电/电致发光研究", "高扩展性光学集成方案", "保持原始 TEM 分辨率的高稳定性", "超长寿命"],
  ["保持原始 TEM 分辨率并获取清晰原子像", "压电陶瓷驱动带来优异运动稳定性", "力学与电学一体化方案", "操作简便、易上手"],
  ["电学特性测量", "纳米操控", "高分辨率", "研究效率"],
  ["气氛环境分析", "高温反应观察", "实时分析", "先进研究"],
  ["兼容 TEM 真空环境", "最小 100 nm 液体池隔片厚度", "电压输出最高 ±200 V，分辨率 ±100 nV", "恒压或恒流模式"],
  ["应变分析", "结构变化分析", "精密测量", "高性能分析"],
  ["热膨胀分析", "温度控制", "结构稳定性", "精密数据"],
  ["电压控制分析", "精密电学分析", "高分辨率", "研究效率"],
  ["磁场分析", "精密测量", "高性能分析", "数据稳定性"],
  ["表面反应分析", "实时分析", "高分辨率", "研究应用"],
  ["电池分析", "充放电分析", "精密数据", "高性能"],
  ["半导体分析", "微结构分析", "高精度", "研究优化"],
  ["催化剂分析", "反应分析", "高分辨率", "数据可靠性"],
  ["聚合物分析", "结构分析", "精密数据", "研究效率"],
  ["3D 分析", "断层成像", "高分辨率", "数据准确性"],
  ["生物样品分析", "高精度分析", "数据稳定性", "研究优化"],
  ["定制分析", "多种环境", "高性能", "扩展性"]
];



// 👇 기존 코드 그대로 이어짐
const temProducts: Product[] = Array.from({ length: 20 }, (_, i) =>
  makeProduct({
    slug: `tem-${String(i + 1).padStart(2, "0")}`,
    category: "tem",

    title: temNames[i],
    categoryLabel: "TEM",
    type: "TEM",

    image: `/products/tem-${String(i + 1).padStart(2, "0")}.png`,

    subtitle: "TRANSMISSION ELECTRON MICROSCOPE",

    // 👉 카드에서 보이는 짧은 설명
    description: temDescriptions[i],

    // 👉 상세페이지 상단 문장 (개별 적용)
    overview: temDescriptions[i],

    // 👉 상세페이지 핵심 특징 (개별 적용)
    features: temFeatures[i],

    // 👉 요약 문장 (옵션)
    briefInfo: temBriefDescriptions[i],

    useOptions: false,
    useSoftware: false,
    useGallery: false,
  })
);

const ionCoaterProducts: Product[] = [
  makeProduct({
    slug: "ion-coater-a",
    category: "ion-coater",
    title: "CT-1000",
    categoryLabel: "Ion Coater",
    type: "COATER",
    image: "/products/CT-1000.png",
    subtitle: "ION COATING SOLUTION",
    description: "시편 표면 코팅과 전처리를 위한 이온 코터 장비",
    overview:
      "전자현미경 관찰 전 시편 표면을 안정적으로 코팅하여 더 좋은 분석 품질을 확보할 수 있는 장비입니다.",
    features: ["균일 코팅", "전처리 품질 향상", "간편한 운용", "다양한 시편 대응"],
    useOptions: false,
    useSoftware: false,
    useGallery: true,
  }),
];

const products: Product[] = [...semProducts, ...normalSemProducts, ...temProducts, ...ionCoaterProducts];

function scrollToSection(id: string) {
  if (typeof window === "undefined") return;
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setQueryParams(params: Record<string, string | null>) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  });

  window.history.pushState({}, "", url.toString());
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function goToCategory(category: string) {
  setQueryParams({ category, product: null });
}

function goToProduct(slug: string, category?: string) {
  setQueryParams({ category: category ?? null, product: slug });
}

function clearAllViews() {
  setQueryParams({ category: null, product: null });
}

function clearProductViewToCategory(category: string) {
  setQueryParams({ category, product: null });
}

function useRouteState() {
  const [state, setState] = useState<{ category: string | null; product: string | null }>({
    category: null,
    product: null,
  });

  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      setState({
        category: params.get("category"),
        product: params.get("product"),
      });
    };

    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return state;
}

function TopNav({ dark = true, lang, setLang }: { dark?: boolean; lang: Lang; setLang: (lang: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseBg = dark ? "bg-[#08111b]/70" : "bg-white/90";
  const scrolledBg = dark ? "bg-[#08111b]/88" : "bg-white/95";
  const textColor = dark ? "text-white/80 hover:text-white" : "text-[#222] hover:text-[#1457b5]";
  const borderColor = dark ? "border-white/10" : "border-black/10";

  return (
    <header
      className={[
        "fixed left-1/2 top-0 z-50 flex w-full max-w-[1920px] -translate-x-1/2 items-center justify-between border-b px-8 lg:px-14",
        "transition-all duration-300 backdrop-blur-md",
        borderColor,
        scrolled ? `${scrolledBg} py-4 shadow-[0_8px_30px_rgba(0,0,0,0.16)]` : `${baseBg} py-5`,
      ].join(" ")}
    >
      <button onClick={clearAllViews} aria-label={trText("홈", lang)} className="transition hover:opacity-90">
        <img src="/logo.png" alt="ETS Logo" className="h-9 w-auto object-contain lg:h-11" />
      </button>

      <nav className="hidden items-center gap-10 lg:flex">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              if (item.target === "products") {
                clearAllViews();
                setTimeout(() => scrollToSection(item.target), 80);
              } else {
                scrollToSection(item.target);
              }
            }}
            className={`group relative text-[13px] font-semibold transition ${textColor}`}
          >
            {trText(item.label, lang)}
            <span className="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#1457b5] transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </nav>

      <div className="hidden items-center gap-2 lg:flex">
        {(["ko", "en", "zh"] as Lang[]).map((code) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={[
              "rounded-full border px-3 py-1 text-[12px] font-semibold transition",
              dark
                ? lang === code
                  ? "border-white/40 bg-white text-[#111]"
                  : "border-white/20 bg-white/10 text-white/80 hover:bg-white/20"
                : lang === code
                  ? "border-[#1457b5] bg-[#1457b5] text-white"
                  : "border-black/10 bg-white text-[#333] hover:border-[#1457b5] hover:text-[#1457b5]",
            ].join(" ")}
          >
            {code === "ko" ? "한글" : code === "en" ? "English" : "中文"}
          </button>
        ))}
      </div>

      <button className="flex h-10 w-10 items-center justify-center lg:hidden" aria-label={lang === "ko" ? "메뉴" : lang === "en" ? "Menu" : "菜单"}>
        <span className={dark ? "text-2xl text-white" : "text-2xl text-[#222]"}>≡</span>
      </button>
    </header>
  );
}

function PillButton({
  children,
  light = false,
  onClick,
  lang,
}: {
  children: React.ReactNode;
  light?: boolean;
  onClick?: () => void;
  lang: Lang;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex h-[44px] min-w-[150px] items-center justify-center rounded-full px-6 text-[13px] font-semibold transition duration-300",
        light
          ? "bg-white text-[#1457b5] hover:-translate-y-0.5 hover:bg-[#f3f7ff]"
          : "border border-white/30 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/18",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function GridCard({
  title,
  subtitle,
  description,
  image,
  sliderImages,
  imageScale = "scale-[1]",
  imageTranslate = "translate-x-0",
  heightClass,
  pdfUrl,
  onClick,
  lang,
}: {
  title: string;
  subtitle?: string;
  description: React.ReactNode;
  image: string;
  sliderImages?: string[];
  imageScale?: string;
  imageTranslate?: string;
  heightClass: string;
  pdfUrl?: string;
  onClick?: () => void;
  lang: Lang;
}) {
  const slides = sliderImages && sliderImages.length > 0 ? sliderImages : [image];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(slides.length > 1);

  useEffect(() => {
    setCurrentIndex(0);
    setIsAutoPlaying(slides.length > 1);
  }, [slides.length, image]);

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const goPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (slides.length > 1) {
      setIsAutoPlaying(false);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group overflow-hidden rounded-[6px] ${heightClass} cursor-pointer border border-[#e5e7eb] bg-white`}
    >
      <div className="flex h-full flex-col">
        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfe_72%,#f7f9fc_100%)] px-6 pt-7 sm:px-8 sm:pt-8">
          <button
            type="button"
            onClick={handleImageClick}
            className="flex min-h-[230px] w-full items-center justify-center sm:min-h-[270px] lg:min-h-[290px]"
            aria-label={`${title} ${lang === "ko" ? "이미지 영역" : lang === "en" ? "image area" : "图片区域"}`}
          >
            <img
              src={slides[currentIndex]}
              alt={title}
              className={[
                "h-auto max-h-[230px] w-auto max-w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.08)] sm:max-h-[270px] lg:max-h-[290px]",
                imageScale,
                imageTranslate,
              ].join(" ")}
              lang={lang}
        />
          </button>

          {slides.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/92 text-[22px] text-[#111] shadow-sm transition hover:bg-white"
                aria-label={lang === "ko" ? "이전 이미지" : lang === "en" ? "Previous image" : "上一张图片"}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/92 text-[22px] text-[#111] shadow-sm transition hover:bg-white"
                aria-label={lang === "ko" ? "다음 이미지" : lang === "en" ? "Next image" : "下一张图片"}
              >
                ›
              </button>

              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={`${title}-dot-${index}`}
                    type="button"
                    onClick={(e) => goToSlide(e, index)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentIndex === index ? "w-6 bg-[#1457b5]" : "w-2.5 bg-black/20 hover:bg-black/35"
                    }`}
                    aria-label={lang === "ko" ? `${index + 1}번 이미지로 이동` : lang === "en" ? `Go to image ${index + 1}` : `跳转到第 ${index + 1} 张图片`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col bg-[#f6f7f9] px-6 py-6 text-[#111] sm:px-8 sm:py-8">
          {subtitle ? (
            <div className="mb-3 break-words text-[10px] font-medium tracking-[0.12em] text-[#666] sm:text-[11px]">
              {subtitle}
            </div>
          ) : null}

          <h3 className="max-w-full break-words text-[24px] font-extrabold leading-[1.02] sm:text-[30px]">
            {title}
          </h3>

          <div className="mt-4 break-words text-[14px] leading-6 text-[#555] sm:leading-7">{description}</div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex h-[40px] w-[120px] items-center justify-center rounded-full border border-[#1457b5] text-[13px] text-[#1457b5] transition hover:bg-[#1457b5] hover:text-white"
            >
              {trText("바로 가기", lang)}
            </button>

            <a
              href={pdfUrl ?? "#"}
              download
              onClick={(e) => e.stopPropagation()}
              className="inline-flex h-[40px] min-w-[138px] items-center justify-center rounded-full border border-[#111] px-4 text-[13px] font-medium text-[#111] transition hover:bg-[#111] hover:text-white"
            >
              {trText("PDF 다운", lang)}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClickZoomImage({
  src,
  alt,
  imageClassName = "",
  wrapperClassName = "",
  modalImageClassName = "",
  modalSrc,
  lang,
}: {
  src: string;
  alt: string;
  imageClassName?: string;
  wrapperClassName?: string;
  modalImageClassName?: string;
  modalSrc?: string;
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className={`block w-full cursor-zoom-in ${wrapperClassName}`}
        aria-label={`${alt} ${lang === "ko" ? "이미지 확대" : lang === "en" ? "Zoom image" : "放大图片"}`}
      >
        <img src={src} alt={alt} className={imageClassName} />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex h-full w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20"
              aria-label={lang === "ko" ? "닫기" : lang === "en" ? "Close" : "关闭"}
            >
              ×
            </button>

            <img
              src={modalSrc ?? src}
              alt={alt}
              className={`max-h-[92vh] max-w-[92vw] object-contain ${modalImageClassName}`}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

function ZoomImage({ src, alt, lang }: { src: string; alt: string; lang: Lang }) {
  const [zoomStyle, setZoomStyle] = useState<CSSProperties>({
    transform: "scale(1)",
    transformOrigin: "center",
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.6)",
    });
  };

  const handleLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center",
    });
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative block w-full overflow-hidden rounded-[18px] border border-[#e5e7eb] bg-white cursor-zoom-in"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        aria-label={`${alt} ${lang === "ko" ? "이미지 확대" : lang === "en" ? "Zoom image" : "放大图片"}`}
      >
        <img
          src={src}
          alt={alt}
          className="h-[240px] w-full object-contain transition duration-200 ease-out sm:h-[320px] lg:h-[380px] 2xl:h-[420px]"
          style={zoomStyle}
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-h-full max-w-[1400px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20"
              aria-label={lang === "ko" ? "닫기" : lang === "en" ? "Close" : "关闭"}
            >
              ×
            </button>
            <img
              src={src}
              alt={alt}
              className="max-h-[88vh] w-auto max-w-full rounded-[16px] object-contain shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

function SpecificationTable({ specs, lang }: { specs: SpecSection[]; lang: Lang }) {
  return (
    <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
      <h2 className="text-[34px] font-bold tracking-[-0.03em] text-[#111]">{trText("Specification", lang)}</h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-[24px] border border-[#2f7bc5]">
          <tbody>
            {specs.map((section, idx) => (
              <tr key={`${trText(section.group, lang)}-${idx}`}>
                <td className="w-[280px] border-r border-t border-[#7fb2df] bg-[#0f67b2] px-4 py-4 text-[15px] font-semibold text-white first:border-t-0">
                  {trText(section.group, lang)}
                </td>
                <td className="whitespace-pre-line border-t border-[#7fb2df] bg-white px-4 py-4 text-[15px] leading-7 text-[#2f5f93] first:border-t-0">
                  {trText(section.rows[0]?.value, lang)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function OptionsSection({ options, lang }: { options: OptionItem[]; lang: Lang }) {
  return (
    <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">{trText("OPTIONAL SYSTEM", lang)}</div>
          <h2 className="mt-2 text-[34px] font-bold tracking-[-0.03em] text-[#111]">{trText("Options", lang)}</h2>
          <p className="mt-3 text-[15px] leading-7 text-[#66707d]">
            {lang === "ko" ? "장비 확장과 분석 기능 향상을 위한 다양한 옵션 구성을 제공합니다." : lang === "en" ? "We provide a range of optional configurations to expand equipment capability and improve analysis performance." : "提供多种可选配置，以扩展设备能力并提升分析性能。"}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {options.map((item, idx) => (
          <div
            key={`${trText(item.title, lang)}-${idx}`}
            className="group rounded-[20px] border border-[#e6ebf2] bg-[#f8fafc] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1457b5] hover:bg-white hover:shadow-[0_16px_34px_rgba(20,87,181,0.12)]"
          >
            <div className="flex h-[180px] items-center justify-center rounded-[18px] border border-[#edf2f7] bg-white">
              {item.image && !item.placeholder ? (
                <div className="flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={trText(item.title, lang)}
                    className="max-h-[145px] max-w-[145px] object-contain transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="flex h-[120px] w-[120px] items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#dbeafe_0%,#eff6ff_100%)] text-center">
                  <div>
                    <div className="text-[28px] font-bold leading-none text-[#1457b5]">+</div>
                    <div className="mt-2 text-[11px] font-semibold tracking-[0.14em] text-[#5f6f85]">
                      OPTION
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5">
              <h3 className="text-[20px] font-bold tracking-[-0.02em] text-[#111]">{trText(item.title, lang)}</h3>
              {item.subtitle ? (
                <p className="mt-2 text-[14px] leading-6 text-[#6b7280]">{trText(item.subtitle, lang)}</p>
              ) : (
                <p className="mt-2 text-[14px] leading-6 text-[#8a94a6]">{trText("Compatible optional module", lang)}</p>
              )}
            </div>

            <div className="mt-5 h-px w-full bg-[#e5eaf1]" />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[12px] font-medium tracking-[0.08em] text-[#7a8798]">{trText("AVAILABLE OPTION", lang)}</span>
              <span className="text-[18px] text-[#1457b5] transition group-hover:translate-x-1">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SoftwareSection({ items, lang }: { items: SoftwareItem[]; lang: Lang }) {
  return (
    <section className="space-y-8">
      {items.map((item, idx) => (
        <section
          key={`${trText(item.title, lang)}-${idx}`}
          className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10"
        >
          <div className="max-w-[980px]">
            <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">{trText("SOFTWARE", lang)}</div>
            <h2 className="mt-3 text-[32px] font-bold tracking-[-0.03em] text-[#111] lg:text-[40px]">
              {trText(item.title, lang)}
            </h2>

            <div className="mt-5 space-y-2 text-[16px] leading-8 text-[#4b5563]">
              {item.descriptionLines.map((line, lineIdx) => (
                <p key={`${trText(item.title, lang)}-line-${lineIdx}`}>{trText(line, lang)}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[20px] border border-[#d9e1ea] bg-[#f8fafc]">
            <div className="border-b border-[#e5e7eb] bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f8_100%)] px-5 py-4">
              <div className="text-[14px] font-semibold text-[#334155]">{trText("Software Interface Preview", lang)}</div>
            </div>

            <div className="overflow-hidden rounded-[20px] bg-white">
              <ClickZoomImage
                src={item.image}
                alt={trText(item.title, lang)}
                wrapperClassName="block"
                imageClassName="h-auto w-full object-cover"
                modalImageClassName="bg-white"
                lang={lang}
              />
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}

function BeforeAfterSEM({ afterSrc, title, lang }: { afterSrc: string; title: string; lang: Lang }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="group relative overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-black shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
        <ClickZoomImage
          src={afterSrc}
          alt={`${title} before`}
          imageClassName="h-[300px] w-full object-cover blur-[2px] brightness-[0.7] contrast-[1.2]"
          lang={lang}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay"
          style={{
            backgroundImage: "url('/noise.png')",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-1 text-[12px] text-white">
          {lang === "ko" ? "코팅 전" : lang === "en" ? "BEFORE" : "镀膜前"}
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-black shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
        <ClickZoomImage
          src={afterSrc}
          alt={`${title} after`}
          imageClassName="h-[300px] w-full object-cover"
          lang={lang}
        />
        <div className="absolute left-4 top-4 rounded-full bg-[#1457b5] px-4 py-1 text-[12px] text-white">
          {lang === "ko" ? "코팅 후" : lang === "en" ? "AFTER" : "镀膜后"}
        </div>
      </div>
    </div>
  );
}

function HeroSlider({ lang }: { lang: Lang }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => setIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev + 1) % heroImages.length);

  return (
    <section
      id="home"
      className="relative h-[92vh] min-h-[700px] overflow-hidden cursor-pointer"
      onClick={() => setIsPaused((prev) => !prev)}
    >
      {heroImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`hero-slide-${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
            i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,13,0.62)_0%,rgba(5,10,17,0.36)_30%,rgba(6,12,20,0.18)_60%,rgba(6,12,20,0.10)_100%)]" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="이전 슬라이드"
        className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/25 px-3 py-2 text-xl text-white backdrop-blur transition duration-300 hover:bg-black/45"
      >
        ◀
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="다음 슬라이드"
        className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/25 px-3 py-2 text-xl text-white backdrop-blur transition duration-300 hover:bg-black/45"
      >
        ▶
      </button>

      <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
            aria-label={`슬라이드 ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition duration-300 ${
              i === index ? "bg-white" : "bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="relative z-20 flex h-full items-center justify-center px-6 pt-16 text-center lg:px-10">
        <div className="mx-auto max-w-[980px] text-white">
          <div className="mb-6 text-[12px] font-medium tracking-[0.16em] text-white/78">
            {trText("THE BEST 고성능 분석장비 솔루션", lang)}
          </div>

          <h1 className="text-[38px] font-extrabold leading-[1.25] tracking-[-0.02em] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.62)] lg:text-[68px]">
            {trText("전자현미경 및 분석", lang)}
            <br />
            {trText("장비 전문 기업", lang)}
          </h1>

          <p className="mx-auto mt-6 max-w-[720px] text-[15px] leading-8 text-white/88 lg:text-[17px]">
            {trText("정밀관찰, 재료분석, 품질평가를 위한 전자현미경 및 분석장비 솔루션을 제공합니다.", lang)}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PillButton onClick={() => scrollToSection("products")}>{trText("바로 보러가기", lang)}</PillButton>
            <PillButton light onClick={() => scrollToSection("footer-cta")}>{trText("문의하기", lang)}</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductShowcase({ lang }: { lang: Lang }) {
  const mainCategoryCards: ShowcaseCard[] = [
    {
      slug: "sem",
      title: "주사전자현미경",
      subtitle: "SCANNING ELECTRON MICROSCOPE",
      description: "3개의 Table Top SEM, 1개의 Normal SEM 제품 라인업",
      image: "/products/im-10.png",
      sliderImages: ["/products/im-10.png", "/products/im-18.png", "/products/im-20.png", "/products/im-300.png"],
      imageScale: "scale-[1.05]",
      imageTranslate: "translate-x-[2%]",
      pdfUrl: "/pdf/sem.pdf",
    },
    {
  slug: "tem",
  title: "IN-SITU TEM/SEM SOLUTIONS",
  subtitle: "IN-SITU TEM / SEM SOLUTIONS",
  description: "In-situ 분석 및 특수 응용을 위한 TEM/SEM 솔루션 라인업",

  image: "/products/tem-01.png",

  sliderImages: [
    "/products/tem-01.png",
    "/products/tem-02.png",
    "/products/tem-03.png",
    "/products/tem-04.png",
    "/products/tem-05.png",
    "/products/tem-06.png",
    "/products/tem-07.png",
    "/products/tem-08.png",
    "/products/tem-09.png",
    "/products/tem-10.png",
    "/products/tem-11.png",
    "/products/tem-12.png",
    "/products/tem-13.png",
    "/products/tem-14.png",
    "/products/tem-15.png",
    "/products/tem-16.png",
    "/products/tem-17.png",
    "/products/tem-18.png",
    "/products/tem-19.png",
    "/products/tem-20.png",
  ],

  imageScale: "scale-[0.94]",
  imageTranslate: "translate-x-[3%]",
  pdfUrl: "/pdf/in-situ-tem-sem-solutions.pdf",
},
    {
      slug: "normal-sem",
      title: "PRODUCTS INTRODUCTION",
      subtitle: "SAMPLE PREPARATION",
      description: "분석 전처리와 시편 준비를 위한 장비 솔루션",
      image: "/products/PRODUCTS INTRODUCTION.png",
      imageScale: "scale-[0.98]",
      imageTranslate: "translate-x-[4%]",
      pdfUrl: "/pdf/sample-preparation.pdf",
    },
    {
      slug: "ion-coater",
      title: "Ion Coater",
      subtitle: "ION COATING SOLUTION",
      description: "시편 표면 코팅과 전처리를 위한 이온 코터 장비",
      image: "/products/CT-1000.png",
      sliderImages: ["/products/CT-1000.png"],
      imageScale: "scale-[0.92]",
      imageTranslate: "translate-x-[1%]",
      pdfUrl: "/pdf/ion-coater.pdf",
    },
  ];

  return (
    <section id="products" className="bg-[#08111b] px-4 py-14 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 px-2 text-center">
          <div className="text-[11px] font-medium tracking-[0.16em] text-white/50">{trText("PRODUCT LINE", lang)}</div>
          <h2 className="mt-2 text-[28px] font-bold text-white lg:text-[40px]">{trText("제품 소개", lang)}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mainCategoryCards.map((item) => (
            <GridCard
              key={item.slug}
              title={trText(item.title, lang)}
              subtitle={trText(item.subtitle, lang)}
              description={<>{trText(item.description, lang)}</>}
              image={item.image}
              sliderImages={item.sliderImages}
              imageScale={item.imageScale}
              imageTranslate={item.imageTranslate}
              heightClass="min-h-[320px] lg:min-h-[360px]"
              pdfUrl={item.pdfUrl}
              onClick={() => goToCategory(item.slug)}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryBanner({ title, lang }: { title: string; lang: Lang }) {
  return (
    <section className="relative h-[320px] overflow-hidden">
      <img src="/sub/sub-visual.jpg" alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,18,0.72)_0%,rgba(5,10,18,0.42)_55%,rgba(5,10,18,0.25)_100%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] items-end px-6 pb-12 lg:px-8">
        <div className="w-full">
          <div className="text-[12px] font-semibold tracking-[0.18em] text-white/70">{trText("PRODUCT", lang)}</div>
          <h1 className="mt-4 text-[36px] font-bold tracking-[-0.03em] text-white lg:text-[62px]">{title}</h1>

          <div className="mt-5 flex items-center gap-3 text-[13px] text-white/80">
            <span>{trText("홈", lang)}</span>
            <span>/</span>
            <span>{trText("제품소개", lang)}</span>
            <span>/</span>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductListPage({ selectedCategory, lang, setLang }: { selectedCategory: string; lang: Lang; setLang: (lang: Lang) => void }) {
  const activeCategory = selectedCategory || "all";
  const filteredProducts = activeCategory === "all" ? products : products.filter((item) => item.category === activeCategory);

  const currentCategoryName = trText(categories.find((c) => c.slug === activeCategory)?.label ?? "제품소개", lang);
  const visibleCategories = activeCategory === "all" ? categories : categories.filter((category) => category.slug === activeCategory);

  return (
    <main className="min-h-screen bg-[#f4f6f8]">
      <TopNav dark={false} lang={lang} setLang={setLang} />
      <CategoryBanner title={currentCategoryName} lang={lang} />

      <section className="bg-[linear-gradient(180deg,#f7f8fa_0%,#eef2f6_100%)] px-4 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 rounded-[28px] border border-white/70 bg-white/80 px-8 py-10 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="text-[12px] font-semibold tracking-[0.18em] text-[#1457b5]">{trText("PRODUCT CATEGORY", lang)}</div>
            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-[34px] font-bold tracking-[-0.03em] text-[#111] lg:text-[52px]">{currentCategoryName}</h2>
                <p className="mt-3 text-[15px] leading-7 text-[#5b6472]">
                  {trText("선택한 카테고리의 제품을 한눈에 확인하실 수 있습니다.", lang)}
                  <br className="hidden lg:block" />
                  {trText("장비별 상세 보기로 이동해 주요 특징과 구성을 확인해보세요.", lang)}
                </p>
              </div>

              {activeCategory !== "all" && (
                <button
                  onClick={() => goToCategory("all")}
                  className="inline-flex h-[46px] items-center justify-center rounded-full border border-[#1457b5] bg-white px-6 text-[14px] font-semibold text-[#1457b5] transition hover:bg-[#1457b5] hover:text-white"
                >
                  {trText("전체 보기", lang)}
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 rounded-[22px] border border-[#dbe3ec] bg-white p-2 shadow-[0_10px_25px_rgba(15,23,42,0.04)]">
            <div className="flex flex-wrap gap-2">
              {visibleCategories.map((category) => {
                const isActive = category.slug === activeCategory;
                return (
                  <button
                    key={category.slug}
                    onClick={() => goToCategory(category.slug)}
                    className={[
                      "inline-flex h-[46px] min-w-[140px] items-center justify-center rounded-full px-5 text-[14px] font-medium transition",
                      isActive
                        ? "bg-[#1457b5] text-white shadow-[0_10px_22px_rgba(20,87,181,0.22)]"
                        : "bg-[#f7f9fc] text-[#5e6775] hover:bg-[#edf3fb] hover:text-[#1457b5]",
                    ].join(" ")}
                  >
                    {trText(category.label, lang)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="text-[14px] text-[#6a7380]">
              <span className="font-semibold text-[#111]">{trText("Total", lang)} {filteredProducts.length}</span> / 1 {trText("page", lang)}
            </div>

            <button className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#d7dee8] bg-white text-[18px] text-[#95a1b2] transition hover:border-[#1457b5] hover:text-[#1457b5]">
              ⌕
            </button>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.slug}
                className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#dde5ee] bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1457b5] hover:shadow-[0_20px_45px_rgba(20,87,181,0.14)]"
              >
                <div className="relative overflow-hidden border-b border-[#edf1f5] bg-white px-6 py-7 sm:px-8 sm:py-8">
                  <div className="absolute inset-x-0 top-0 h-[4px] bg-[#1457b5] opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="flex h-[220px] items-center justify-center sm:h-[250px]">
                    <img
                      src={product.image}
                      alt={trText(product.title, lang)}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col bg-[linear-gradient(180deg,#f7f9fc_0%,#eef2f6_100%)] px-5 pb-7 pt-5 sm:px-6 sm:pb-8 sm:pt-6">
  <div className="inline-flex rounded-full bg-[#1457b5] px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-white shadow-[0_8px_18px_rgba(20,87,181,0.18)]">
    {product.type}
  </div>

  <div className="mt-3 text-[13px] text-[#5f6a78]">{trText(product.categoryLabel, lang)}</div>

  <div className="mt-3 min-h-[170px] break-words text-[34px] font-bold leading-[0.95] tracking-[-0.04em] text-[#111] sm:min-h-[190px] sm:text-[38px]">
    {trText(product.title, lang)}
  </div>

  <div className="mt-4 min-h-[84px] text-[14px] leading-6 text-[#66707d]">
    {trText(product.description, lang)}
  </div>

  <button
    onClick={() => goToProduct(product.slug, product.category)}
    className="mt-auto inline-flex h-[46px] min-w-[170px] items-center justify-between self-start rounded-full border border-[#1457b5] bg-white px-5 text-[14px] font-semibold text-[#1457b5] transition-all duration-300 hover:bg-[#1457b5] hover:text-white"
  >
    <span>{trText("More Detail", lang)}</span>
    <span className="ml-6">→</span>
  </button>
</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA lang={lang} />
      <SiteFooter lang={lang} />
    </main>
  );
}

function ProductDetailPage({ product, lang, setLang }: { product: Product; lang: Lang; setLang: (lang: Lang) => void }) {


  const showSummaryInSpecArea = (product.category === "tem" || product.slug === "im-18") && !!product.briefInfo;
  const shouldShowSpecs = !showSummaryInSpecArea && !!product.specs && product.specs.length > 0;

  return (
    <main className="min-h-screen bg-[#f4f4f4]">
      <TopNav dark={false} lang={lang} setLang={setLang} />
      <CategoryBanner title={trText(product.categoryLabel, lang)} lang={lang} />

      <section className="px-4 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1280px] space-y-8">
          <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
            <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">{trText(product.categoryLabel, lang)}</div>
            <h1 className="mt-3 break-words text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-[#111] sm:text-[34px] lg:text-[42px] 2xl:text-[54px]">
              {trText(product.title, lang)}
            </h1>
            <div className="mt-2 break-words text-[15px] font-medium leading-7 text-[#666] sm:text-[17px]">{trText(product.subtitle, lang)}</div>

            <div className="mt-8 grid grid-cols-1 gap-8 2xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] 2xl:items-start">
              <div className="min-w-0">
                <ZoomImage src={product.image} alt={trText(product.title, lang)} />
              </div>

              <div className="min-w-0 overflow-hidden">
                <div className="break-words text-[15px] leading-8 text-[#444] sm:text-[16px]">{trText(product.overview, lang)}</div>

                <div className="mt-8">
                  <div className="text-[20px] font-bold text-[#111]">{trText("핵심 특징", lang)}</div>
                  <ul className="mt-4 space-y-3 break-words text-[15px] leading-7 text-[#444] sm:text-[16px]">
                    {product.features.map((item) => (
                      <li key={trText(item, lang)} className="flex gap-3">
                        <span className="mt-[10px] h-[6px] w-[6px] rounded-full bg-[#1457b5]" />
                        <span className="min-w-0 flex-1 break-words">{trText(item, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {product.briefInfo && !showSummaryInSpecArea ? (
                  <section className="mt-8 rounded-[20px] border border-[#dbe4f0] bg-[#f8fbff] p-5 lg:p-6">
                    <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">{trText("PRODUCT SUMMARY", lang)}</div>
                    <h2 className="mt-2 text-[22px] font-bold tracking-[-0.02em] text-[#111]">{trText("장비 간략 설명", lang)}</h2>
                    <p className="mt-3 text-[15px] leading-7 text-[#4b5563]">{product.briefInfo ? trText(product.briefInfo, lang) : product.briefInfo}</p>
                  </section>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="inline-flex h-[44px] items-center justify-center rounded-full bg-[#1457b5] px-6 text-[14px] font-medium text-white transition hover:opacity-90">
                    {trText("제품문의", lang)}
                  </button>
                  {product.category !== "ion-coater" && product.gallery.length > 0 ? (
                    <button
                      onClick={() => scrollToSection("detail-gallery")}
                      className="inline-flex h-[44px] items-center justify-center rounded-full border border-[#1457b5] px-6 text-[14px] font-medium text-[#1457b5] transition hover:bg-[#1457b5] hover:text-white"
                    >
                      {trText("장비 상세 보기", lang)}
                    </button>
                  ) : null}
                  <button
                    onClick={() => clearProductViewToCategory(product.category)}
                    className="inline-flex h-[44px] items-center justify-center rounded-full border border-[#d0d7e2] px-6 text-[14px] font-medium text-[#555] transition hover:border-[#1457b5] hover:text-[#1457b5]"
                  >
                    {trText("목록으로 돌아가기", lang)}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {product.softwareItems && product.softwareItems.length > 0 ? <SoftwareSection items={product.softwareItems} lang={lang} /> : null}

          {product.category === "ion-coater" && product.gallery.length > 0 ? (
            <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
              <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">{trText("BEFORE / AFTER COMPARISON", lang)}</div>
              <h2 className="...">{trText("Ion Coating 전 / 후 비교", lang)}</h2>
<p className="...">
  {trText("동일 이미지를 기반으로 코팅 전 느낌과 코팅 후 결과를 직관적으로 비교할 수 있습니다.", lang)}
</p>

              <div className="mt-8 space-y-8">
                {product.gallery.slice(0, 10).map((item, idx) => (
                  <BeforeAfterSEM
  key={`${trText(item.title, lang)}-${idx}`}
  afterSrc={item.image}
  title={trText(item.title, lang)}
  lang={lang}
/>
                ))}
              </div>
            </section>
          ) : null}

          {showSummaryInSpecArea ? (
            <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
              <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">{trText("PRODUCT SUMMARY", lang)}</div>
              <h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-[#111]">{trText("장비 간략 설명", lang)}</h2>
              <p className="mt-4 max-w-[900px] text-[16px] leading-8 text-[#4b5563]">{product.briefInfo ? trText(product.briefInfo, lang) : product.briefInfo}</p>
            </section>
          ) : null}

          {shouldShowSpecs ? <SpecificationTable specs={product.specs!} lang={lang} /> : null}

          {product.options && product.options.length > 0 ? <OptionsSection options={product.options} lang={lang} /> : null}

          {product.category !== "ion-coater" && product.gallery.length > 0 ? (
            <section
              id="detail-gallery"
              className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10"
            >
              <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">{trText("APPLICATION IMAGE", lang)}</div>
              <h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-[#111]">{trText("장비로 촬영한 이미지", lang)}</h2>
              <p className="mt-3 text-[15px] leading-7 text-[#66707d]">
                {trText("실제 장비를 통해 획득한 샘플 이미지를 확인하실 수 있습니다.", lang)}
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {product.gallery.map((item, idx) => (
                  <div
                key={product.slug}
                className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#dde5ee] bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1457b5] hover:shadow-[0_20px_45px_rgba(20,87,181,0.14)]"
>
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={trText(item.title, lang)}
                        className="h-[270px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />

                      <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-10">
                        <div>
                          <div className="mb-1 text-[11px] font-semibold tracking-[0.16em] text-white/70">{trText("ANALYSIS IMAGE", lang)}</div>
                          <div className="text-[17px] font-semibold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
                            {trText(item.title, lang)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>

      <FooterCTA lang={lang} />
      <SiteFooter lang={lang} />


    </main>
  );
}

function FooterCTA({ lang }: { lang: Lang }) {
  return (
    <section id="footer-cta" className="relative overflow-hidden">
      <img src="/images/footer-bg.jpg" alt="contact background" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-12 text-white lg:px-8 lg:py-14">
        <h2 className="text-center text-[24px] font-bold tracking-[-0.03em] lg:text-[36px]">{trText("정확한 제품과 서비스, 빠른 납기", lang)}</h2>

        <div className="mx-auto mt-5 h-px w-full max-w-[900px] bg-white/30" />

        <div className="mt-10 flex justify-center">
          <div className="flex w-full max-w-[700px] justify-between gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="text-[18px] font-bold lg:text-[20px]">{trText("최첨단 SEM 전문", lang)}</div>
              <p className="mt-4 text-[14px] leading-7 text-white/85">
                {trText("산업 전반에 걸쳐 정밀한 분석과", lang)}
                <br />
                {trText("품질 관리를 지원하고 있습니다.", lang)}
              </p>
              <button className="mt-5 inline-flex h-[40px] min-w-[110px] items-center justify-center rounded-full border border-white/80 px-4 text-[13px] font-medium transition hover:bg-white hover:text-black">
                {trText("회사소개", lang)}
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="text-[18px] font-bold lg:text-[20px]">{trText("제품문의", lang)}</div>
              <p className="mt-4 text-[14px] leading-7 text-white/85">
                {trText("빠르고 정확하게", lang)}
                <br />
                {trText("답변해 드립니다.", lang)}
              </p>
              <button className="mt-5 inline-flex h-[40px] min-w-[110px] items-center justify-center rounded-full border border-white/80 px-4 text-[13px] font-medium transition hover:bg-white hover:text-black">
                제품문의
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-black px-6 py-12 text-white lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1520px]">
        <div className="flex flex-wrap gap-10 border-b border-white/20 pb-10 text-[18px] font-semibold">
          <button className="transition hover:text-[#7fb2ff]">{trText("회사소개", lang)}</button>
          <button className="transition hover:text-[#7fb2ff]">{trText("개인정보처리방침", lang)}</button>
          <button className="transition hover:text-[#7fb2ff]">{trText("오시는 길", lang)}</button>
        </div>

        <div className="pt-10 text-[18px] leading-9 text-white/88">
          <div>• <span className="font-bold">{trText("ADDR", lang)}</span> : {trText("경기도 화성시 동탄대로 646-4 1110~2호(메가비즈타워 B동)", lang)}</div>
          <div>
            • <span className="font-bold">{trText("TEL", lang)}</span> : 010-8615-7424, <span className="font-bold">{trText("E-MAIL", lang)}</span> : Danielkim@ets88.co.kr
          </div>
        </div>

        <div className="mt-10 text-[16px] text-white/70">COPYRIGHT © 2020 ETS ALL RIGHTS RESERVED</div>
      </div>
    </footer>
  );
}

function HomePage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <TopNav lang={lang} setLang={setLang} />
      <HeroSlider lang={lang} />
      <ProductShowcase lang={lang} />
      <FooterCTA lang={lang} />
      <SiteFooter lang={lang} />
    </main>
  );
}

export default function Page() {"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

type Category = {
  slug: string;
  label: string;
};

type SpecSection = {
  group: string;
  rows: {
    label: string;
    value: string;
  }[];
};

type OptionItem = {
  title: string;
  subtitle?: string;
  image?: string;
  placeholder?: boolean;
};

type SoftwareItem = {
  title: string;
  descriptionLines: string[];
  image: string;
};

type GalleryItem = {
  image: string;
  title: string;
};

type Product = {
  slug: string;
  category: string;
  title: string;
  categoryLabel: string;
  type: string;
  image: string;
  subtitle: string;
  description: string;
  overview: string;
  briefInfo?: string;
  features: string[];
  gallery: GalleryItem[];
  specs?: SpecSection[];
  options?: OptionItem[];
  softwareItems?: SoftwareItem[];
};

type ShowcaseCard = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  sliderImages?: string[];
  imageScale?: string;
  imageTranslate?: string;
  pdfUrl?: string;
};

type Lang = "ko" | "en" | "zh";

const ui = {
  ko: {
    navProducts: "제품소개", navCompany: "회사소개", heroBadge: "THE BEST 고성능 분석장비 솔루션", heroTitle1: "전자현미경 및 분석", heroTitle2: "장비 전문 기업", heroDesc: "정밀관찰, 재료분석, 품질평가를 위한 전자현미경 및 분석장비 솔루션을 제공합니다.", viewNow: "바로 보러가기", contact: "문의하기", productLine: "PRODUCT LINE", products: "제품 소개", home: "홈", productCategory: "PRODUCT CATEGORY", categoryDesc1: "선택한 카테고리의 제품을 한눈에 확인하실 수 있습니다.", categoryDesc2: "장비별 상세 보기로 이동해 주요 특징과 구성을 확인해보세요.", viewAll: "전체 보기", total: "Total", page: "page", moreDetail: "More Detail", go: "바로 가기", pdf: "PDF 다운", keyFeatures: "핵심 특징", productSummary: "PRODUCT SUMMARY", briefDesc: "장비 간략 설명", inquiry: "제품문의", detailView: "장비 상세 보기", backToList: "목록으로 돌아가기", software: "SOFTWARE", softwarePreview: "Software Interface Preview", specification: "Specification", optionalSystem: "OPTIONAL SYSTEM", options: "Options", optionsDesc: "장비 확장과 분석 기능 향상을 위한 다양한 옵션 구성을 제공합니다.", availableOption: "AVAILABLE OPTION", compatibleOptional: "Compatible optional module", beforeAfter: "BEFORE / AFTER COMPARISON", ionCompare: "Ion Coating 전 / 후 비교", ionCompareDesc: "동일 이미지를 기반으로 코팅 전 느낌과 코팅 후 결과를 직관적으로 비교할 수 있습니다.", beforeNoCoating: "BEFORE (No Coating)", afterIonCoating: "AFTER (Ion Coating)", applicationImage: "APPLICATION IMAGE", capturedImages: "장비로 촬영한 이미지", capturedImagesDesc: "실제 장비를 통해 획득한 샘플 이미지를 확인하실 수 있습니다.", footerHeadline: "정확한 제품과 서비스, 빠른 납기", footerSemTitle: "최첨단 SEM 전문", footerSemDesc1: "산업 전반에 걸쳐 정밀한 분석과", footerSemDesc2: "품질 관리를 지원하고 있습니다.", company: "회사소개", footerInquiryTitle: "제품문의", footerInquiryDesc1: "빠르고 정확하게", footerInquiryDesc2: "답변해 드립니다.", privacy: "개인정보처리방침", directions: "오시는 길", categories: { all: "전체", sem: "주사전자현미경", normalSem: "PRODUCTS INTRODUCTION", tem: "TEM", ion: "Ion Coater" }
  },
  en: {
    navProducts: "Products", navCompany: "About Us", heroBadge: "THE BEST High-Performance Analysis Equipment Solutions", heroTitle1: "Electron Microscopy & Analysis", heroTitle2: "Equipment Specialists", heroDesc: "We provide electron microscopy and analytical equipment solutions for precision observation, material analysis, and quality evaluation.", viewNow: "View Products", contact: "Contact Us", productLine: "PRODUCT LINE", products: "Products", home: "Home", productCategory: "PRODUCT CATEGORY", categoryDesc1: "You can browse products in the selected category at a glance.", categoryDesc2: "Open the detail page to review key features and configuration.", viewAll: "View All", total: "Total", page: "page", moreDetail: "More Detail", go: "Go", pdf: "Download PDF", keyFeatures: "Key Features", productSummary: "PRODUCT SUMMARY", briefDesc: "Brief Description", inquiry: "Inquiry", detailView: "View Details", backToList: "Back to List", software: "SOFTWARE", softwarePreview: "Software Interface Preview", specification: "Specification", optionalSystem: "OPTIONAL SYSTEM", options: "Options", optionsDesc: "We provide a range of optional configurations to expand equipment capability and improve analysis performance.", availableOption: "AVAILABLE OPTION", compatibleOptional: "Compatible optional module", beforeAfter: "BEFORE / AFTER COMPARISON", ionCompare: "Ion Coating Before / After", ionCompareDesc: "Compare the appearance before coating and the result after coating based on the same image.", beforeNoCoating: "BEFORE (No Coating)", afterIonCoating: "AFTER (Ion Coating)", applicationImage: "APPLICATION IMAGE", capturedImages: "Captured Images", capturedImagesDesc: "You can review sample images acquired with the actual equipment.", footerHeadline: "Accurate products, reliable service, and fast delivery", footerSemTitle: "Advanced SEM Specialists", footerSemDesc1: "We support precise analysis across industries", footerSemDesc2: "and help improve quality control.", company: "About Us", footerInquiryTitle: "Product Inquiry", footerInquiryDesc1: "We respond quickly", footerInquiryDesc2: "and accurately.", privacy: "Privacy Policy", directions: "Directions", categories: { all: "All", sem: "Scanning Electron Microscope", normalSem: "PRODUCTS INTRODUCTION", tem: "TEM", ion: "Ion Coater" }
  },
  zh: {
    navProducts: "产品介绍", navCompany: "公司介绍", heroBadge: "THE BEST 高性能分析设备解决方案", heroTitle1: "电子显微镜与分析", heroTitle2: "设备专业企业", heroDesc: "我们提供用于精密观察、材料分析与品质评估的电子显微镜及分析设备解决方案。", viewNow: "立即查看", contact: "联系我们", productLine: "PRODUCT LINE", products: "产品介绍", home: "首页", productCategory: "产品分类", categoryDesc1: "您可以一目了然地查看所选分类中的产品。", categoryDesc2: "进入详情页即可查看主要特点与配置。", viewAll: "查看全部", total: "总计", page: "页", moreDetail: "查看详情", go: "进入", pdf: "下载 PDF", keyFeatures: "核心特点", productSummary: "PRODUCT SUMMARY", briefDesc: "设备简介", inquiry: "产品咨询", detailView: "查看详情", backToList: "返回列表", software: "软件", softwarePreview: "软件界面预览", specification: "规格参数", optionalSystem: "可选系统", options: "选项", optionsDesc: "提供多种可选配置，以扩展设备能力并提升分析性能。", availableOption: "可选模块", compatibleOptional: "兼容可选模块", beforeAfter: "前后对比", ionCompare: "离子镀膜前 / 后对比", ionCompareDesc: "基于同一张图像，直观比较镀膜前的状态与镀膜后的结果。", beforeNoCoating: "镀膜前", afterIonCoating: "镀膜后", applicationImage: "应用图像", capturedImages: "设备拍摄图像", capturedImagesDesc: "您可以查看通过实际设备获取的样品图像。", footerHeadline: "准确的产品与服务，快速的交付", footerSemTitle: "尖端 SEM 专业企业", footerSemDesc1: "我们在各行业提供精密分析", footerSemDesc2: "并支持品质管理。", company: "公司介绍", footerInquiryTitle: "产品咨询", footerInquiryDesc1: "快速而准确地", footerInquiryDesc2: "为您答复。", privacy: "隐私政策", directions: "来访路线", categories: { all: "全部", sem: "扫描电子显微镜", normalSem: "PRODUCTS INTRODUCTION", tem: "TEM", ion: "离子镀膜仪" }
  },
} as const;


const translations: Record<string, { en: string; zh: string }> = {
  "제품소개": {
    "en": "Products",
    "zh": "产品介绍"
  },
  "회사소개": {
    "en": "About Us",
    "zh": "公司介绍"
  },
  "전체": {
    "en": "All",
    "zh": "全部"
  },
  "주사전자현미경": {
    "en": "Scanning Electron Microscope",
    "zh": "扫描电子显微镜"
  },
  "Ion Coater": {
    "en": "Ion Coater",
    "zh": "离子镀膜仪"
  },
  "Ion Coater A": {
    "en": "Ion Coater A",
    "zh": "离子镀膜仪 A"
  },
  "TEM": {
    "en": "TEM",
    "zh": "TEM"
  },
  "PRODUCTS INTRODUCTION": {
    "en": "Products Introduction",
    "zh": "产品介绍"
  },
  "SAMPLE PREPARATION": {
    "en": "Sample Preparation",
    "zh": "样品制备"
  },
  "SCANNING ELECTRON MICROSCOPE": {
    "en": "SCANNING ELECTRON MICROSCOPE",
    "zh": "扫描电子显微镜"
  },
  "IN-SITU TEM/SEM SOLUTIONS": {
    "en": "IN-SITU TEM/SEM SOLUTIONS",
    "zh": "原位 TEM/SEM 解决方案"
  },
  "IN-SITU TEM / SEM SOLUTIONS": {
    "en": "IN-SITU TEM / SEM SOLUTIONS",
    "zh": "原位 TEM / SEM 解决方案"
  },
  "ION COATING SOLUTION": {
    "en": "ION COATING SOLUTION",
    "zh": "离子镀膜解决方案"
  },
  "TABLETOP SEM": {
    "en": "TABLETOP SEM",
    "zh": "台式扫描电镜"
  },
  "ADVANCED SEM": {
    "en": "ADVANCED SEM",
    "zh": "高级扫描电镜"
  },
  "HIGH PERFORMANCE SEM": {
    "en": "HIGH PERFORMANCE SEM",
    "zh": "高性能扫描电镜"
  },
  "TRANSMISSION ELECTRON MICROSCOPE": {
    "en": "TRANSMISSION ELECTRON MICROSCOPE",
    "zh": "透射电子显微镜"
  },
  "THE BEST 고성능 분석장비 솔루션": {
    "en": "THE BEST High-Performance Analysis Equipment Solutions",
    "zh": "THE BEST 高性能分析设备解决方案"
  },
  "전자현미경 및 분석": {
    "en": "Electron Microscopy & Analysis",
    "zh": "电子显微镜与分析"
  },
  "장비 전문 기업": {
    "en": "Equipment Specialists",
    "zh": "设备专业企业"
  },
  "정밀관찰, 재료분석, 품질평가를 위한 전자현미경 및 분석장비 솔루션을 제공합니다.": {
    "en": "We provide electron microscopy and analytical equipment solutions for precision observation, material analysis, and quality evaluation.",
    "zh": "我们提供用于精密观察、材料分析与品质评估的电子显微镜及分析设备解决方案。"
  },
  "바로 보러가기": {
    "en": "View Products",
    "zh": "立即查看"
  },
  "문의하기": {
    "en": "Contact Us",
    "zh": "联系我们"
  },
  "PRODUCT LINE": {
    "en": "PRODUCT LINE",
    "zh": "产品线"
  },
  "제품 소개": {
    "en": "Products",
    "zh": "产品介绍"
  },
  "PRODUCT": {
    "en": "PRODUCT",
    "zh": "产品"
  },
  "홈": {
    "en": "Home",
    "zh": "首页"
  },
  "PRODUCT CATEGORY": {
    "en": "PRODUCT CATEGORY",
    "zh": "产品分类"
  },
  "선택한 카테고리의 제품을 한눈에 확인하실 수 있습니다.": {
    "en": "You can browse products in the selected category at a glance.",
    "zh": "您可以一目了然地查看所选分类中的产品。"
  },
  "장비별 상세 보기로 이동해 주요 특징과 구성을 확인해보세요.": {
    "en": "Open the detail page to review key features and configuration.",
    "zh": "进入详情页即可查看主要特点与配置。"
  },
  "전체 보기": {
    "en": "View All",
    "zh": "查看全部"
  },
  "Total": {
    "en": "Total",
    "zh": "总计"
  },
  "page": {
    "en": "page",
    "zh": "页"
  },
  "More Detail": {
    "en": "More Detail",
    "zh": "查看详情"
  },
  "바로 가기": {
    "en": "Go",
    "zh": "进入"
  },
  "PDF 다운": {
    "en": "Download PDF",
    "zh": "下载 PDF"
  },
  "핵심 특징": {
    "en": "Key Features",
    "zh": "核心特点"
  },
  "제품문의": {
    "en": "Inquiry",
    "zh": "产品咨询"
  },
  "목록으로 돌아가기": {
    "en": "Back to List",
    "zh": "返回列表"
  },
  "장비 상세 보기": {
    "en": "View Details",
    "zh": "设备详细查看"
  },
  "PRODUCT SUMMARY": {
    "en": "PRODUCT SUMMARY",
    "zh": "产品摘要"
  },
  "장비 간략 설명": {
    "en": "Brief Description",
    "zh": "设备简介"
  },
  "Specification": {
    "en": "Specification",
    "zh": "规格参数"
  },
  "Options": {
    "en": "Options",
    "zh": "选项"
  },
  "OPTIONAL SYSTEM": {
    "en": "OPTIONAL SYSTEM",
    "zh": "可选系统"
  },
  "Compatible optional module": {
    "en": "Compatible optional module",
    "zh": "兼容可选模块"
  },
  "AVAILABLE OPTION": {
    "en": "AVAILABLE OPTION",
    "zh": "可选模块"
  },
  "SOFTWARE": {
    "en": "SOFTWARE",
    "zh": "软件"
  },
  "Software Interface Preview": {
    "en": "Software Interface Preview",
    "zh": "软件界面预览"
  },
  "BEFORE / AFTER COMPARISON": {
    "en": "BEFORE / AFTER COMPARISON",
    "zh": "前后对比"
  },
  "Ion Coating 전 / 후 비교": {
    "en": "Ion Coating Before / After",
    "zh": "离子镀膜前 / 后对比"
  },
  "동일 이미지를 기반으로 코팅 전 느낌과 코팅 후 결과를 직관적으로 비교할 수 있습니다.": {
    "en": "Compare the appearance before coating and the result after coating based on the same image.",
    "zh": "基于同一图像，可直观比较镀膜前状态与镀膜后结果。"
  },
  "BEFORE (No Coating)": {
    "en": "BEFORE",
    "zh": "镀膜前"
  },
  "AFTER (Ion Coating)": {
    "en": "AFTER",
    "zh": "镀膜后"
  },
  "APPLICATION IMAGE": {
    "en": "APPLICATION IMAGE",
    "zh": "应用图像"
  },
  "장비로 촬영한 이미지": {
    "en": "Captured Images",
    "zh": "设备拍摄图像"
  },
  "실제 장비를 통해 획득한 샘플 이미지를 확인하실 수 있습니다.": {
    "en": "You can review sample images acquired with the actual equipment.",
    "zh": "您可以查看通过实际设备获取的样品图像。"
  },
  "ANALYSIS IMAGE": {
    "en": "ANALYSIS IMAGE",
    "zh": "分析图像"
  },
  "정확한 제품과 서비스, 빠른 납기": {
    "en": "Accurate products, reliable service, and fast delivery",
    "zh": "准确的产品与服务，快速的交付"
  },
  "최첨단 SEM 전문": {
    "en": "Advanced SEM Specialists",
    "zh": "尖端 SEM 专业企业"
  },
  "산업 전반에 걸쳐 정밀한 분석과": {
    "en": "We support precise analysis across industries",
    "zh": "我们在各行业提供精密分析"
  },
  "품질 관리를 지원하고 있습니다.": {
    "en": "and help improve quality control.",
    "zh": "并支持品质管理。"
  },
  "빠르고 정확하게": {
    "en": "We respond quickly",
    "zh": "快速而准确地"
  },
  "답변해 드립니다.": {
    "en": "and accurately.",
    "zh": "为您答复。"
  },
  "개인정보처리방침": {
    "en": "Privacy Policy",
    "zh": "隐私政策"
  },
  "오시는 길": {
    "en": "Directions",
    "zh": "来访路线"
  },
  "ADDR": {
    "en": "ADDR",
    "zh": "地址"
  },
  "TEL": {
    "en": "TEL",
    "zh": "电话"
  },
  "E-MAIL": {
    "en": "E-MAIL",
    "zh": "电子邮箱"
  },
  "경기도 화성시 동탄대로 646-4 1110~2호(메가비즈타워 B동)": {
    "en": "1110~1112, 646-4 Dongtandaero, Hwaseong-si, Gyeonggi-do (Megabiz Tower B)",
    "zh": "韩国京畿道华城市东滩大路 646-4，1110~1112号（Megabiz Tower B）"
  },
  "장비 확장과 분석 기능 향상을 위한 다양한 옵션 구성을 제공합니다.": {
    "en": "We provide a range of optional configurations to expand equipment capability and improve analysis performance.",
    "zh": "提供多种可选配置，以扩展设备能力并提升分析性能。"
  },
  "메뉴": {
    "en": "Menu",
    "zh": "菜单"
  },
  "이미지 영역": {
    "en": "image area",
    "zh": "图片区域"
  },
  "이전 이미지": {
    "en": "Previous image",
    "zh": "上一张图片"
  },
  "다음 이미지": {
    "en": "Next image",
    "zh": "下一张图片"
  },
  "이전 슬라이드": {
    "en": "Previous slide",
    "zh": "上一张幻灯片"
  },
  "다음 슬라이드": {
    "en": "Next slide",
    "zh": "下一张幻灯片"
  },
  "이미지 확대": {
    "en": "Zoom image",
    "zh": "放大图片"
  },
  "닫기": {
    "en": "Close",
    "zh": "关闭"
  },
  "코팅 전": {
    "en": "BEFORE",
    "zh": "镀膜前"
  },
  "코팅 후": {
    "en": "AFTER",
    "zh": "镀膜后"
  },
  "탁상형 주사전자현미경 기본 모델": {
    "en": "Entry-level tabletop scanning electron microscope",
    "zh": "台式扫描电子显微镜基础型号"
  },
  "컴팩트한 설계와 안정적인 관찰 성능을 제공하는 주사전자현미경입니다.": {
    "en": "A scanning electron microscope with compact design and stable observation performance.",
    "zh": "一款具有紧凑设计和稳定观察性能的扫描电子显微镜。"
  },
  "컴팩트 설치": {
    "en": "Compact Installation",
    "zh": "紧凑安装"
  },
  "쉬운 조작": {
    "en": "Easy Operation",
    "zh": "操作简便"
  },
  "빠른 관찰": {
    "en": "Fast Observation",
    "zh": "快速观察"
  },
  "교육·연구 활용": {
    "en": "For Education & Research",
    "zh": "适用于教育与研究"
  },
  "확장 기능이 강화된 주사전자현미경 모델": {
    "en": "Scanning electron microscope with enhanced expandability",
    "zh": "扩展功能强化型扫描电子显微镜"
  },
  "분석 옵션과 사용자 편의성을 강화한 주사전자현미경 모델입니다.": {
    "en": "A scanning electron microscope model with enhanced analytical options and user convenience.",
    "zh": "加强了分析选项和用户便利性的扫描电子显微镜型号。"
  },
  "확장성 강화": {
    "en": "Enhanced Expandability",
    "zh": "扩展性增强"
  },
  "고속 관찰": {
    "en": "High-Speed Observation",
    "zh": "高速观察"
  },
  "쉬운 세팅": {
    "en": "Easy Setup",
    "zh": "设置便捷"
  },
  "연구 활용": {
    "en": "For Research Use",
    "zh": "适用于研究"
  },
  "고성능 분석용 주사전자현미경 모델": {
    "en": "High-performance scanning electron microscope for advanced analysis",
    "zh": "高性能分析型扫描电子显微镜"
  },
  "정밀 관찰과 고해상도 분석에 적합한 고성능 주사전자현미경입니다.": {
    "en": "A high-performance SEM suitable for precise observation and high-resolution analysis.",
    "zh": "适用于精密观察和高分辨率分析的高性能扫描电子显微镜。"
  },
  "고해상도": {
    "en": "High Resolution",
    "zh": "高分辨率"
  },
  "정밀 분석": {
    "en": "Precision Analysis",
    "zh": "精密分析"
  },
  "안정적 운용": {
    "en": "Stable Operation",
    "zh": "稳定运行"
  },
  "산업·연구용": {
    "en": "For Industry & Research",
    "zh": "适用于工业与研究"
  },
  "시편 전처리와 준비 과정을 보다 안정적이고 효율적으로 진행할 수 있도록 구성한 제품 소개 영역입니다.": {
    "en": "A product introduction area designed to make sample pretreatment and preparation more stable and efficient.",
    "zh": "该产品介绍区域旨在帮助样品前处理与制备过程更加稳定、高效。"
  },
  "시편 준비, 전처리, 관찰 전 공정까지 보다 안정적이고 효율적으로 진행할 수 있도록 구성한 제품 소개 영역입니다.": {
    "en": "A product introduction area for stable and efficient sample preparation, pretreatment, and pre-observation processes.",
    "zh": "本产品介绍区域可帮助样品制备、前处理及观察前工序更加稳定高效。"
  },
  "시편 준비": {
    "en": "Sample Preparation",
    "zh": "样品制备"
  },
  "전처리 지원": {
    "en": "Pretreatment Support",
    "zh": "前处理支持"
  },
  "안정적인 운용": {
    "en": "Stable Operation",
    "zh": "稳定运行"
  },
  "다양한 분석 환경 대응": {
    "en": "Supports Various Analysis Environments",
    "zh": "适用于多种分析环境"
  },
  "시편 표면 코팅과 전처리를 위한 이온 코터 장비": {
    "en": "Ion coater equipment for sample surface coating and pretreatment",
    "zh": "用于样品表面镀膜与前处理的离子镀膜设备"
  },
  "전자현미경 관찰 전 시편 표면을 안정적으로 코팅하여 더 좋은 분석 품질을 확보할 수 있는 장비입니다.": {
    "en": "Equipment that enables stable sample surface coating before electron microscope observation for improved analytical quality.",
    "zh": "可在电子显微镜观察前对样品表面进行稳定镀膜，从而获得更佳分析质量的设备。"
  },
  "균일 코팅": {
    "en": "Uniform Coating",
    "zh": "均匀镀膜"
  },
  "전처리 품질 향상": {
    "en": "Improved Pretreatment Quality",
    "zh": "提升前处理质量"
  },
  "간편한 운용": {
    "en": "Easy Operation",
    "zh": "操作简便"
  },
  "다양한 시편 대응": {
    "en": "Supports Various Samples",
    "zh": "适用于多种样品"
  },
  "Ion spotter coater": {
    "en": "Ion spotter coater",
    "zh": "离子溅射镀膜仪"
  },
  "Backscatter Electron Detector": {
    "en": "Backscatter Electron Detector",
    "zh": "背散射电子探测器"
  },
  "Cooling stage": {
    "en": "Cooling stage",
    "zh": "冷却台"
  },
  "획기적으로 개선된 인터페이스": {
    "en": "Dramatically Improved Interface",
    "zh": "大幅升级的界面"
  },
  "새롭게 적용된 신규 UI로 더욱 간편하게 촬영 환경을 설정해보세요.": {
    "en": "Set up the imaging environment more easily with the newly applied UI.",
    "zh": "通过全新 UI，更轻松地设置拍摄环境。"
  },
  "최적의 접근성으로 기존 소프트웨어 대비 60% 더 빠른 결과물을 확인할 수 있습니다.": {
    "en": "With optimized accessibility, you can review results up to 60% faster than with previous software.",
    "zh": "借助优化后的易用性，结果确认速度比原有软件快 60%。"
  },
  "· 더욱 큰 화면, 사용자 친화적 인터페이스 제공": {
    "en": "· Larger screen and user-friendly interface",
    "zh": "· 更大的界面与更友好的用户体验"
  },
  "더욱 정교해진 제어 환경": {
    "en": "More Sophisticated Control Environment",
    "zh": "更精细的控制环境"
  },
  "주요 촬영 조건과 장비 상태를 한 화면에서 빠르게 확인할 수 있습니다.": {
    "en": "Quickly check key imaging conditions and equipment status on a single screen.",
    "zh": "可在单个界面中快速查看主要拍摄条件和设备状态。"
  },
  "작업 흐름을 단순화하여 분석 시간은 줄이고 운용 효율은 높였습니다.": {
    "en": "The workflow has been simplified to reduce analysis time and improve operational efficiency.",
    "zh": "通过简化工作流程，缩短分析时间并提高运用效率。"
  },
  "· 직관적인 제어 구성, 빠른 조건 전환 지원": {
    "en": "· Intuitive controls and fast parameter switching",
    "zh": "· 直观控制布局，支持快速切换条件"
  },
  "빠르고 직관적인 분석 워크플로우": {
    "en": "Fast and Intuitive Analysis Workflow",
    "zh": "快速直观的分析流程"
  },
  "이미지 획득부터 확인, 분석까지 이어지는 과정을 더욱 자연스럽게 구성했습니다.": {
    "en": "The process from image acquisition to review and analysis has been made more seamless.",
    "zh": "从图像获取到查看、分析的流程更加自然顺畅。"
  },
  "초보 사용자도 쉽게 적응할 수 있도록 화면 구성을 단순하고 명확하게 개선했습니다.": {
    "en": "The layout has been simplified and clarified so even new users can adapt easily.",
    "zh": "为了让初学者也能轻松上手，界面布局更加简洁清晰。"
  },
  "· 사용자 중심 설계, 빠른 분석 프로세스 제공": {
    "en": "· User-centered design for faster analysis",
    "zh": "· 以用户为中心的设计，提供更快的分析流程"
  },
  "Industrial Testing": {
    "en": "Industrial Testing",
    "zh": "工业测试"
  },
  "Biological Sample Testing": {
    "en": "Biological Sample Testing",
    "zh": "生物样品测试"
  },
  "Metallographic Inspection": {
    "en": "Metallographic Inspection",
    "zh": "金相检查"
  },
  "Surface Morphology": {
    "en": "Surface Morphology",
    "zh": "表面形貌"
  },
  "Particle Analysis": {
    "en": "Particle Analysis",
    "zh": "颗粒分析"
  },
  "Microstructure Check": {
    "en": "Microstructure Check",
    "zh": "微观结构检查"
  },
  "Coating Effect Sample": {
    "en": "Coating Effect Sample",
    "zh": "镀膜效果样品"
  },
  "3개의 Table Top SEM, 1개의 Normal SEM 제품 라인업": {
    "en": "Lineup of 3 Table Top SEMs and 1 Normal SEM",
    "zh": "3款台式SEM和1款普通SEM产品阵容"
  },
  "In-situ 분석 및 특수 응용을 위한 TEM/SEM 솔루션 라인업": {
    "en": "TEM/SEM solution lineup for in-situ analysis and special applications",
    "zh": "用于原位分析及特殊应用的TEM/SEM解决方案产品线"
  },
  "In-situ 실험 환경에서 시편의 구조 변화를 실시간으로 관찰할 수 있는 기본형 TEM/SEM 솔루션입니다.": {
    "en": "A basic TEM/SEM solution for real-time observation of structural changes in samples during in-situ experiments.",
    "zh": "可在原位实验环境下实时观察样品结构变化的基础型 TEM/SEM 解决方案。"
  },
  "가열 조건에서 미세 구조 변화를 추적하기에 적합한 In-situ 분석 장비입니다.": {
    "en": "An in-situ analysis system suitable for tracking microstructural changes under heating conditions.",
    "zh": "适合在加热条件下追踪微观结构变化的原位分析设备。"
  },
  "인장 및 변형 시험 중 시편 반응을 정밀하게 확인할 수 있는 모델입니다.": {
    "en": "A model for precisely observing sample responses during tensile and deformation tests.",
    "zh": "可在拉伸及变形试验中精确观察样品反应的型号。"
  },
  "냉각 조건에서 재료의 표면 및 내부 변화를 안정적으로 관찰할 수 있습니다.": {
    "en": "Enables stable observation of surface and internal changes in materials under cooling conditions.",
    "zh": "可在冷却条件下稳定观察材料表面及内部变化。"
  },
  "배터리, 반도체, 금속 소재 분석에 적합한 범용 In-situ TEM/SEM 시스템입니다.": {
    "en": "A versatile in-situ TEM/SEM system suitable for batteries, semiconductors, and metallic materials.",
    "zh": "适用于电池、半导体及金属材料分析的通用型原位 TEM/SEM 系统。"
  },
  "미세 구조의 시간에 따른 변화를 확인하기 위한 동적 분석용 장비입니다.": {
    "en": "Dynamic analysis equipment for observing time-dependent microstructural changes.",
    "zh": "用于观察微观结构随时间变化的动态分析设备。"
  },
  "복합 소재의 계면 변화와 결함 발생을 관찰하기 좋은 In-situ 분석 모델입니다.": {
    "en": "An in-situ analysis model for observing interfacial changes and defect formation in composite materials.",
    "zh": "适用于观察复合材料界面变化及缺陷产生的原位分析型号。"
  },
  "고배율 이미징과 실험 스테이지 연동이 가능한 연구용 솔루션입니다.": {
    "en": "A research solution supporting high-magnification imaging and integration with experimental stages.",
    "zh": "支持高倍率成像并可联动实验台的研究型解决方案。"
  },
  "실험 중 샘플 반응을 직관적으로 파악할 수 있도록 설계된 In-situ 장비입니다.": {
    "en": "In-situ equipment designed for intuitive understanding of sample responses during experiments.",
    "zh": "专为在实验过程中直观掌握样品反应而设计的原位设备。"
  },
  "열, 응력, 전기적 자극에 따른 구조 변화를 분석하는 데 적합한 모델입니다.": {
    "en": "Suitable for analyzing structural changes caused by heat, stress, and electrical stimulation.",
    "zh": "适用于分析热、应力及电刺激引起的结构变化。"
  },
  "재료 개발 및 불량 분석 과정에서 활용하기 좋은 TEM/SEM 응용 장비입니다.": {
    "en": "TEM/SEM application equipment useful for material development and failure analysis.",
    "zh": "适用于材料开发和失效分析的 TEM/SEM 应用设备。"
  },
  "연구실과 분석센터에서 폭넓게 사용할 수 있는 다목적 In-situ 솔루션입니다.": {
    "en": "A multipurpose in-situ solution for laboratories and analytical centers.",
    "zh": "可广泛应用于实验室和分析中心的多用途原位解决方案。"
  },
  "정밀 관찰과 반복 실험을 함께 고려한 안정형 TEM/SEM 장비입니다.": {
    "en": "A stable TEM/SEM system designed for precise observation and repeated experiments.",
    "zh": "兼顾精密观察与重复实验需求的稳定型 TEM/SEM 设备。"
  },
  "시편 반응을 실시간 이미지로 확보할 수 있는 고효율 분석 시스템입니다.": {
    "en": "A high-efficiency analysis system that captures sample responses in real-time images.",
    "zh": "可实时获取样品反应图像的高效率分析系统。"
  },
  "다양한 In-situ 액세서리와 연동 가능한 확장형 TEM/SEM 솔루션입니다.": {
    "en": "An expandable TEM/SEM solution compatible with various in-situ accessories.",
    "zh": "可与多种原位附件联动的扩展型 TEM/SEM 解决方案。"
  },
  "나노 소재와 박막 샘플의 구조 변화를 세밀하게 관찰할 수 있는 장비입니다.": {
    "en": "Equipment for detailed observation of structural changes in nanomaterials and thin-film samples.",
    "zh": "可细致观察纳米材料与薄膜样品结构变化的设备。"
  },
  "실험 조건 제어와 영상 확보를 동시에 중시하는 사용자에게 적합한 모델입니다.": {
    "en": "A model for users who require both experimental condition control and image acquisition.",
    "zh": "适合同时重视实验条件控制与图像获取的用户。"
  },
  "고급 응용 분석과 연구 데이터 확보를 위한 In-situ 전용 장비입니다.": {
    "en": "Dedicated in-situ equipment for advanced application analysis and research data acquisition.",
    "zh": "用于高级应用分析与研究数据获取的专用原位设备。"
  },
  "정확한 구조 해석과 반응 추적을 지원하는 고신뢰성 TEM/SEM 시스템입니다.": {
    "en": "A highly reliable TEM/SEM system supporting accurate structural interpretation and response tracking.",
    "zh": "支持精确结构解析与反应追踪的高可靠性 TEM/SEM 系统。"
  },
  "다양한 연구 환경에서 활용 가능한 통합형 In-situ TEM/SEM 솔루션입니다.": {
    "en": "An integrated in-situ TEM/SEM solution usable across various research environments.",
    "zh": "可适用于多种研究环境的一体化原位 TEM/SEM 解决方案。"
  },
  "TEM-01": {
    "en": "TEM-01",
    "zh": "TEM-01"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 1": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 1",
    "zh": "基于透射电子显微镜的高分辨率分析设备 1"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 1번 모델입니다.": {
    "en": "TEM model 1 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 1 型号。"
  },
  "TEM-02": {
    "en": "TEM-02",
    "zh": "TEM-02"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 2": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 2",
    "zh": "基于透射电子显微镜的高分辨率分析设备 2"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 2번 모델입니다.": {
    "en": "TEM model 2 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 2 型号。"
  },
  "TEM-03": {
    "en": "TEM-03",
    "zh": "TEM-03"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 3": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 3",
    "zh": "基于透射电子显微镜的高分辨率分析设备 3"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 3번 모델입니다.": {
    "en": "TEM model 3 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 3 型号。"
  },
  "TEM-04": {
    "en": "TEM-04",
    "zh": "TEM-04"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 4": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 4",
    "zh": "基于透射电子显微镜的高分辨率分析设备 4"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 4번 모델입니다.": {
    "en": "TEM model 4 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 4 型号。"
  },
  "TEM-05": {
    "en": "TEM-05",
    "zh": "TEM-05"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 5": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 5",
    "zh": "基于透射电子显微镜的高分辨率分析设备 5"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 5번 모델입니다.": {
    "en": "TEM model 5 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 5 型号。"
  },
  "TEM-06": {
    "en": "TEM-06",
    "zh": "TEM-06"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 6": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 6",
    "zh": "基于透射电子显微镜的高分辨率分析设备 6"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 6번 모델입니다.": {
    "en": "TEM model 6 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 6 型号。"
  },
  "TEM-07": {
    "en": "TEM-07",
    "zh": "TEM-07"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 7": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 7",
    "zh": "基于透射电子显微镜的高分辨率分析设备 7"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 7번 모델입니다.": {
    "en": "TEM model 7 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 7 型号。"
  },
  "TEM-08": {
    "en": "TEM-08",
    "zh": "TEM-08"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 8": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 8",
    "zh": "基于透射电子显微镜的高分辨率分析设备 8"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 8번 모델입니다.": {
    "en": "TEM model 8 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 8 型号。"
  },
  "TEM-09": {
    "en": "TEM-09",
    "zh": "TEM-09"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 9": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 9",
    "zh": "基于透射电子显微镜的高分辨率分析设备 9"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 9번 모델입니다.": {
    "en": "TEM model 9 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 9 型号。"
  },
  "TEM-10": {
    "en": "TEM-10",
    "zh": "TEM-10"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 10": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 10",
    "zh": "基于透射电子显微镜的高分辨率分析设备 10"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 10번 모델입니다.": {
    "en": "TEM model 10 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 10 型号。"
  },
  "TEM-11": {
    "en": "TEM-11",
    "zh": "TEM-11"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 11": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 11",
    "zh": "基于透射电子显微镜的高分辨率分析设备 11"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 11번 모델입니다.": {
    "en": "TEM model 11 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 11 型号。"
  },
  "TEM-12": {
    "en": "TEM-12",
    "zh": "TEM-12"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 12": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 12",
    "zh": "基于透射电子显微镜的高分辨率分析设备 12"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 12번 모델입니다.": {
    "en": "TEM model 12 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 12 型号。"
  },
  "TEM-13": {
    "en": "TEM-13",
    "zh": "TEM-13"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 13": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 13",
    "zh": "基于透射电子显微镜的高分辨率分析设备 13"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 13번 모델입니다.": {
    "en": "TEM model 13 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 13 型号。"
  },
  "TEM-14": {
    "en": "TEM-14",
    "zh": "TEM-14"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 14": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 14",
    "zh": "基于透射电子显微镜的高分辨率分析设备 14"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 14번 모델입니다.": {
    "en": "TEM model 14 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 14 型号。"
  },
  "TEM-15": {
    "en": "TEM-15",
    "zh": "TEM-15"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 15": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 15",
    "zh": "基于透射电子显微镜的高分辨率分析设备 15"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 15번 모델입니다.": {
    "en": "TEM model 15 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 15 型号。"
  },
  "TEM-16": {
    "en": "TEM-16",
    "zh": "TEM-16"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 16": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 16",
    "zh": "基于透射电子显微镜的高分辨率分析设备 16"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 16번 모델입니다.": {
    "en": "TEM model 16 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 16 型号。"
  },
  "TEM-17": {
    "en": "TEM-17",
    "zh": "TEM-17"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 17": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 17",
    "zh": "基于透射电子显微镜的高分辨率分析设备 17"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 17번 모델입니다.": {
    "en": "TEM model 17 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 17 型号。"
  },
  "TEM-18": {
    "en": "TEM-18",
    "zh": "TEM-18"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 18": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 18",
    "zh": "基于透射电子显微镜的高分辨率分析设备 18"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 18번 모델입니다.": {
    "en": "TEM model 18 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 18 型号。"
  },
  "TEM-19": {
    "en": "TEM-19",
    "zh": "TEM-19"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 19": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 19",
    "zh": "基于透射电子显微镜的高分辨率分析设备 19"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 19번 모델입니다.": {
    "en": "TEM model 19 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 19 型号。"
  },
  "TEM-20": {
    "en": "TEM-20",
    "zh": "TEM-20"
  },
  "투과전자현미경 기반의 고해상도 분석 장비 20": {
    "en": "High-resolution analytical equipment based on transmission electron microscopy 20",
    "zh": "基于透射电子显微镜的高分辨率分析设备 20"
  },
  "나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 20번 모델입니다.": {
    "en": "TEM model 20 suitable for nanoscale structural analysis and internal cross-section analysis.",
    "zh": "适用于纳米级结构分析和内部截面分析的 TEM 设备第 20 型号。"
  },
  "고해상도 분석": {
    "en": "High-Resolution Analysis",
    "zh": "高分辨率分析"
  },
  "나노 구조 관찰": {
    "en": "Nanostructure Observation",
    "zh": "纳米结构观察"
  },
  "정밀 데이터 확보": {
    "en": "Accurate Data Acquisition",
    "zh": "精密数据获取"
  },
  "연구용 최적화": {
    "en": "Optimized for Research",
    "zh": "适用于研究"
  },
  "Environmental requirements": {
    "en": "Environmental requirements",
    "zh": "环境要求"
  },
  "AC 220V, 50Hz, 1kW, No shock absorbing stage required": {
    "en": "AC 220V, 50Hz, 1kW, No shock absorbing stage required",
    "zh": "AC 220V, 50Hz, 1kW，无需防震台"
  },
  "Accelerating voltage": {
    "en": "Accelerating voltage",
    "zh": "加速电压"
  },
  "Electron gun": {
    "en": "Electron gun",
    "zh": "电子枪"
  },
  "Magnification": {
    "en": "Magnification",
    "zh": "放大倍数"
  },
  "Resolution": {
    "en": "Resolution",
    "zh": "分辨率"
  },
  "Detector": {
    "en": "Detector",
    "zh": "探测器"
  },
  "Sample stage": {
    "en": "Sample stage",
    "zh": "样品台"
  },
  "Extra-large sample chamber": {
    "en": "Extra-large sample chamber",
    "zh": "大样品腔室"
  },
  "vacuum mode": {
    "en": "Vacuum mode",
    "zh": "真空模式"
  },
  "Imaging mode": {
    "en": "Imaging mode",
    "zh": "成像模式"
  },
  "Navigation function": {
    "en": "Navigation function",
    "zh": "导航功能"
  },
  "Automatic function": {
    "en": "Automatic function",
    "zh": "自动功能"
  },
  "Dimensions": {
    "en": "Dimensions",
    "zh": "尺寸"
  },
  "Expansion function": {
    "en": "Expansion function",
    "zh": "扩展功能"
  }
};

function normalizeText(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/[‐‑‒–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

function trText(text: string | undefined, lang: Lang): string {
  if (!text) return "";
  if (lang === "ko") return text;

  const normalizedInput = normalizeText(text);

  for (const [key, value] of Object.entries(translations)) {
    if (normalizeText(key) === normalizedInput) {
      return lang === "en" ? value.en : value.zh;
    }
  }

  return text;
}

const translatedTextOriginals = new WeakMap<Text, string>();

function applyDocumentTranslations(lang: Lang) {
  if (typeof document === "undefined") return;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const value = node.nodeValue ?? "";
        if (!value.trim()) return NodeFilter.FILTER_REJECT;

        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        const tag = parent.tagName.toLowerCase();
        if (["script", "style", "textarea", "input", "noscript"].includes(tag)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const nodes: Text[] = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }

  nodes.forEach((node) => {
    const current = node.nodeValue ?? "";
    if (!translatedTextOriginals.has(node)) {
      translatedTextOriginals.set(node, current);
    }

    const original = translatedTextOriginals.get(node) ?? current;
    const leading = original.match(/^\s*/)?.[0] ?? "";
    const trailing = original.match(/\s*$/)?.[0] ?? "";
    const core = original.trim();

    if (!core) return;

    node.nodeValue = lang === "ko" ? original : `${leading}${trText(core, lang)}${trailing}`;
  });
}


function getCategoryLabel(lang: Lang, slug: string) {
  const map = { all: ui[lang].categories.all, sem: ui[lang].categories.sem, "normal-sem": ui[lang].categories.normalSem, tem: ui[lang].categories.tem, "ion-coater": ui[lang].categories.ion } as const;
  return map[slug as keyof typeof map] ?? slug;
}


const navItems = [
  { label: "제품소개", target: "products" },
  { label: "회사소개", target: "footer-cta" },
];

const heroImages = ["/hero/1.jpg", "/hero/2.png", "/hero/3.jpg", "/hero/4.png"];

const categories: Category[] = [
  { slug: "all", label: "전체" },
  { slug: "sem", label: "주사전자현미경" },
  { slug: "normal-sem", label: "PRODUCTS INTRODUCTION" },
  { slug: "tem", label: "TEM" },
  { slug: "ion-coater", label: "Ion Coater" },
];

const im10Specs: SpecSection[] = [
  {
    group: "Environmental requirements",
    rows: [{ label: "", value: "AC 220V, 50Hz, 1kW, No shock absorbing stage required" }],
  },
  {
    group: "Accelerating voltage",
    rows: [
      {
        label: "",
        value:
          "3kV~20kV Continuously adjustable, 1kV stepping (Optional high-end version, with an acceleration voltage up to 30kV)",
      },
    ],
  },
  {
    group: "Electron gun",
    rows: [
      {
        label: "",
        value:
          "Pre-centered tungsten filament, one-piece condenser lens, no need to manually adjust the objective diaphragm",
      },
    ],
  },
  {
    group: "Magnification",
    rows: [{ label: "", value: "25 ~ 360000x" }],
  },
  {
    group: "Resolution",
    rows: [{ label: "", value: "4nm" }],
  },
  {
    group: "Detector",
    rows: [
      {
        label: "",
        value:
          "Secondary electron detector, Quad-segmented backscattered electron detector, and Integrated energy-dispersive spectrometer",
      },
    ],
  },
  {
    group: "Sample stage",
    rows: [
      {
        label: "",
        value: "Two axes: X: 60mm Y: 55mm, Three-axis and five-axis options are available",
      },
    ],
  },
  {
    group: "Extra-large sample chamber",
    rows: [{ label: "", value: "L185mm × W176mm × H125mm" }],
  },
  {
    group: "vacuum mode",
    rows: [
      {
        label: "",
        value: "High vacuum mode; Low vacuum mode (optional): 1-60Pa automatic control",
      },
    ],
  },
  {
    group: "Imaging mode",
    rows: [
      {
        label: "",
        value:
          "Video mode: 512 x 512 pixels, no need for small window scanning; Quick Sweep mode: 512 x 512 pixels\nSlow scan mode: 2048 x 2048 pixels; Image formats: BMP, TIFF, JPEG, PNG",
      },
    ],
  },
  {
    group: "Navigation function",
    rows: [
      {
        label: "",
        value:
          "Optical camera navigation and an in-chamber camera allow for real-time observation of the conditions inside the sample chamber.",
      },
    ],
  },
  {
    group: "Automatic function",
    rows: [
      {
        label: "",
        value: "Automatic brightness and contrast, automatic focusing, large image stitching",
      },
    ],
  },
  {
    group: "Dimensions",
    rows: [{ label: "", value: "650 × 370 × 642(mm)" }],
  },
  {
    group: "Expansion function",
    rows: [
      {
        label: "",
        value:
          "Compatible with ZEPTOOLS a variety of in-situ measurement sample stage (tensile stage, heating stage, TEC cooling stage and other in-situ test system)",
      },
    ],
  },
];

const defaultOptions: OptionItem[] = [
  {
    title: "CT-1000",
    subtitle: "Ion spotter coater",
    image: "/products/options/CT-1000.png",
  },
  {
    title: "EDS(Bruker)",
    image: "/products/options/optional-1.png",
  },
  {
    title: "EDS(Bruker)",
    image: "/products/options/optional-2.png",
  },
  {
    title: "EDS(Oxford)",
    image: "/products/options/optional-3.png",
  },
  { title: "Cooling stage", placeholder: true },
];

const defaultSoftwareItems: SoftwareItem[] = [
  {
    title: "획기적으로 개선된 인터페이스",
    descriptionLines: [
      "새롭게 적용된 신규 UI로 더욱 간편하게 촬영 환경을 설정해보세요.",
      "최적의 접근성으로 기존 소프트웨어 대비 60% 더 빠른 결과물을 확인할 수 있습니다.",
      "· 더욱 큰 화면, 사용자 친화적 인터페이스 제공",
    ],
    image: "/products/software-main-1.jpg",
  },
  {
    title: "더욱 정교해진 제어 환경",
    descriptionLines: [
      "주요 촬영 조건과 장비 상태를 한 화면에서 빠르게 확인할 수 있습니다.",
      "작업 흐름을 단순화하여 분석 시간은 줄이고 운용 효율은 높였습니다.",
      "· 직관적인 제어 구성, 빠른 조건 전환 지원",
    ],
    image: "/products/software-main-2.jpg",
  },
  {
    title: "빠르고 직관적인 분석 워크플로우",
    descriptionLines: [
      "이미지 획득부터 확인, 분석까지 이어지는 과정을 더욱 자연스럽게 구성했습니다.",
      "초보 사용자도 쉽게 적응할 수 있도록 화면 구성을 단순하고 명확하게 개선했습니다.",
      "· 사용자 중심 설계, 빠른 분석 프로세스 제공",
    ],
    image: "/products/software-main-3.jpg",
  },
];

const defaultGallery: GalleryItem[] = [
  { image: "/products/results/result-1.png", title: "Industrial Testing" },
  { image: "/products/results/result-2.jpg", title: "Industrial Testing" },
  { image: "/products/results/result-3.jpg", title: "Biological Sample Testing" },
  { image: "/products/results/result-4.jpg", title: "Metallographic Inspection" },
  { image: "/products/results/result-5.jpg", title: "Biological Sample Testing" },
  { image: "/products/results/result-6.jpg", title: "Metallographic Inspection" },
  { image: "/products/results/result-7.jpg", title: "Surface Morphology" },
  { image: "/products/results/result-8.jpg", title: "Particle Analysis" },
  { image: "/products/results/result-9.jpg", title: "Microstructure Check" },
  { image: "/products/results/result-10.jpg", title: "Coating Effect Sample" },
];

function makeProduct(config: {
  slug: string;
  category: string;
  title: string;
  categoryLabel: string;
  type: string;
  image: string;
  subtitle: string;
  description: string;
  overview: string;
  briefInfo?: string;
  features: string[];
  useSpecs?: boolean;
  useOptions?: boolean;
  useSoftware?: boolean;
  useGallery?: boolean;
}): Product {
  return {
    slug: config.slug,
    category: config.category,
    title: config.title,
    categoryLabel: config.categoryLabel,
    type: config.type,
    image: config.image,
    subtitle: config.subtitle,
    description: config.description,
    overview: config.overview,
    briefInfo: config.briefInfo,
    features: config.features,
    gallery: config.useGallery === false ? [] : defaultGallery,
    specs: config.useSpecs === false ? undefined : im10Specs,
    options: config.useOptions === false ? undefined : defaultOptions,
    softwareItems: config.useSoftware === false ? undefined : defaultSoftwareItems,
  };
}

const semProducts: Product[] = [
  makeProduct({
    slug: "sem-01",
    category: "sem",
    title: "IM-10",
    categoryLabel: "주사전자현미경",
    type: "SEM",
    image: "/products/im-10.png",
    subtitle: "TABLETOP SEM",
    description: "탁상형 주사전자현미경 기본 모델",
    overview: "컴팩트한 설계와 안정적인 관찰 성능을 제공하는 주사전자현미경입니다.",
    features: ["컴팩트 설치", "쉬운 조작", "빠른 관찰", "교육·연구 활용"],
  }),
  makeProduct({
    slug: "sem-02",
    category: "sem",
    title: "IM-18",
    categoryLabel: "주사전자현미경",
    type: "SEM",
    image: "/products/im-18.png",
    subtitle: "ADVANCED SEM",
    description: "확장 기능이 강화된 주사전자현미경 모델",
    overview: "분석 옵션과 사용자 편의성을 강화한 주사전자현미경 모델입니다.",
    features: ["확장성 강화", "고속 관찰", "쉬운 세팅", "연구 활용"],
  }),
  makeProduct({
    slug: "sem-03",
    category: "sem",
    title: "IM-20",
    categoryLabel: "주사전자현미경",
    type: "SEM",
    image: "/products/im-20.png",
    subtitle: "HIGH PERFORMANCE SEM",
    description: "고성능 분석용 주사전자현미경 모델",
    overview: "정밀 관찰과 고해상도 분석에 적합한 고성능 주사전자현미경입니다.",
    features: ["고해상도", "정밀 분석", "안정적 운용", "산업·연구용"],
  }),
   makeProduct({
    slug: "sem-04",
    category: "sem",
    title: "Normal SEM",
    categoryLabel: "주사전자현미경",
    type: "SEM",
    image: "/products/im-300.png",
    subtitle: "HIGH PERFORMANCE SEM",
    description: "고성능 분석용 주사전자현미경 모델",
    overview: "정밀 관찰과 고해상도 분석에 적합한 고성능 주사전자현미경입니다.",
    features: ["고해상도", "정밀 분석", "안정적 운용", "산업·연구용"],
  }),
];

const normalSemProducts: Product[] = [
  makeProduct({
    slug: "im-18",
    category: "normal-sem",
    title: "PRODUCTS INTRODUCTION",
    categoryLabel: "PRODUCTS INTRODUCTION",
    type: "PRODUCTS",
    image: "/products/im-18.png",
    subtitle: "SAMPLE PREPARATION",
    description: "분석 전처리와 시편 준비를 위한 장비 솔루션",
    overview:
      "시편 전처리와 준비 과정을 보다 안정적이고 효율적으로 진행할 수 있도록 구성한 제품 소개 영역입니다.",
    briefInfo:
      "시편 준비, 전처리, 관찰 전 공정까지 보다 안정적이고 효율적으로 진행할 수 있도록 구성한 제품 소개 영역입니다.",
    features: ["시편 준비", "전처리 지원", "안정적인 운용", "다양한 분석 환경 대응"],
    useSpecs: false,
    useOptions: false,
    useSoftware: false,
    useGallery: false,
  }),
];

const temBriefDescriptions = [
  "In-situ 실험 환경에서 시편의 구조 변화를 실시간으로 관찰할 수 있는 기본형 TEM/SEM 솔루션입니다.",
  "가열 조건에서 미세 구조 변화를 추적하기에 적합한 In-situ 분석 장비입니다.",
  "인장 및 변형 시험 중 시편 반응을 정밀하게 확인할 수 있는 모델입니다.",
  "냉각 조건에서 재료의 표면 및 내부 변화를 안정적으로 관찰할 수 있습니다.",
  "배터리, 반도체, 금속 소재 분석에 적합한 범용 In-situ TEM/SEM 시스템입니다.",
  "미세 구조의 시간에 따른 변화를 확인하기 위한 동적 분석용 장비입니다.",
  "복합 소재의 계면 변화와 결함 발생을 관찰하기 좋은 In-situ 분석 모델입니다.",
  "고배율 이미징과 실험 스테이지 연동이 가능한 연구용 솔루션입니다.",
  "실험 중 샘플 반응을 직관적으로 파악할 수 있도록 설계된 In-situ 장비입니다.",
  "열, 응력, 전기적 자극에 따른 구조 변화를 분석하는 데 적합한 모델입니다.",
  "재료 개발 및 불량 분석 과정에서 활용하기 좋은 TEM/SEM 응용 장비입니다.",
  "연구실과 분석센터에서 폭넓게 사용할 수 있는 다목적 In-situ 솔루션입니다.",
  "정밀 관찰과 반복 실험을 함께 고려한 안정형 TEM/SEM 장비입니다.",
  "시편 반응을 실시간 이미지로 확보할 수 있는 고효율 분석 시스템입니다.",
  "다양한 In-situ 액세서리와 연동 가능한 확장형 TEM/SEM 솔루션입니다.",
  "나노 소재와 박막 샘플의 구조 변화를 세밀하게 관찰할 수 있는 장비입니다.",
  "실험 조건 제어와 영상 확보를 동시에 중시하는 사용자에게 적합한 모델입니다.",
  "고급 응용 분석과 연구 데이터 확보를 위한 In-situ 전용 장비입니다.",
  "정확한 구조 해석과 반응 추적을 지원하는 고신뢰성 TEM/SEM 시스템입니다.",
  "다양한 연구 환경에서 활용 가능한 통합형 In-situ TEM/SEM 솔루션입니다.",
];

const temProducts: Product[] = Array.from({ length: 20 }, (_, i) =>
  makeProduct({
    slug: `tem-${String(i + 1).padStart(2, "0")}`,
    category: "tem",
    title: `TEM-${String(i + 1).padStart(2, "0")}`,
    categoryLabel: "TEM",
    type: "TEM",
    image: "/products/im.png",
    subtitle: "TRANSMISSION ELECTRON MICROSCOPE",
    description: `투과전자현미경 기반의 고해상도 분석 장비 ${i + 1}`,
    overview: `나노 수준 구조 분석과 내부 단면 분석에 적합한 TEM 장비 ${i + 1}번 모델입니다.`,
    briefInfo: temBriefDescriptions[i],
    features: ["고해상도 분석", "나노 구조 관찰", "정밀 데이터 확보", "연구용 최적화"],
    useOptions: false,
    useSoftware: false,
    useGallery: false,
  })
);

const ionCoaterProducts: Product[] = [
  makeProduct({
    slug: "ion-coater-a",
    category: "ion-coater",
    title: "Ion Coater A",
    categoryLabel: "Ion Coater",
    type: "COATER",
    image: "/products/ion-coater.png",
    subtitle: "ION COATING SOLUTION",
    description: "시편 표면 코팅과 전처리를 위한 이온 코터 장비",
    overview:
      "전자현미경 관찰 전 시편 표면을 안정적으로 코팅하여 더 좋은 분석 품질을 확보할 수 있는 장비입니다.",
    features: ["균일 코팅", "전처리 품질 향상", "간편한 운용", "다양한 시편 대응"],
    useOptions: false,
    useSoftware: false,
    useGallery: true,
  }),
];

const products: Product[] = [
  ...semProducts,
  ...normalSemProducts,
  ...temProducts,
  ...ionCoaterProducts,
];

function scrollToSection(id: string) {
  if (typeof window === "undefined") return;
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setQueryParams(params: Record<string, string | null>) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  });

  window.history.pushState({}, "", url.toString());
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function goToCategory(category: string) {
  setQueryParams({ category, product: null });
}

function goToProduct(slug: string, category?: string) {
  setQueryParams({ category: category ?? null, product: slug });
}

function clearAllViews() {
  setQueryParams({ category: null, product: null });
}

function clearProductViewToCategory(category: string) {
  setQueryParams({ category, product: null });
}

function useRouteState() {
  const [state, setState] = useState<{ category: string | null; product: string | null }>({
    category: null,
    product: null,
  });

  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      setState({
        category: params.get("category"),
        product: params.get("product"),
      });
    };

    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return state;
}

function TopNav({ dark = true, lang, setLang }: { dark?: boolean; lang: Lang; setLang: (lang: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseBg = dark ? "bg-[#08111b]/70" : "bg-white/90";
  const scrolledBg = dark ? "bg-[#08111b]/88" : "bg-white/95";
  const textColor = dark ? "text-white/80 hover:text-white" : "text-[#222] hover:text-[#1457b5]";
  const borderColor = dark ? "border-white/10" : "border-black/10";

  return (
    <header
      className={[
        "fixed left-1/2 top-0 z-50 flex w-full max-w-[1920px] -translate-x-1/2 items-center justify-between border-b px-8 lg:px-14",
        "transition-all duration-300 backdrop-blur-md",
        borderColor,
        scrolled ? `${scrolledBg} py-4 shadow-[0_8px_30px_rgba(0,0,0,0.16)]` : `${baseBg} py-5`,
      ].join(" ")}
    >
      <button onClick={clearAllViews} aria-label="홈으로 이동" className="transition hover:opacity-90">
        <img src="/logo.png" alt="ETS Logo" className="h-9 w-auto object-contain lg:h-11" />
      </button>

      <nav className="hidden items-center gap-10 lg:flex">
        {navItems.map((item) => (
          <button
            key={item.target}
            onClick={() => {
              if (item.target === "products") {
                clearAllViews();
                setTimeout(() => scrollToSection(item.target), 80);
              } else {
                scrollToSection(item.target);
              }
            }}
            className={`group relative text-[13px] font-semibold transition ${textColor}`}
          >
            {item.target === "products" ? ui[lang].navProducts : ui[lang].navCompany}
            <span className="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#1457b5] transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </nav>

      <div className="hidden items-center gap-2 lg:flex">
        {(["ko", "en", "zh"] as Lang[]).map((code) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={[
              "rounded-full border px-3 py-1 text-[12px] font-semibold transition",
              dark
                ? lang === code
                  ? "border-white/40 bg-white text-[#111]"
                  : "border-white/20 bg-white/10 text-white/80 hover:bg-white/20"
                : lang === code
                  ? "border-[#1457b5] bg-[#1457b5] text-white"
                  : "border-black/10 bg-white text-[#333] hover:border-[#1457b5] hover:text-[#1457b5]",
            ].join(" ")}
          >
            {code === "ko" ? "한글" : code === "en" ? "English" : "中文"}
          </button>
        ))}
      </div>

      <button className="flex h-10 w-10 items-center justify-center lg:hidden" aria-label="메뉴">
        <span className={dark ? "text-2xl text-white" : "text-2xl text-[#222]"}>≡</span>
      </button>
    </header>
  );
}

function PillButton({
  children,
  light = false,
  onClick,
}: {
  children: React.ReactNode;
  light?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex h-[44px] min-w-[150px] items-center justify-center rounded-full px-6 text-[13px] font-semibold transition duration-300",
        light
          ? "bg-white text-[#1457b5] hover:-translate-y-0.5 hover:bg-[#f3f7ff]"
          : "border border-white/30 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/18",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function GridCard({
  title,
  subtitle,
  description,
  image,
  sliderImages,
  imageScale = "scale-[1]",
  imageTranslate = "translate-x-0",
  heightClass,
  pdfUrl,
  onClick,
  lang,
}: {
  title: string;
  subtitle?: string;
  description: React.ReactNode;
  image: string;
  sliderImages?: string[];
  imageScale?: string;
  imageTranslate?: string;
  heightClass: string;
  pdfUrl?: string;
  onClick?: () => void;
  lang: Lang;
}) {
  const slides = sliderImages && sliderImages.length > 0 ? sliderImages : [image];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(slides.length > 1);

  useEffect(() => {
    setCurrentIndex(0);
    setIsAutoPlaying(slides.length > 1);
  }, [slides.length, image]);

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const goPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (slides.length > 1) {
      setIsAutoPlaying(false);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group overflow-hidden rounded-[6px] ${heightClass} cursor-pointer border border-[#e5e7eb] bg-white`}
    >
      <div className="flex h-full flex-col">
        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfe_72%,#f7f9fc_100%)] px-6 pt-7 sm:px-8 sm:pt-8">
          <button
            type="button"
            onClick={handleImageClick}
            className="flex min-h-[230px] w-full items-center justify-center sm:min-h-[270px] lg:min-h-[290px]"
            aria-label={`${title} ${trText("이미지 영역", lang)}`}
          >
            <img
              src={slides[currentIndex]}
              alt={title}
              className={[
                "h-auto max-h-[230px] w-auto max-w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.08)] sm:max-h-[270px] lg:max-h-[290px]",
                imageScale,
                imageTranslate,
              ].join(" ")}
            />
          </button>

          {slides.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/92 text-[22px] text-[#111] shadow-sm transition hover:bg-white"
                aria-label={trText("이전 이미지", lang)}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/92 text-[22px] text-[#111] shadow-sm transition hover:bg-white"
                aria-label={trText("다음 이미지", lang)}
              >
                ›
              </button>

              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={`${title}-dot-${index}`}
                    type="button"
                    onClick={(e) => goToSlide(e, index)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentIndex === index ? "w-6 bg-[#1457b5]" : "w-2.5 bg-black/20 hover:bg-black/35"
                    }`}
                    aria-label={`${index + 1}번 이미지로 이동`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col bg-[#f6f7f9] px-6 py-6 text-[#111] sm:px-8 sm:py-8">
          {subtitle ? (
            <div className="mb-3 break-words text-[10px] font-medium tracking-[0.12em] text-[#666] sm:text-[11px]">
              {subtitle}
            </div>
          ) : null}

          <h3 className="max-w-full break-words text-[24px] font-extrabold leading-[1.02] sm:text-[30px]">
            {title}
          </h3>

          <div className="mt-4 break-words text-[14px] leading-6 text-[#555] sm:leading-7">
            {description}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex h-[40px] w-[120px] items-center justify-center rounded-full border border-[#1457b5] text-[13px] text-[#1457b5] transition hover:bg-[#1457b5] hover:text-white"
            >
              {ui[lang].go}
            </button>

            <a
              href={pdfUrl ?? "#"}
              download
              onClick={(e) => e.stopPropagation()}
              className="inline-flex h-[40px] min-w-[138px] items-center justify-center rounded-full border border-[#111] px-4 text-[13px] font-medium text-[#111] transition hover:bg-[#111] hover:text-white"
            >
              {ui[lang].pdf}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


function ClickZoomImage({
  src,
  alt,
  imageClassName = "",
  wrapperClassName = "",
  modalImageClassName = "",
  lang = "ko",
}: {
  src: string;
  alt: string;
  imageClassName?: string;
  wrapperClassName?: string;
  modalImageClassName?: string;
  lang?: Lang;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`block w-full cursor-zoom-in ${wrapperClassName}`}
        aria-label={`${alt} ${trText("이미지 확대", lang)}`}
      >
        <img src={src} alt={alt} className={imageClassName} />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-h-full max-w-[1400px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20"
              aria-label={trText("닫기", lang)}
            >
              ×
            </button>
            <img
              src={src}
              alt={alt}
              className={`max-h-[88vh] w-auto max-w-full rounded-[16px] object-contain shadow-[0_24px_60px_rgba(0,0,0,0.35)] ${modalImageClassName}`}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

function ZoomImage({ src, alt, lang }: { src: string; alt: string; lang: Lang }) {
  const [zoomStyle, setZoomStyle] = useState<CSSProperties>({
    transform: "scale(1)",
    transformOrigin: "center",
  });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.6)",
    });
  };

  const handleLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center",
    });
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative block w-full overflow-hidden rounded-[18px] border border-[#e5e7eb] bg-white cursor-zoom-in"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        aria-label={`${alt} ${trText("이미지 확대", lang)}`}
      >
        <img
          src={src}
          alt={alt}
          className="h-[240px] w-full object-contain transition duration-200 ease-out sm:h-[320px] lg:h-[380px] 2xl:h-[420px]"
          style={zoomStyle}
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-h-full max-w-[1400px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20"
              aria-label={trText("닫기", lang)}
            >
              ×
            </button>
            <img
              src={src}
              alt={alt}
              className="max-h-[88vh] w-auto max-w-full rounded-[16px] object-contain shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

function SpecificationTable({ specs, lang }: { specs: SpecSection[]; lang: Lang }) {
  return (
    <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
      <h2 className="text-[34px] font-bold tracking-[-0.03em] text-[#111]">{ui[lang].specification}</h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-[24px] border border-[#2f7bc5]">
          <tbody>
            {specs.map((section, idx) => (
              <tr key={`${trText(section.group, lang)}-${idx}`}>
                <td className="w-[280px] border-r border-t border-[#7fb2df] bg-[#0f67b2] px-4 py-4 text-[15px] font-semibold text-white first:border-t-0">
                  {trText(section.group, lang)}
                </td>
                <td className="whitespace-pre-line border-t border-[#7fb2df] bg-white px-4 py-4 text-[15px] leading-7 text-[#2f5f93] first:border-t-0">
                  {trText(section.rows[0]?.value, lang)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function OptionsSection({ options, lang }: { options: OptionItem[]; lang: Lang }) {
  return (
    <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">{ui[lang].optionalSystem}</div>
          <h2 className="mt-2 text-[34px] font-bold tracking-[-0.03em] text-[#111]">{ui[lang].options}</h2>
          <p className="mt-3 text-[15px] leading-7 text-[#66707d]">
            장비 확장과 분석 기능 향상을 위한 다양한 옵션 구성을 제공합니다.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {options.map((item, idx) => (
          <div
            key={`${trText(item.title, lang)}-${idx}`}
            className="group rounded-[20px] border border-[#e6ebf2] bg-[#f8fafc] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1457b5] hover:bg-white hover:shadow-[0_16px_34px_rgba(20,87,181,0.12)]"
          >
            <div className="flex h-[180px] items-center justify-center rounded-[18px] border border-[#edf2f7] bg-white">
              {item.image && !item.placeholder ? (
                <ClickZoomImage
                  src={item.image}
                  alt={trText(item.title, lang)}
                  wrapperClassName="flex items-center justify-center"
                  imageClassName="max-h-[145px] max-w-[145px] object-contain transition duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-[120px] w-[120px] items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#dbeafe_0%,#eff6ff_100%)] text-center">
                  <div>
                    <div className="text-[28px] font-bold leading-none text-[#1457b5]">+</div>
                    <div className="mt-2 text-[11px] font-semibold tracking-[0.14em] text-[#5f6f85]">
                      OPTION
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5">
              <h3 className="text-[20px] font-bold tracking-[-0.02em] text-[#111]">{trText(item.title, lang)}</h3>
              {item.subtitle ? (
                <p className="mt-2 text-[14px] leading-6 text-[#6b7280]">{item.subtitle}</p>
              ) : (
                <p className="mt-2 text-[14px] leading-6 text-[#8a94a6]">{ui[lang].compatibleOptional}</p>
              )}
            </div>

            <div className="mt-5 h-px w-full bg-[#e5eaf1]" />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[12px] font-medium tracking-[0.08em] text-[#7a8798]">{ui[lang].availableOption}</span>
              <span className="text-[18px] text-[#1457b5] transition group-hover:translate-x-1">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SoftwareSection({ items, lang }: { items: SoftwareItem[]; lang: Lang }) {
  return (
    <section className="space-y-8">
      {items.map((item, idx) => (
        <section
          key={`${trText(item.title, lang)}-${idx}`}
          className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10"
        >
          <div className="max-w-[980px]">
            <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">{ui[lang].software}</div>
            <h2 className="mt-3 text-[32px] font-bold tracking-[-0.03em] text-[#111] lg:text-[40px]">
              {trText(item.title, lang)}
            </h2>

            <div className="mt-5 space-y-2 text-[16px] leading-8 text-[#4b5563]">
              {item.descriptionLines.map((line, lineIdx) => (
                <p key={`${trText(item.title, lang)}-line-${lineIdx}`}>{trText(line, lang)}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[20px] border border-[#d9e1ea] bg-[#f8fafc]">
            <div className="border-b border-[#e5e7eb] bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f8_100%)] px-5 py-4">
              <div className="text-[14px] font-semibold text-[#334155]">{ui[lang].softwarePreview}</div>
            </div>

            <div className="overflow-hidden rounded-[20px] bg-white">
              <ClickZoomImage
                src={item.image}
                alt={trText(item.title, lang)}
                wrapperClassName="block"
                imageClassName="h-auto w-full object-cover"
                modalImageClassName="bg-white"
              />
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}

function BeforeAfterSEM({
  afterSrc,
  title,
  lang,
}: {
  afterSrc: string;
  title: string;
  lang: Lang;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="group relative overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-black shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
        <ClickZoomImage
          src={afterSrc}
          alt={`${title} before`}
          imageClassName="h-[300px] w-full object-cover blur-[2px] brightness-[0.7] contrast-[1.2]"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay"
          style={{
            backgroundImage: "url('/noise.png')",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-1 text-[12px] text-white">
          {lang === "ko" ? "코팅 전" : lang === "en" ? "BEFORE" : "镀膜前"}
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-black shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
        <ClickZoomImage
          src={afterSrc}
          alt={`${title} after`}
          imageClassName="h-[300px] w-full object-cover"
        />
        <div className="absolute left-4 top-4 rounded-full bg-[#1457b5] px-4 py-1 text-[12px] text-white">
          {lang === "ko" ? "코팅 후" : lang === "en" ? "AFTER" : "镀膜后"}
        </div>
      </div>
    </div>
  );
}

function HeroSlider({ lang }: { lang: Lang }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => setIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev + 1) % heroImages.length);

  return (
    <section
      id="home"
      className="relative h-[92vh] min-h-[700px] overflow-hidden cursor-pointer"
      onClick={() => setIsPaused((prev) => !prev)}
    >
      {heroImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`hero-slide-${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
            i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,13,0.62)_0%,rgba(5,10,17,0.36)_30%,rgba(6,12,20,0.18)_60%,rgba(6,12,20,0.10)_100%)]" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="이전 슬라이드"
        className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/25 px-3 py-2 text-xl text-white backdrop-blur transition duration-300 hover:bg-black/45"
      >
        ◀
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="다음 슬라이드"
        className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/25 px-3 py-2 text-xl text-white backdrop-blur transition duration-300 hover:bg-black/45"
      >
        ▶
      </button>

      <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
            aria-label={`슬라이드 ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition duration-300 ${
              i === index ? "bg-white" : "bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="relative z-20 flex h-full items-center justify-center px-6 pt-16 text-center lg:px-10">
        <div className="mx-auto max-w-[980px] text-white">
          <div className="mb-6 text-[12px] font-medium tracking-[0.16em] text-white/78">
            THE BEST 고성능 분석장비 솔루션
          </div>

          <h1 className="text-[38px] font-extrabold leading-[1.25] tracking-[-0.02em] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.62)] lg:text-[68px]">
            전자현미경 및 분석
            <br />
            장비 전문 기업
          </h1>

          <p className="mx-auto mt-6 max-w-[720px] text-[15px] leading-8 text-white/88 lg:text-[17px]">
            정밀관찰, 재료분석, 품질평가를 위한 전자현미경 및 분석장비 솔루션을 제공합니다.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PillButton onClick={() => scrollToSection("products")}>바로 보러가기</PillButton>
            <PillButton light onClick={() => scrollToSection("footer-cta")}>문의하기</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductShowcase({ lang }: { lang: Lang }) {
  const mainCategoryCards: ShowcaseCard[] = [
    {
      slug: "sem",
      title: "주사전자현미경",
      subtitle: "SCANNING ELECTRON MICROSCOPE",
      description: "3개의 Table Top SEM, 1개의 Normal SEM 제품 라인업",
      image: "/products/im-10.png",
      sliderImages: ["/products/im-10.png", "/products/im-18.png", "/products/im-20.png","/products/im-300.png"],
      imageScale: "scale-[1.05]",
      imageTranslate: "translate-x-[2%]",
      pdfUrl: "/pdf/sem.pdf",
    },
    {
      slug: "tem",
      title: "IN-SITU TEM/SEM SOLUTIONS",
      subtitle: "IN-SITU TEM / SEM SOLUTIONS",
      description: "In-situ 분석 및 특수 응용을 위한 TEM/SEM 솔루션 라인업",
      image: "/products/.png",
      imageScale: "scale-[0.94]",
      imageTranslate: "translate-x-[3%]",
      pdfUrl: "/pdf/in-situ-tem-sem-solutions.pdf",
    },
    {
      slug: "normal-sem",
      title: "PRODUCTS INTRODUCTION",
      subtitle: "SAMPLE PREPARATION",
      description: "분석 전처리와 시편 준비를 위한 장비 솔루션",
      image: "/products/.png",
      imageScale: "scale-[0.98]",
      imageTranslate: "translate-x-[4%]",
      pdfUrl: "/pdf/sample-preparation.pdf",
    },
    {
      slug: "ion-coater",
      title: "Ion Coater",
      subtitle: "ION COATING SOLUTION",
      description: "시편 표면 코팅과 전처리를 위한 이온 코터 장비",
      image: "/products/ion-coater.png",
      sliderImages: ["/products/ion-coater.png"],
      imageScale: "scale-[0.92]",
      imageTranslate: "translate-x-[1%]",
      pdfUrl: "/pdf/ion-coater.pdf",
    },
  ];

  return (
    <section id="products" className="bg-[#08111b] px-4 py-14 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 px-2 text-center">
          <div className="text-[11px] font-medium tracking-[0.16em] text-white/50">PRODUCT LINE</div>
          <h2 className="mt-2 text-[28px] font-bold text-white lg:text-[40px]">제품 소개</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mainCategoryCards.map((item) => (
            <GridCard
              key={item.slug}
              title={trText(item.title, lang)}
              subtitle={trText(item.subtitle, lang)}
              description={<>{trText(item.description, lang)}</>}
              image={item.image}
              sliderImages={item.sliderImages}
              imageScale={item.imageScale}
              imageTranslate={item.imageTranslate}
              heightClass="min-h-[320px] lg:min-h-[360px]"
              pdfUrl={item.pdfUrl}
              onClick={() => goToCategory(item.slug)}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryBanner({ title, lang }: { title: string; lang: Lang }) {
  return (
    <section className="relative h-[320px] overflow-hidden">
      <img src="/sub/sub-visual.jpg" alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,18,0.72)_0%,rgba(5,10,18,0.42)_55%,rgba(5,10,18,0.25)_100%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] items-end px-6 pb-12 lg:px-8">
        <div className="w-full">
          <div className="text-[12px] font-semibold tracking-[0.18em] text-white/70">PRODUCT</div>
          <h1 className="mt-4 text-[36px] font-bold tracking-[-0.03em] text-white lg:text-[62px]">{title}</h1>

          <div className="mt-5 flex items-center gap-3 text-[13px] text-white/80">
            <span>{ui[lang].home}</span>
            <span>/</span>
            <span>{ui[lang].products}</span>
            <span>/</span>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductListPage({ selectedCategory, lang, setLang }: { selectedCategory: string; lang: Lang; setLang: (lang: Lang) => void }) {
  const activeCategory = selectedCategory || "all";
  const filteredProducts =
    activeCategory === "all" ? products : products.filter((item) => item.category === activeCategory);

  const currentCategoryName = getCategoryLabel(lang, activeCategory);
  const visibleCategories =
    activeCategory === "all" ? categories : categories.filter((category) => category.slug === activeCategory);

  return (
    <main className="min-h-screen bg-[#f4f6f8]">
      <TopNav dark={false} lang={lang} setLang={setLang} />
      <CategoryBanner title={currentCategoryName} lang={lang} />

      <section className="bg-[linear-gradient(180deg,#f7f8fa_0%,#eef2f6_100%)] px-4 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 rounded-[28px] border border-white/70 bg-white/80 px-8 py-10 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="text-[12px] font-semibold tracking-[0.18em] text-[#1457b5]">PRODUCT CATEGORY</div>
            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-[34px] font-bold tracking-[-0.03em] text-[#111] lg:text-[52px]">
                  {currentCategoryName}
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-[#5b6472]">
                  선택한 카테고리의 제품을 한눈에 확인하실 수 있습니다.
                  <br className="hidden lg:block" />
                  장비별 상세 보기로 이동해 주요 특징과 구성을 확인해보세요.
                </p>
              </div>

              {activeCategory !== "all" && (
                <button
                  onClick={() => goToCategory("all")}
                  className="inline-flex h-[46px] items-center justify-center rounded-full border border-[#1457b5] bg-white px-6 text-[14px] font-semibold text-[#1457b5] transition hover:bg-[#1457b5] hover:text-white"
                >
                  전체 보기
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 rounded-[22px] border border-[#dbe3ec] bg-white p-2 shadow-[0_10px_25px_rgba(15,23,42,0.04)]">
            <div className="flex flex-wrap gap-2">
              {visibleCategories.map((category) => {
                const isActive = category.slug === activeCategory;
                return (
                  <button
                    key={category.slug}
                    onClick={() => goToCategory(category.slug)}
                    className={[
                      "inline-flex h-[46px] min-w-[140px] items-center justify-center rounded-full px-5 text-[14px] font-medium transition",
                      isActive
                        ? "bg-[#1457b5] text-white shadow-[0_10px_22px_rgba(20,87,181,0.22)]"
                        : "bg-[#f7f9fc] text-[#5e6775] hover:bg-[#edf3fb] hover:text-[#1457b5]",
                    ].join(" ")}
                  >
                    {getCategoryLabel(lang, category.slug)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="text-[14px] text-[#6a7380]">
              <span className="font-semibold text-[#111]">{ui[lang].total} {filteredProducts.length}</span> / 1 {ui[lang].page}
            </div>

            <button className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#d7dee8] bg-white text-[18px] text-[#95a1b2] transition hover:border-[#1457b5] hover:text-[#1457b5]">
              ⌕
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.slug}
                className="group overflow-hidden rounded-[26px] border border-[#dde5ee] bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1457b5] hover:shadow-[0_20px_45px_rgba(20,87,181,0.14)]"
              >
                <div className="relative overflow-hidden border-b border-[#edf1f5] bg-white px-6 py-7 sm:px-8 sm:py-8">
                  <div className="absolute inset-x-0 top-0 h-[4px] bg-[#1457b5] opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="flex h-[220px] items-center justify-center sm:h-[250px]">
                    <img
                      src={product.image}
                      alt={trText(product.title, lang)}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div className="bg-[linear-gradient(180deg,#f7f9fc_0%,#eef2f6_100%)] px-5 pb-7 pt-5 sm:px-6 sm:pb-8 sm:pt-6">
                  <div className="inline-flex rounded-full bg-[#1457b5] px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-white shadow-[0_8px_18px_rgba(20,87,181,0.18)]">
                    {product.type}
                  </div>
                  <div className="mt-3 text-[13px] text-[#5f6a78]">{trText(product.categoryLabel, lang)}</div>
                  <div className="mt-3 break-words text-[34px] font-bold leading-[0.95] tracking-[-0.04em] text-[#111] sm:text-[38px]">
                    {trText(product.title, lang)}
                  </div>
                  <div className="mt-4 min-h-[48px] text-[14px] leading-6 text-[#66707d]">{trText(product.description, lang)}</div>

                  <button
                    onClick={() => goToProduct(product.slug, product.category)}
                    className="mt-7 inline-flex h-[46px] min-w-[170px] items-center justify-between rounded-full border border-[#1457b5] bg-white px-5 text-[14px] font-semibold text-[#1457b5] transition-all duration-300 hover:bg-[#1457b5] hover:text-white"
                  >
                    <span>{ui[lang].moreDetail}</span>
                    <span className="ml-6">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA lang={lang} />
      <SiteFooter lang={lang} />
    </main>
  );
}

function ProductDetailPage({ product, lang, setLang }: { product: Product; lang: Lang; setLang: (lang: Lang) => void }) {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);

  const selectedGalleryItem =
    selectedGalleryIndex !== null ? product.gallery[selectedGalleryIndex] ?? null : null;

  const closeModal = () => setSelectedGalleryIndex(null);

  const goPrev = () => {
    if (selectedGalleryIndex === null) return;
    setSelectedGalleryIndex(
      selectedGalleryIndex === 0 ? product.gallery.length - 1 : selectedGalleryIndex - 1
    );
  };

  const goNext = () => {
    if (selectedGalleryIndex === null) return;
    setSelectedGalleryIndex(
      selectedGalleryIndex === product.gallery.length - 1 ? 0 : selectedGalleryIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedGalleryIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedGalleryIndex]);

  const showSummaryInSpecArea =
    (product.category === "tem" || product.slug === "im-18") && !!product.briefInfo;
  const shouldShowSpecs = !showSummaryInSpecArea && !!product.specs && product.specs.length > 0;

  return (
    <main className="min-h-screen bg-[#f4f4f4]">
      <TopNav dark={false} lang={lang} setLang={setLang} />
      <CategoryBanner title={typeof product.categoryLabel === "string" ? product.categoryLabel : ""} lang={lang} />

      <section className="px-4 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1280px] space-y-8">
          <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
            <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">
              {trText(product.categoryLabel, lang)}
            </div>
            <h1 className="mt-3 break-words text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-[#111] sm:text-[34px] lg:text-[42px] 2xl:text-[54px]">
              {trText(product.title, lang)}
            </h1>
            <div className="mt-2 break-words text-[15px] font-medium leading-7 text-[#666] sm:text-[17px]">
              {trText(product.subtitle, lang)}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 2xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] 2xl:items-start">
              <div className="min-w-0">
                <ZoomImage src={product.image} alt={trText(product.title, lang)} lang={lang} />
              </div>

              <div className="min-w-0 overflow-hidden">
                <div className="break-words text-[15px] leading-8 text-[#444] sm:text-[16px]">
                  {trText(product.overview, lang)}
                </div>

                <div className="mt-8">
                  <div className="text-[20px] font-bold text-[#111]">핵심 특징</div>
                  <ul className="mt-4 space-y-3 break-words text-[15px] leading-7 text-[#444] sm:text-[16px]">
                    {product.features.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[10px] h-[6px] w-[6px] rounded-full bg-[#1457b5]" />
                        <span className="min-w-0 flex-1 break-words">{trText(item, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {product.briefInfo && !showSummaryInSpecArea ? (
                  <section className="mt-8 rounded-[20px] border border-[#dbe4f0] bg-[#f8fbff] p-5 lg:p-6">
                    <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">
                      PRODUCT SUMMARY
                    </div>
                    <h2 className="mt-2 text-[22px] font-bold tracking-[-0.02em] text-[#111]">
                      장비 간략 설명
                    </h2>
                    <p className="mt-3 text-[15px] leading-7 text-[#4b5563]">{product.briefInfo ? trText(product.briefInfo, lang) : product.briefInfo}</p>
                  </section>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="inline-flex h-[44px] items-center justify-center rounded-full bg-[#1457b5] px-6 text-[14px] font-medium text-white transition hover:opacity-90">
                    제품문의
                  </button>
                  {product.category !== "ion-coater" && product.gallery.length > 0 ? (
                    <button
                      onClick={() => scrollToSection("detail-gallery")}
                      className="inline-flex h-[44px] items-center justify-center rounded-full border border-[#1457b5] px-6 text-[14px] font-medium text-[#1457b5] transition hover:bg-[#1457b5] hover:text-white"
                    >
                      장비 상세 보기
                    </button>
                  ) : null}
                  <button
                    onClick={() => clearProductViewToCategory(product.category)}
                    className="inline-flex h-[44px] items-center justify-center rounded-full border border-[#d0d7e2] px-6 text-[14px] font-medium text-[#555] transition hover:border-[#1457b5] hover:text-[#1457b5]"
                  >
                    목록으로 돌아가기
                  </button>
                </div>
              </div>
            </div>
          </section>

          {product.softwareItems && product.softwareItems.length > 0 ? (
            <SoftwareSection items={product.softwareItems} lang={lang} />
          ) : null}

          {product.category === "ion-coater" && product.gallery.length > 0 ? (
            <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
              <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">
                BEFORE / AFTER COMPARISON
              </div>
              <h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-[#111]">
                Ion Coating 전 / 후 비교
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-[#66707d]">
                동일 이미지를 기반으로 코팅 전 느낌과 코팅 후 결과를 직관적으로 비교할 수 있습니다.
              </p>

              <div className="mt-8 space-y-8">
                {product.gallery.slice(0, 10).map((item, idx) => (
                  <BeforeAfterSEM key={`${trText(item.title, lang)}-${idx}`} afterSrc={item.image} title={trText(item.title, lang)} lang={lang} />
                ))}
              </div>
            </section>
          ) : null}

          {showSummaryInSpecArea ? (
            <section className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10">
              <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">
                PRODUCT SUMMARY
              </div>
              <h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-[#111]">
                장비 간략 설명
              </h2>
              <p className="mt-4 max-w-[900px] text-[16px] leading-8 text-[#4b5563]">{product.briefInfo ? trText(product.briefInfo, lang) : product.briefInfo}</p>
            </section>
          ) : null}

          {shouldShowSpecs ? <SpecificationTable specs={product.specs!} lang={lang} /> : null}

          {product.options && product.options.length > 0 ? (
            <OptionsSection options={product.options} lang={lang} />
          ) : null}

          {product.category !== "ion-coater" && product.gallery.length > 0 ? (
            <section
              id="detail-gallery"
              className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:p-10"
            >
              <div className="text-[13px] font-semibold tracking-[0.12em] text-[#1457b5]">
                APPLICATION IMAGE
              </div>
              <h2 className="mt-3 text-[28px] font-bold tracking-[-0.03em] text-[#111]">
                장비로 촬영한 이미지
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-[#66707d]">
                실제 장비를 통해 획득한 샘플 이미지를 확인하실 수 있습니다.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {product.gallery.map((item, idx) => (
                  <button
                    key={`${product.slug}-${idx}`}
                    type="button"
                    onClick={() => setSelectedGalleryIndex(idx)}
                    className="group overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-white text-left shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)]"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={trText(item.title, lang)}
                        className="h-[270px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />

                      <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-10">
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="mb-1 text-[11px] font-semibold tracking-[0.16em] text-white/70">
                              ANALYSIS IMAGE
                            </div>
                            <div className="text-[17px] font-semibold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
                              {trText(item.title, lang)}
                            </div>
                          </div>

                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition duration-500 group-hover:translate-x-1 group-hover:bg-white/20">
                            →
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>

      <FooterCTA lang={lang} />
      <SiteFooter lang={lang} />

      {selectedGalleryItem ? (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-[1280px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeModal}
              className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20"
              aria-label={trText("닫기", lang)}
            >
              ×
            </button>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-2xl text-white backdrop-blur-sm transition hover:bg-black/55"
              aria-label={trText("이전 이미지", lang)}
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-2xl text-white backdrop-blur-sm transition hover:bg-black/55"
              aria-label={trText("다음 이미지", lang)}
            >
              ›
            </button>

            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111827] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.16em] text-white/50">
                    ANALYSIS IMAGE
                  </div>
                  <div className="mt-1 text-[20px] font-semibold text-white">
                    {selectedGalleryItem.title}
                  </div>
                </div>

                <div className="text-[13px] text-white/55">
                  {selectedGalleryIndex! + 1} / {product.gallery.length}
                </div>
              </div>

              <div className="flex items-center justify-center bg-black px-4 py-4 lg:px-8 lg:py-8">
                <img
                  src={selectedGalleryItem.image}
                  alt={selectedGalleryItem.title}
                  className="max-h-[80vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function FooterCTA({ lang }: { lang: Lang }) {
  return (
    <section id="footer-cta" className="relative overflow-hidden">
      <img
        src="/images/footer-bg.jpg"
        alt="contact background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-12 text-white lg:px-8 lg:py-14">
        <h2 className="text-center text-[24px] font-bold tracking-[-0.03em] lg:text-[36px]">
          정확한 제품과 서비스, 빠른 납기
        </h2>

        <div className="mx-auto mt-5 h-px w-full max-w-[900px] bg-white/30" />

        <div className="mt-10 flex justify-center">
          <div className="flex w-full max-w-[700px] justify-between gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="text-[18px] font-bold lg:text-[20px]">최첨단 SEM 전문</div>
              <p className="mt-4 text-[14px] leading-7 text-white/85">
                산업 전반에 걸쳐 정밀한 분석과
                <br />
                품질 관리를 지원하고 있습니다.
              </p>
              <button className="mt-5 inline-flex h-[40px] min-w-[110px] items-center justify-center rounded-full border border-white/80 px-4 text-[13px] font-medium transition hover:bg-white hover:text-black">
                회사소개
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="text-[18px] font-bold lg:text-[20px]">제품문의</div>
              <p className="mt-4 text-[14px] leading-7 text-white/85">
                빠르고 정확하게
                <br />
                답변해 드립니다.
              </p>
              <button className="mt-5 inline-flex h-[40px] min-w-[110px] items-center justify-center rounded-full border border-white/80 px-4 text-[13px] font-medium transition hover:bg-white hover:text-black">
                제품문의
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-black px-6 py-12 text-white lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1520px]">
        <div className="flex flex-wrap gap-10 border-b border-white/20 pb-10 text-[18px] font-semibold">
          <button className="transition hover:text-[#7fb2ff]">회사소개</button>
          <button className="transition hover:text-[#7fb2ff]">개인정보처리방침</button>
          <button className="transition hover:text-[#7fb2ff]">오시는 길</button>
        </div>

        <div className="pt-10 text-[18px] leading-9 text-white/88">
          <div>
            • <span className="font-bold">ADDR</span> : 경기도 화성시 동탄대로 646-4 1110~2호(메가비즈타워 B동)
          </div>
          <div>
            • <span className="font-bold">TEL</span> : 010-8615-7424,{" "}
            <span className="font-bold">E-MAIL</span> : Danielkim@ets88.co.kr
          </div>
        </div>

        <div className="mt-10 text-[16px] text-white/70">COPYRIGHT © 2020 ETS ALL RIGHTS RESERVED</div>
      </div>
    </footer>
  );
}

function HomePage({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <TopNav lang={lang} setLang={setLang} />
      <HeroSlider lang={lang} />
      <ProductShowcase lang={lang} />
      <FooterCTA lang={lang} />
      <SiteFooter lang={lang} />
    </main>
  );
}

export default function Page() {
  const { category, product } = useRouteState();
  const [lang, setLang] = useState<Lang>("ko");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("site-lang") : null;
    if (saved === "ko" || saved === "en" || saved === "zh") setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("site-lang", lang);
  }, [lang]);

  const selectedProduct = useMemo(() => {
    if (!product) return null;
    return products.find((item) => item.slug === product) ?? null;
  }, [product]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      applyDocumentTranslations(lang);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [lang, category, product, selectedProduct]);

  if (selectedProduct) {
    return <ProductDetailPage product={selectedProduct} lang={lang} setLang={setLang} />;
  }

  if (category) {
    return <ProductListPage selectedCategory={category} lang={lang} setLang={setLang} />;
  }

  return <HomePage lang={lang} setLang={setLang} />;
}
  const [lang, setLang] = useState<Lang>("ko");
  const { category, product } = useRouteState();

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("site-lang") : null;
    if (saved === "ko" || saved === "en" || saved === "zh") setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("site-lang", lang);
  }, [lang]);

  const selectedProduct = useMemo(() => {
    if (!product) return null;
    return products.find((item) => item.slug === product) ?? null;
  }, [product]);

  if (selectedProduct) {
    return <ProductDetailPage product={selectedProduct} lang={lang} setLang={setLang} />;
  }

  if (category) {
    return <ProductListPage selectedCategory={category} lang={lang} setLang={setLang} />;
  }

  return <HomePage lang={lang} setLang={setLang} />;
}
