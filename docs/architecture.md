# 投资标的研究系统 - 前端架构文档

> **版本**: v0.4.0 Beta
> **最后更新**: 2026-02-14
> **技术栈**: Vite + React 18 + TypeScript + Tailwind CSS 4 + ECharts + Zustand

---

## 1. 系统概述

本项目是 **AI赋能投资决策系统** 的前端应用，采用 AI 对话式交互为核心入口，提供投资组合管理、AI 多维度分析与标的深度研究功能。系统核心围绕"AI对话 → 投资洞察"、"组合管理 → 4维度AI分析 → 信号灯决策"和"标的研究 → 要素分析 → 5档推荐等级"三条工作流。

以移动端为核心使用场景，采用浅色主题。

### 核心能力

| 模块 | 功能 | 路由 | 状态 |
|------|------|------|------|
| 首页（会话列表） | AI 对话会话列表，筛选标签，新建对话入口 | `/` | ✅ 已实现 |
| AI 对话 | 全屏聊天界面，模型选择，消息收发 | `/chat/new`, `/chat/:id` | ✅ 已实现（UI 框架） |
| 投资组合管理 | 组合 CRUD、标的管理、4维度AI分析 | `/features/portfolio`, `/features/portfolio/:id` | ✅ 已实现 |
| 标的研究 | 三种研报类型（投资/服务/创新），要素分析 + AI反方意见 + 5档推荐等级 | `/features/research-reports`, `/features/research-reports/:id` | ✅ 已实现 |
| 定时任务 | 定时任务管理（占位） | `/features/scheduled-tasks` | 🔲 占位 |
| 知识 | 知识管理（占位） | `/features/knowledge` | 🔲 占位 |
| 技能 | 技能管理（占位） | `/features/skills` | 🔲 占位 |
| 个人面板 | 底部抽屉式用户面板，内嵌子视图导航 | 组件内路由 | ✅ 已实现 |

### 4维度 AI 分析体系

每只股票从以下4个维度进行 Agent 分析，每个维度输出三色信号灯结论：

| 维度 | 分析内容 | 信号含义 |
|------|---------|---------|
| 每日信息汇总 | 行情走势、重要新闻、市场情绪 | green=积极 / red=低迷 / yellow=震荡 |
| 重大事件预测 | 未来事件概率、影响方向、时间窗口 | green=正面催化 / red=负面风险 / yellow=中性 |
| 资金流分析 | 主力资金、北向资金、机构持仓 | green=流入 / red=流出 / yellow=中性 |
| 风险控制 | 风险等级、止损止盈、预警信号 | green=可控 / red=偏高 / yellow=需关注 |

### 标的研究 — 5档推荐等级体系

标的研究模块使用券商研报5档推荐等级替代信号灯体系，支持三种研报类型（投资/服务/创新），每种包含分析要素 + AI反方意见 + 研究员补充。

| 等级 | Rating 值 | 颜色 | 含义 |
|------|----------|------|------|
| 强烈推荐 | `strongBuy` | `red-500` | 强烈看好 |
| 推荐 | `buy` | `orange-400` | 看好 |
| 中性 | `neutral` | `slate-400` | 观望 |
| 减持 | `reduce` | `teal-400` | 谨慎 |
| 卖出 | `sell` | `green-500` | 看空 |

