import { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Bell, Search, User } from 'lucide-react'

import { cn } from '@/utils'
import { useUserStore } from '@/stores/userStore'
import PersonalPanel from './PersonalPanel'

export default function AppLayout() {
  const { isDrawerOpen, openDrawer, closeDrawer } = useUserStore()

  // Drawer ref for outside click handling (if needed, but using overlay for now)
  const drawerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50 text-slate-900">

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-300",
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={closeDrawer}
        />
        <div
          ref={drawerRef}
          className={cn(
            "absolute bottom-0 left-0 right-0 h-[92%] bg-transparent transition-transform duration-300 ease-out",
            isDrawerOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <PersonalPanel />
        </div>
      </div>

      {/* Top Bar (Mobile) */}
      <header className="flex-none sticky top-0 z-40 flex h-14 items-center justify-between px-4 bg-slate-50/80 backdrop-blur-md">
        <button
          onClick={openDrawer}
          className="p-1 -ml-1 text-slate-700 active:bg-slate-200 rounded-full"
        >
          <User className="h-6 w-6" />
        </button>

        <h1 className="text-xl font-serif tracking-tight ml-2">manus</h1>

        <div className="flex items-center gap-3">
          <button className="p-1 text-slate-700 active:bg-slate-200 rounded-full relative">
            <Bell className="h-6 w-6" />
            {/* Notification dot */}
            <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-slate-50" />
          </button>
          <button className="p-1 -mr-1 text-slate-700 active:bg-slate-200 rounded-full">
            <Search className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative no-scrollbar">
        <Outlet />
      </main>

    </div>
  )
}
