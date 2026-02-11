# 投资标的研究系统 - 前端架构文档

> **版本**: v0.2.0 Beta
> **最后更新**: 2026-02-11
> **技术栈**: Vite + React 18 + TypeScript + Tailwind CSS 4 + ECharts + Zustand

---

## 1. 系统概述

本项目是 **AI赋能投资决策系统** 的前端应用，提供投资组合管理与 AI 多维度分析功能。系统核心围绕"组合管理 → 4维度AI分析 → 信号灯决策"的投资工作流，通过三色信号灯（green/red/yellow）快速纵览投资标的状态。

以移动端为核心使用场景

### 核心能力

| 模块 | 功能 | 路由 | 状态 |
|------|------|------|------|
| 投资总览 | 首页仪表盘，所有组合概览 + 信号灯矩阵 | `/` | ✅ 已实现 |
| 投资组合管理 | 组合 CRUD、标的管理、4维度AI分析 | `/portfolio`, `/portfolio/:id` | ✅ 已实现 |
| 标的研究 | 单股票深度研究（数据采集/信息提取/舆情/对标/研报） | `/research` | 🔲 占位 |

### 4维度 AI 分析体系

每只股票从以下4个维度进行 Agent 分析，每个维度输出三色信号灯结论：

| 维度 | 分析内容 | 信号含义 |
|------|---------|---------|
| 每日信息汇总 | 行情走势、重要新闻、市场情绪 | green=积极 / red=低迷 / yellow=震荡 |
| 重大事件预测 | 未来事件概率、影响方向、时间窗口 | green=正面催化 / red=负面风险 / yellow=中性 |
| 资金流分析 | 主力资金、北向资金、机构持仓 | green=流入 / red=流出 / yellow=中性 |
| 风险控制 | 风险等级、止损止盈、预警信号 | green=可控 / red=偏高 / yellow=需关注 |

---

## 2. 技术栈

### 运行时依赖

| 库 | 版本 | 用途 |
|----|------|------|
| React | 18.3.1 | UI 框架 |
| React Router DOM | 7.x | 客户端路由 |
| Zustand | 5.x | 轻量状态管理 |
| Tailwind CSS | 4.x | 原子化 CSS |
| ECharts | 5.6.0 | 数据可视化图表 |
| echarts-for-react | 3.0.6 | ECharts React 封装 |
| clsx | 2.1.1 | 条件类名合并 |
| tailwind-merge | 2.6.x | Tailwind 类名去重合并 |

### 开发工具链

| 工具 | 版本 | 用途 |
|------|------|------|
| Vite | 6.x | 构建工具 + 开发服务器 |
| TypeScript | 5.7.x | 类型系统（strict 模式） |
| ESLint | 9.x | 代码质量检查 |
| @tailwindcss/vite | 4.x | Tailwind CSS Vite 插件 |

---

## 3. 项目结构

```
frontend/
├── index.html                        # HTML 入口
├── package.json                      # 项目配置
├── vite.config.ts                    # Vite 构建配置
├── tsconfig.json                     # TypeScript 配置
├── vercel.json                       # Vercel 部署配置
│
└── src/
    ├── main.tsx                      # React 应用入口
    ├── App.tsx                       # 路由配置（核心）
    ├── index.css                     # 全局样式（Tailwind 入口）
    ├── vite-env.d.ts                 # Vite 类型声明
    │
    ├── api/                          # -------- API 层 --------
    │   ├── types/                    #   TypeScript 类型定义
    │   │   ├── index.ts              #     统一导出 + SignalColor / AnalysisDimension
    │   │   ├── stock.ts              #     Stock, StockQuote
    │   │   ├── portfolio.ts          #     Portfolio, PortfolioStock, PortfolioFormData
    │   │   └── analysis.ts           #     AgentAnalysis, Evidence, AnalysisData
    │   │
    │   ├── mock/                     #   Mock 数据生成（内存 CRUD）
    │   │   ├── index.ts              #     统一导出
    │   │   ├── stocks.ts             #     20只A股 mock + 行情生成
    │   │   ├── portfolio.ts          #     组合内存 CRUD（3个预置组合）
    │   │   └── analysis.ts           #     4维度分析数据生成（含证据链）
    │   │
    │   └── services/
    │       └── index.ts              #   API 服务封装（全异步 Promise + delay）
    │
    ├── components/                   # -------- 可复用组件 --------
    │   ├── ui/                       #   通用 UI 组件
    │   │   ├── SignalLight.tsx        #     三色信号灯（脉冲动画）
    │   │   ├── Spinner.tsx            #     加载动画
    │   │   ├── EmptyState.tsx         #     空数据占位
    │   │   ├── Modal.tsx              #     通用弹窗
    │   │   └── ConfirmDialog.tsx      #     确认对话框
    │   │
    │   └── layout/
    │       ├── index.ts              #     统一导出
    │       ├── AppLayout.tsx         #     主应用布局（Sidebar + Outlet）
    │       └── Sidebar.tsx           #     侧边栏导航
    │
    ├── pages/                        # -------- 页面组件 --------
    │   ├── Home/
    │   │   └── index.tsx             #     投资总览（组合概览 + 信号灯矩阵）
    │   ├── Portfolio/
    │   │   ├── index.tsx             #     组合列表页（CRUD）
    │   │   ├── PortfolioDetail.tsx   #     组合详情页（标的管理 + 分析）
    │   │   └── components/
    │   │       ├── PortfolioCard.tsx  #       组合卡片
    │   │       ├── PortfolioForm.tsx  #       创建/编辑表单
    │   │       ├── AddStockForm.tsx   #       添加股票表单
    │   │       ├── StockAnalysisRow.tsx #     股票分析行（展开/收起）
    │   │       ├── AnalysisCard.tsx   #       单维度分析卡片
    │   │       └── EvidenceDrawer.tsx #       证据链侧边面板
    │   └── Research/
    │       └── index.tsx             #     占位页面
    │
    ├── stores/                       # -------- 状态管理 --------
    │   ├── index.ts                  #     统一导出
    │   └── portfolioStore.ts         #     组合状态 Store（CRUD + UI状态）
    │
    ├── prompts/                      # -------- Agent Prompt 版本管理 --------
    │   └── index.ts                  #     4个维度 prompt 模板 + 版本信息
    │
    └── utils/
        └── index.ts                  #     工具函数（cn, formatNumber, delay 等）
```

