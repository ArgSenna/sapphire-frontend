import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AppLayout } from '@/components/layout'
import HomePage from '@/pages/Home'
import ChatPage from '@/pages/Chat'

import PortfolioPage from '@/pages/Portfolio'
import ResearchPage from '@/pages/Research'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/features/portfolio" element={<PortfolioPage />} />
          <Route path="/features/research-reports" element={<ResearchPage />} />
          {/* Other feature routes... */}
        </Route>

        {/* Chat Routes (Full Screen, outside AppLayout) */}
        <Route path="/chat/new" element={<ChatPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
