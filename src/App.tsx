import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AppLayout } from '@/components/layout'
import HomePage from '@/pages/Home'
import ChatPage from '@/pages/Chat'

import PortfolioPage from '@/pages/Portfolio'
import PortfolioDetail from '@/pages/Portfolio/PortfolioDetail'
import ResearchPage from '@/pages/Research'
import ResearchDetail from '@/pages/Research/ResearchDetail'
import PlaceholderPage from '@/pages/Placeholder'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/features/portfolio" element={<PortfolioPage />} />
          <Route path="/features/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/features/research-reports" element={<ResearchPage />} />
          <Route path="/features/research-reports/:id" element={<ResearchDetail />} />
          <Route path="/features/scheduled-tasks" element={<PlaceholderPage />} />
          <Route path="/features/knowledge" element={<PlaceholderPage />} />
          <Route path="/features/skills" element={<PlaceholderPage />} />
        </Route>

        {/* Chat Routes (Full Screen, outside AppLayout) */}
        <Route path="/chat/new" element={<ChatPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