---

## 4. 架构分层

系统采用经典的前端分层架构，自上而下分为四层：

```
┌─────────────────────────────────────────────────┐
│                   Pages 页面层                    │
│       Home / Portfolio / PortfolioDetail         │
├─────────────────────────────────────────────────┤
│               Components 组件层                   │
│   Layout (AppLayout / Sidebar)                  │
│   UI (SignalLight / Modal / Spinner / ...)       │
├─────────────────────────────────────────────────┤
│              State & Services 层                  │
│    portfolioStore (Zustand)  ←→  API Services   │
├─────────────────────────────────────────────────┤
│                Infrastructure 层                  │
│     Router / Utils / Types / Mock / Prompts     │
└─────────────────────────────────────────────────┘
```

### 4.1 页面层 (Pages)

每个页面是一个独立目录，包含 `index.tsx` 作为入口。页面组件负责：
- 调用 API 获取数据
- 管理页面级 loading/error 状态
- 组合子组件渲染 UI

### 4.2 组件层 (Components)

分为两类：
- **Layout 组件**: `AppLayout`（全局壳层 Sidebar + 内容区）
- **UI 组件**: `SignalLight`（三色信号灯）、`Modal`、`Spinner`、`EmptyState`、`ConfirmDialog`

### 4.3 状态管理层 (Stores)

使用 Zustand 进行轻量级状态管理：

**portfolioStore** — 管理投资组合全生命周期：
- `portfolios`: 组合列表
- `current`: 当前查看的组合详情
- `loading`: 加载状态
- `formOpen` / `editingId`: 表单 UI 状态
- CRUD 方法: `fetchPortfolios`, `createPortfolio`, `updatePortfolio`, `deletePortfolio`
- 标的管理: `addStock`, `removeStock`

### 4.4 API 服务层 (Services)

统一的 `api` 对象按业务域组织，当前全部为 **Mock 模式**：
- 所有方法返回 `Promise`，内部调用 mock 函数 + `delay()` 模拟网络延迟
- 未来替换为真实 API 时零改动（只需修改 services 层实现）

```
api.stock.list()              → 获取股票列表
api.stock.find(query)         → 搜索股票（代码/名称）
api.stock.quote(code)         → 获取实时行情

api.portfolio.list()          → 获取组合列表
api.portfolio.getById(id)     → 获取组合详情
api.portfolio.create(data)    → 创建组合
api.portfolio.update(id,data) → 更新组合
api.portfolio.delete(id)      → 删除组合
api.portfolio.addStock(id,code)    → 添加标的
api.portfolio.removeStock(id,code) → 移除标的

api.analysis.getForStock(code) → 获取4维度AI分析
```

---

## 5. 路由架构

采用 React Router v7 的嵌套路由模式：

```
BrowserRouter
└── AppLayout                              # 全局布局壳层
    ├── /                                  # 投资总览仪表盘
    ├── /portfolio                         # 组合列表（CRUD）
    ├── /portfolio/:id                     # 组合详情（4维度分析）
    ├── /research                          # 标的研究（占位）
    └── *                                  # 重定向到 /
```

---

## 6. 数据流

```
┌──────────┐     调用      ┌──────────────┐     mock      ┌──────────┐
│  Page    │ ──────────→  │  api.xxx()   │ ──────────→   │  Mock    │
│ Component│              │  (services)  │                │  Data    │
└────┬─────┘              └──────────────┘                └──────────┘
     │
     │ zustand store / useState
     ▼
┌──────────┐
│  UI      │
│ Render   │
└──────────┘
```

### 典型数据流（以组合详情页为例）

