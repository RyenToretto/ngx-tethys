---
category: other
title: Guider
subtitle: 新手引导
---

## 概览

为用户展示新手引导。

## 使用方式

导入服务，配置相关 option config。使用 `ThyGuider.create` 方法生成 `thyGuiderRef`，对
新手引导进行创建、关闭等操作。  

### 基本使用
```typescript
this.thyGuider.create({
    steps: [
        {
            key: 'basic-tip-target',
            target: '.basic-tip-target',
            data: {
                cover: '',
                title: 'basic-tip-title',
                description: 'description for basic tip'
            }
        }
    ] as StepInfo[]
};);
```