三种研报类型各有不同的要素标题：
- **投资研究**: 行业空间、核心竞争力、财务健康度、竞争格局、关键经营指标、估值水平、催化剂与风险
- **服务研究**: 服务市场规模、服务差异化、收入模式、竞争对标、客户满意度KPI、扩张能力、监管环境
- **创新研究**: 技术创新能力、专利布局、产品管线、竞争技术路线、研发效率KPI、市场接受度、技术迭代风险

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
| echarts-for-react | 3.0.2 | ECharts React 封装 |
| Lucide React | 0.564.x | 图标库 |
| clsx | 2.1.1 | 条件类名合并 |
| tailwind-merge | 2.6.x | Tailwind 类名去重合并 |
| uuid | 13.x | UUID 生成 |

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
    ├── index.css                     # 全局样式（Tailwind 入口 + 自定义滚动条）
    ├── vite-env.d.ts                 # Vite 类型声明
    │
    ├── api/                          # -------- API 层 --------
    │   ├── types/                    #   TypeScript 类型定义
    │   │   ├── index.ts              #     统一导出 + SignalColor / AnalysisDimension / dimensionLabels / signalLabels
    │   │   ├── stock.ts              #     Stock, StockQuote
    │   │   ├── portfolio.ts          #     Portfolio, PortfolioStock, PortfolioFormData, PortfolioListItem, DimensionSummary, StockAnalysisSummary
    │   │   ├── analysis.ts           #     AgentAnalysis, Evidence, AnalysisData, DailySummaryData, EventPredictionData, CapitalFlowData, RiskControlData
    │   │   └── research.ts           #     ResearchType, Rating, ResearchReport, ResearchElement, ResearchCounterArgument, ResearcherNote
    │   │
    │   ├── mock/                     #   Mock 数据生成（内存 CRUD）
    │   │   ├── index.ts              #     统一导出
    │   │   ├── stocks.ts             #     20只A股 mock + 行情生成
    │   │   ├── portfolio.ts          #     组合内存 CRUD（3个预置组合）
    │   │   ├── analysis.ts           #     4维度分析数据生成（含证据链）
    │   │   ├── research.ts           #     研究报告内存 CRUD（3个预置报告）
    │   │   └── investmentData.ts     #     投资驱动型研究固定要素数据（紫金矿业 601899 完整研究报告数据）
    │   │
    │   └── services/
    │       └── index.ts              #   API 服务封装（全异步 Promise + delay）
    │
    ├── components/                   # -------- 可复用组件 --------
    │   ├── SessionItem.tsx           #   会话列表项（图标 + 标题 + 时间 + 状态）
    │   │
    │   ├── ui/                       #   通用 UI 组件
    │   │   ├── SignalLight.tsx        #     三色信号灯（脉冲动画）
    │   │   ├── Spinner.tsx            #     加载动画
    │   │   ├── EmptyState.tsx         #     空数据占位
    │   │   ├── Modal.tsx              #     通用弹窗
    │   │   └── ConfirmDialog.tsx      #     确认对话框
    │   │
    │   └── layout/
    │       ├── index.ts              #     统一导出（AppLayout, PersonalPanel）
    │       ├── AppLayout.tsx         #     主应用布局（顶部栏 + 内容区 + 底部抽屉面板）
    │       └── PersonalPanel.tsx     #     个人面板（底部抽屉，内嵌子视图导航，含投资组合/投研报告/定时任务等子面板）
    │
    ├── pages/                        # -------- 页面组件 --------
    │   ├── Home/
    │   │   └── index.tsx             #     首页（AI 会话列表 + 筛选标签 + FAB 新建对话）
    │   ├── Chat/
    │   │   ├── index.tsx             #     全屏聊天页面（消息列表 + 输入框）
    │   │   ├── ChatHeader.tsx        #     聊天头部（返回按钮 + 模型选择下拉）
    │   │   ├── ChatInput.tsx         #     聊天输入框（附件 + 插件 + 文本输入 + 语音 + 发送）
    │   │   └── MessageBubble.tsx     #     消息气泡（用户/AI 双向样式）
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
    │   ├── Research/
    │   │   ├── index.tsx             #     研究报告列表页（CRUD + 新建弹窗）
    │   │   ├── ResearchDetail.tsx    #     研究报告详情页（要素 + 反方意见）
    │   │   └── components/
    │   │       ├── RatingBadge.tsx    #       5档推荐等级徽章
    │   │       ├── ResearchCard.tsx   #       报告列表卡片
    │   │       ├── ResearchElementCard.tsx #  要素分析卡片（默认展开，证据链入口内联）
    │   │       └── CreateResearchModal.tsx # 新建研究弹窗
    │   ├── Features/
    │   │   ├── DailyAnalysis.tsx     #     每日分析页面（静态展示）
    │   │   └── ResearchReports.tsx   #     投研报告文件列表页面（静态展示）
    │   └── Placeholder/
    │       └── index.tsx             #     占位页面（定时任务/知识/技能）
    │
    ├── stores/                       # -------- 状态管理 --------
    │   ├── index.ts                  #     统一导出（usePortfolioStore）
    │   ├── portfolioStore.ts         #     组合状态 Store（CRUD + UI状态）
    │   ├── chatStore.ts              #     聊天 Store（会话列表 + 消息管理）
    │   └── userStore.ts              #     用户 Store（用户信息 + 抽屉开关状态）
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
┌─────────────────────────────────────────────────────┐
│                    Pages 页面层                       │
│  Home / Chat / Portfolio / Research / Placeholder    │
├─────────────────────────────────────────────────────┤
│                Components 组件层                      │
│   Layout (AppLayout / PersonalPanel)                │
│   UI (SignalLight / Modal / Spinner / ...)           │
│   Shared (SessionItem)                              │
├─────────────────────────────────────────────────────┤
│              State & Services 层                      │
│  portfolioStore / chatStore / userStore ←→ API Svc  │
├─────────────────────────────────────────────────────┤
│                Infrastructure 层                      │
│     Router / Utils / Types / Mock / Prompts         │
└─────────────────────────────────────────────────────┘
```

### 4.1 页面层 (Pages)

每个页面是一个独立目录，包含 `index.tsx` 作为入口。页面组件负责：
- 调用 API 获取数据
- 管理页面级 loading/error 状态
- 组合子组件渲染 UI

Chat 页面独立于 AppLayout 之外，采用全屏布局。

### 4.2 组件层 (Components)

分为三类：
- **Layout 组件**: `AppLayout`（移动端顶部栏 + Outlet + 底部抽屉面板）、`PersonalPanel`（个人面板，内嵌多层子视图导航）
- **UI 组件**: `SignalLight`（三色信号灯）、`Modal`、`Spinner`、`EmptyState`、`ConfirmDialog`
- **Shared 组件**: `SessionItem`（会话列表项，首页使用）

### 4.3 状态管理层 (Stores)

使用 Zustand 进行轻量级状态管理，共 3 个 Store：

**portfolioStore** — 管理投资组合全生命周期：
- `portfolios`: 组合列表
- `current`: 当前查看的组合详情
- `loading`: 加载状态
- `formOpen` / `editingId`: 表单 UI 状态
- CRUD 方法: `fetchPortfolios`, `fetchPortfolio`, `createPortfolio`, `updatePortfolio`, `deletePortfolio`
- 标的管理: `addStock`, `removeStock`
- 表单控制: `openForm`, `closeForm`

**chatStore** — 管理 AI 对话：
- `sessions`: 会话列表（含 mock 数据）
- `currentSessionId`: 当前会话 ID
- `messages`: 按 sessionId 索引的消息记录
- 方法: `addSession`, `addMessage`, `setCurrentSession`

**userStore** — 管理用户信息与 UI 状态：
- `user`: 用户信息（name, email, avatar, points）
- `isDrawerOpen`: 个人面板抽屉开关状态
- 方法: `toggleDrawer`, `openDrawer`, `closeDrawer`

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

api.research.list()            → 获取研究报告列表
api.research.getById(id)       → 获取报告详情
api.research.create(code,type) → 创建研究报告（投资/服务/创新）
api.research.delete(id)        → 删除报告
```