1. 用户从组合列表点击进入 `/portfolio/p1`
2. `PortfolioDetail` 从 URL 提取 `id`，调用 `portfolioStore.fetchPortfolio(id)`
3. Store 调用 `api.portfolio.getById(id)` 获取组合数据，写入 `current`
4. 页面渲染股票列表，每只股票展示为 `StockAnalysisRow`
5. 用户点击展开某只股票，触发 `api.analysis.getForStock(code)` 获取4维度分析
6. 分析数据渲染为4个 `AnalysisCard`，每个卡片可展开查看详细内容
7. 点击"查看证据链"打开 `EvidenceDrawer` 侧边面板

### 分析数据跟随组件

分析数据不单独放 store，而是在 `StockAnalysisRow` 组件内部通过 `useState` 管理。这样：
- 避免 store 膨胀
- 展开时按需加载
- 组件卸载自动清理

---

## 7. 布局系统

### 整体布局

```
┌──────────────────────────────────────────────┐
│ ┌──────────┐ ┌─────────────────────────────┐ │
│ │          │ │                             │ │
│ │ Sidebar  │ │        Main Content         │ │
│ │  (固定)   │ │        (Outlet)             │ │
│ │  w-56    │ │        max-w-6xl p-6        │ │
│ │          │ │                             │ │
│ │          │ │                             │ │
│ └──────────┘ └─────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

- **Sidebar**: 固定左侧 `w-56`，包含 Logo、导航项、版本信息
- **Main Content**: `flex-1 overflow-y-auto`，内容区最大宽度 `max-w-6xl`

---

## 8. 类型系统

### 核心类型

```typescript
type SignalColor = 'green' | 'red' | 'yellow'
type AnalysisDimension = 'dailySummary' | 'eventPrediction' | 'capitalFlow' | 'riskControl'
```

### 业务类型模块

| 文件 | 核心类型 | 说明 |
|------|---------|------|
| `stock.ts` | `Stock`, `StockQuote` | 股票基础数据 + 行情 |
| `portfolio.ts` | `Portfolio`, `PortfolioStock`, `PortfolioFormData`, `PortfolioListItem`, `DimensionSummary`, `StockAnalysisSummary` | 投资组合全链路 |
| `analysis.ts` | `AgentAnalysis`, `Evidence`, `AnalysisData`, `DailySummaryData`, `EventPredictionData`, `CapitalFlowData`, `RiskControlData` | 4维度分析 + 证据链 |

---

## 9. Agent Prompt 版本管理

每个分析维度对应一个 Prompt 模板，包含版本信息：

```typescript
interface AgentPrompt {
  id: string          // 'daily-summary' | 'event-prediction' | 'capital-flow' | 'risk-control'
  name: string        // 中文名称
  version: string     // 语义化版本号
  description: string // 功能描述
  template: string    // Prompt 模板（含 {{code}} {{name}} 占位符）
}
```

Prompt 版本信息展示在分析报告底部，便于追溯分析结果对应的 Prompt 版本。

---

## 10. 工具函数

`src/utils/index.ts` 提供以下工具：

| 函数 | 签名 | 用途 |
|------|------|------|
| `cn` | `(...inputs: ClassValue[]) => string` | 条件类名合并（clsx + tailwind-merge） |
| `formatNumber` | `(num: number) => string` | 数字格式化（万/亿） |
| `formatPercent` | `(value: number) => string` | 百分比格式化（带正负号） |
| `formatPrice` | `(price: number) => string` | 价格格式化 |
| `getChangeColor` | `(value: number) => string` | 涨跌颜色（红涨绿跌） |
| `delay` | `(ms: number) => Promise<void>` | 延迟函数（mock 用） |
| `randomId` | `() => string` | 随机 ID 生成 |

---

## 11. 构建与部署

### 开发

```bash
pnpm install        # 安装依赖
pnpm dev            # 启动开发服务器 → http://localhost:3000
```

### 构建

```bash
pnpm build          # TypeScript 类型检查 + Vite 生产构建
pnpm preview        # 本地预览生产构建
pnpm lint           # ESLint 代码检查
```

### Vite 配置要点

- **路径别名**: `@` → `./src`
- **插件**: `@vitejs/plugin-react` + `@tailwindcss/vite`
- **开发端口**: 3000

### 部署

通过 Vercel 部署，配置 SPA 路由重写：
- 所有路径 `/(.*) → /index.html`

---

## 12. 设计规范

### 视觉风格

- **主题**: 深色模式为主，`slate` 色系作为基础色
- **强调色**: `amber-500` / `amber-600` 作为主要强调色
- **涨跌色**: 红涨（`red-400`）绿跌（`green-400`），符合 A 股习惯
- **信号灯**: green=利好, red=利空, yellow=中性/需关注，带脉冲动画

### 关键设计决策

1. **三色信号灯**: 贯穿总览页和详情页，快速纵览投资标的状态
2. **Mock 层内存 CRUD**: 数组 + 闭包模拟持久化，刷新重置，原型阶段足够
3. **API 全异步**: 即使 mock 也返回 Promise + delay，未来替换零改动
4. **分析数据跟随组件**: 不单独放 store，通过组件内 useState 按需加载
5. **Prompt 版本管理**: 每个维度独立模板，含 version/name/template，展示在分析报告底部
