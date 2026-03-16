import { create } from 'zustand'


export const launcherStore = create((set) => ({
    launchers: [],
    setLauncher: async () => {
        const res = await fetch("http://localhost:3000/api/launchers")
        const data = await res.json()
        set({ launchers: data.launchers })
    }
}))