---

## 5. 路由架构

采用 React Router v7 的嵌套路由模式，分为两层：

```
BrowserRouter
├── AppLayout                              # 主布局壳层（顶部栏 + 底部抽屉面板）
│   ├── /                                  # 首页（AI 会话列表）
│   ├── /features/portfolio                # 组合列表（CRUD）
│   ├── /features/portfolio/:id            # 组合详情（4维度分析）
│   ├── /features/research-reports         # 研究报告列表（CRUD）
│   ├── /features/research-reports/:id     # 研究报告详情（要素分析）
│   ├── /features/scheduled-tasks          # 定时任务（占位）
│   ├── /features/knowledge                # 知识（占位）
│   └── /features/skills                   # 技能（占位）
│
├── /chat/new                              # 新建对话（全屏，不含 AppLayout）
├── /chat/:id                              # 对话详情（全屏，不含 AppLayout）
│
└── *                                      # 重定向到 /
```

**注意**: Chat 路由独立于 AppLayout 之外，采用全屏布局，不包含顶部栏和抽屉面板。

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

### 典型数据流（以首页为例）

1. `HomePage` 渲染时从 `chatStore` 获取 `sessions` 列表
2. 每个会话渲染为 `SessionItem` 组件
3. 用户点击会话，导航到 `/chat/:id`
4. 用户点击 FAB 按钮，导航到 `/chat/new`

