import { create } from 'zustand'


export const useLauncherStore = create((set) => ({
    launchers: [],
    id:0,
    getid:(currentId)=>set({id:currentId}),
    setLauncher: async () => {
        const res = await fetch("http://localhost:3000/api/launchers")
        const data = await res.json()
        set({ launchers: data.launchers })
    },
    filterByType:(type)=>set({launchers: state.launchers.filter((item)=>item.rocketType === type)})
    
}))