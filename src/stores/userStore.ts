import { create } from 'zustand'

interface UserState {
  user: {
    name: string
    email: string
    avatar: string
    points: number // Keeping points in store but won't display if not needed
  }
  isDrawerOpen: boolean
  toggleDrawer: () => void
  closeDrawer: () => void
  openDrawer: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: '胡川', // Mock user from screenshot
    email: 'chuan.hu@smyze.cn',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', // Mock avatar
    points: 96,
  },
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  closeDrawer: () => set({ isDrawerOpen: false }),
  openDrawer: () => set({ isDrawerOpen: true }),
}))