### 典型数据流（以组合详情为例）

1. 用户在个人面板中选择投资组合，进入组合详情子视图
2. `PortfolioDetailView` 调用 `portfolioStore.fetchPortfolio(id)`
3. Store 调用 `api.portfolio.getById(id)` 获取组合数据，写入 `current`
4. 页面渲染股票列表，每只股票展示为 `StockAnalysisRow`（默认全部展开）
5. 用户点击展开某只股票，触发 `api.analysis.getForStock(code)` 获取4维度分析
6. 分析数据渲染为4个 `AnalysisCard`，每个卡片可展开查看详细内容
7. 点击"查看证据链"打开 `EvidenceDrawer` 侧边面板

### 典型数据流（以标的研究为例）

1. 用户在个人面板中选择投研报告，进入研究列表子视图
2. 点击"新建研究"，弹出 `CreateResearchModal`
3. 搜索选股 + 选择报告类型（投资/服务/创新）
4. 调用 `api.research.create(stockCode, type)` 生成报告
5. 生成完成后导航到研究详情子视图
6. 渲染报告头部（股票信息 + 类型标签 + 总推荐等级）+ 总体结论
7. 要素渲染为 `ResearchElementCard`，默认展开展示完整 AI 分析内容
8. 证据链入口以内联方式紧跟在 AI 内容后展示
9. AI反方意见区块遵循同样规则（默认展开 + 内联证据链入口）

### 分析数据跟随组件

分析数据不单独放 store，而是在 `StockAnalysisRow` 组件内部通过 `useState` 管理。这样：
- 避免 store 膨胀
- 展开时按需加载
- 组件卸载自动清理

---

## 7. 布局系统

### 整体布局（移动端优先）

```
┌──────────────────────────────────────────────┐
│ ┌──────────────────────────────────────────┐ │
│ │  Top Bar (h-14)                          │ │
│ │  [User] keywisus       [Bell] [Search]   │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │                                          │ │
│ │          Main Content (Outlet)           │ │
│ │          flex-1 overflow-y-auto          │ │
│ │                                          │ │
│ │                                          │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘

         ↓ 点击用户头像触发底部抽屉 ↓

┌──────────────────────────────────────────────┐
│  ████████████ Overlay (bg-black/30) ████████ │
│ ┌──────────────────────────────────────────┐ │
│ │  ─── (Drag Handle)                       │ │
│ │                                          │ │
│ │       PersonalPanel (h-[92%])            │ │
│ │       底部弹出，圆角顶部                    │ │
│ │       内含子视图导航（viewStack）            │ │
│ │       支持拖拽关闭                          │ │
│ │                                          │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

- **Top Bar**: 固定顶部 `h-14`，包含用户按钮、品牌名 "keywisus"、通知铃铛、搜索
- **Main Content**: `flex-1 overflow-y-auto`，渲染 React Router Outlet
- **PersonalPanel**: 底部抽屉面板，占屏幕 92% 高度，圆角顶部，支持触摸拖拽关闭

### Chat 页面布局（全屏）

```
┌──────────────────────────────────────────────┐
│ ┌──────────────────────────────────────────┐ │
│ │  [←]    Model Selector ▼     [⋯]        │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │                                          │ │
│ │         Messages Scroll Area             │ │
│ │                                          │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │  [+] [⚡]  Message Input...    [🎤] [↑]  │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

### PersonalPanel 子视图导航

PersonalPanel 内部实现了栈式导航（`viewStack`），支持以下子视图：

| ViewType | 标题 | 功能 |
|----------|------|------|
| `main` | — | 用户信息 + 菜单列表 |
| `portfolio` | 投资组合 | 组合列表（CRUD），支持新建 |
| `portfolio-detail` | 组合详情 | 组合内股票分析行 |
| `research` | 投研报告 | 研究报告列表（CRUD），支持新建 |
| `research-detail` | 研究报告 | 要素分析 + 反方意见 + 证据链 |
| `scheduled-tasks` | 定时任务 | 占位（已定时/已完成标签切换） |
| `knowledge` | 知识 | 占位 |
| `skills` | 技能 | 占位 |

