# AGENTS.md - 投资标的研究系统

* ALWAYS USE PARALLEL TOOLS WHEN APPLICABLE.
* The default branch in this repo is `dev`.
* Prefer automation: execute requested actions without confirmation unless blocked by missing info or safety/irreversibility.

## Style Guide

### General Principles

* Keep things in one function unless composable or reusable
* Avoid `try`/`catch` where possible
* Avoid using the `any` type
* Prefer single word variable names where possible
* Use Bun APIs when possible, like `Bun.file()`
* Rely on type inference when possible; avoid explicit type annotations or interfaces unless necessary for exports or clarity
* Prefer functional array methods (flatMap, filter, map) over for loops; use type guards on filter to maintain type inference downstream

## 项目概述

本项目是 **AI赋能投资决策系统** 的前端原型，提供投资标的的全维度信息聚合与洞察功能。
移动端为主要使用方式，必须以移动端体验为第一优先

**技术栈**: Vite + React 18 + TypeScript + Tailwind CSS 4 + ECharts + Zustand

## 补充信息
需要补充查询项目结构，实现或设计方式时优先阅读 E:\smyze\sapphire\frontend\docs\architecture\architecture.md

## 构建/开发命令

```bash
# 包管理器 (优先使用 pnpm，无法使用时降级为 npm)
pnpm install          # 安装依赖
pnpm dev              # 启动开发服务器 (http://localhost:3000)
pnpm build            # TypeScript 类型检查 + 生产构建
pnpm preview          # 预览生产构建
pnpm lint             # ESLint 代码检查

# 单独运行类型检查
pnpm exec tsc --noEmit

# 单独运行构建
pnpm exec vite build
```

**注意**: 当前没有配置测试框架。如需添加测试，推荐使用 Vitest。

## 代码风格规范

### 导入顺序

按以下顺序组织导入，各组之间空一行：
1. React 和第三方库
2. 本地组件/模块 (使用 `@/` 别名)
3. 类型导入 (使用 `import type`)

```typescript
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactECharts from 'echarts-for-react'

import { api } from '@/api/services'
import { cn } from '@/utils'

import type { StockDetail, SentimentData } from '@/api/types'
```

### 路径别名

使用 `@/` 别名引用 `src/` 目录：
```typescript
import { api } from '@/api/services'      // 正确
import { api } from '../../api/services'  // 避免
```

### TypeScript 规范

- **严格模式**: 启用 `strict: true`，禁止 `any` 类型
- **未使用变量**: 启用 `noUnusedLocals` 和 `noUnusedParameters`
- **数组索引**: 启用 `noUncheckedIndexedAccess`，访问数组元素需要处理 undefined
- **类型导入**: 使用 `import type` 导入纯类型

```typescript
// 正确: 处理可能的 undefined
const firstItem = items[0]
if (firstItem) {
  console.log(firstItem.name)
}

// 类型导入
import type { Stock } from '@/api/types'
```

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `StockCard.tsx`, `SentimentChart` |
| 页面目录 | PascalCase | `pages/Research/DataAggregation/` |
| 工具函数 | camelCase | `formatPrice()`, `getChangeColor()` |
| 类型/接口 | PascalCase | `interface StockDetail`, `type SentimentPolarity` |
| 常量 | camelCase 或 UPPER_SNAKE | `const statusColors = {}` |
| CSS 类 | kebab-case (Tailwind) | `text-slate-400`, `bg-amber-500/20` |

### React 组件规范

```typescript
// 函数组件使用 function 声明 (页面组件导出 default)
export default function HomePage() {
  return <div>...</div>
}

// 内部组件可以使用 function 声明
function StatCard({ label, value }: { label: string; value: number }) {
  return <div>...</div>
}

// Props 类型内联或单独定义
interface CardProps {
  title: string
  children: React.ReactNode
}

function Card({ title, children }: CardProps) {
  return <div>...</div>
}
```

### 样式规范 (Tailwind CSS 4)

- 使用 `cn()` 工具函数合并条件类名 (基于 clsx)
- 优先使用 Tailwind 原子类，避免自定义 CSS
- 深色主题为主，使用 `slate` 色系作为基础色

```typescript
import { cn } from '@/utils'

<div className={cn(
  'rounded-lg border p-4',
  isActive ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700'
)}>
```

### 状态管理 (Zustand)

```typescript
// stores/stockStore.ts
import { create } from 'zustand'

interface StockState {
  currentStock: Stock | null
  setCurrentStock: (stock: Stock | null) => void
}

export const useStockStore = create<StockState>((set) => ({
  currentStock: null,
  setCurrentStock: (stock) => set({ currentStock: stock }),
}))
```

### 错误处理

- API 调用使用 try/catch 包裹
- 加载状态使用 `loading` state
- 空数据状态需要友好提示

```typescript
const [loading, setLoading] = useState(true)
const [data, setData] = useState<DataType | null>(null)

useEffect(() => {
  setLoading(true)
  api.getData(id)
    .then(setData)
    .finally(() => setLoading(false))
}, [id])

if (loading) return <Spinner />
if (!data) return <EmptyState />
```

---

## 工程级约束

- **禁止猜测**，有任何疑问直接询问
- 优先使用 pnpm，无法使用时降级为 npm
- 文件保持在 ~500 行以内，超出时考虑拆分
- 为复杂逻辑添加简短注释

## API Mock 规范

所有 API 使用 Mock 数据，定义在 `src/api/mock/` 目录。Mock 函数命名规范：
- `generateMock{Entity}`: 生成单个实体
- `generateMock{Entity}Data`: 生成页面完整数据
- `mock{Entity}s`: 静态列表数据

```typescript
// src/api/mock/stock.ts
export const mockStocks: Stock[] = [...]
export function generateMockStockDetail(code: string): StockDetail | null {...}
```

## 部署

项目配置了 Vercel 部署 (`vercel.json`)，支持 SPA 路由重写。

```bash
# 本地预览生产构建
pnpm build && pnpm preview
```