---

## 8. 类型系统

### 核心类型

```typescript
type SignalColor = 'green' | 'red' | 'yellow'
type AnalysisDimension = 'dailySummary' | 'eventPrediction' | 'capitalFlow' | 'riskControl'
type ResearchType = 'investment' | 'service' | 'innovation'
type Rating = 'strongBuy' | 'buy' | 'neutral' | 'reduce' | 'sell'
```

### 业务类型模块

| 文件 | 核心类型 | 说明 |
|------|---------|------|
| `stock.ts` | `Stock`, `StockQuote` | 股票基础数据 + 行情 |
| `portfolio.ts` | `Portfolio`, `PortfolioStock`, `PortfolioFormData`, `PortfolioListItem`, `DimensionSummary`, `StockAnalysisSummary` | 投资组合全链路 |
| `analysis.ts` | `AgentAnalysis`, `Evidence`, `AnalysisData`, `DailySummaryData`, `EventPredictionData`, `CapitalFlowData`, `RiskControlData` | 4维度分析 + 证据链 |
| `research.ts` | `ResearchType`, `Rating`, `ResearchReport`, `ResearchElement`, `ResearchCounterArgument`, `ResearcherNote` | 标的研究报告 + 5档推荐等级 |

### Chat 相关类型（chatStore 内定义）

```typescript
interface Session {
  id: string
  title: string
  lastMessage: string
  timestamp: number
  status: 'completed' | 'running' | 'failed'
  type: 'analysis' | 'chat' | 'report' | 'coding'
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  attachments?: string[]
}
```

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

Prompt 版本信息仅用于内部追溯与调试，不在研究报告页面展示给研究员。

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

- **主题**: 浅色模式为主，`slate-50` 作为背景色，`slate` 色系作为基础色
- **强调色**: `amber-500` / `amber-600` 作为主要强调色
- **涨跌色**: 红涨（`red-400`）绿跌（`green-400`），符合 A 股习惯
- **信号灯**: green=利好, red=利空, yellow=中性/需关注，带脉冲动画
- **图标**: 统一使用 Lucide React 图标库

### 移动端适配

- 底部安全区域: `env(safe-area-inset-bottom)` 适配全面屏
- 触摸交互: `active:` 状态反馈，`active:scale-95` 按钮缩放
- 隐藏滚动条: `.no-scrollbar` 类
- PersonalPanel 支持触摸拖拽关闭（threshold 150px）

### 关键设计决策

1. **AI 对话优先**: 首页为 AI 会话列表，投资工具通过个人面板二级入口访问
2. **底部抽屉式个人面板**: 取代传统 Sidebar，移动端体验更自然，支持栈式子视图导航
3. **Chat 全屏布局**: 对话页面独立于主布局，沉浸式体验
4. **三色信号灯**: 贯穿组合管理和详情页，快速纵览投资标的状态
5. **Mock 层内存 CRUD**: 数组 + 闭包模拟持久化，刷新重置，原型阶段足够
6. **API 全异步**: 即使 mock 也返回 Promise + delay，未来替换零改动
7. **分析数据跟随组件**: 不单独放 store，通过组件内 useState 按需加载
8. **Prompt 版本管理**: 每个维度独立模板，含 version/name/template，用于内部追溯，不在研究报告页面展示
9. **研究报告5档推荐等级**: 使用券商研报等级体系（强烈推荐/推荐/中性/减持/卖出）替代信号灯，更贴合投研场景
10. **研究报告默认全展开**: 要素与反方意见默认展开，标题不展示摘要，重点信息直接在内容区完整呈现
11. **证据链入口内联**: 证据链入口紧跟 AI 内容末尾展示，减少视觉跳跃和额外区块干扰
12. **研究数据跟随页面组件**: 研究报告数据通过页面级 `useState` 管理，不使用全局 store，保持简洁
13. **固定投资研究数据**: `investmentData.ts` 包含紫金矿业完整的投资驱动型研究数据（5个要素 + 反方意见 + 研究员笔记），作为标准研究报告的参考模板
