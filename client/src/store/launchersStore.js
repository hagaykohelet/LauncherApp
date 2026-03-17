import { create } from 'zustand'


export const useLauncherStore = create((set) => ({
    launchers: [],
    id: 0,
    token:null,
    setToken:(t)=>set({token:t}),
    getId: (currentId) => set({ id: currentId }),
    setLauncher: async (token) => {
        const res = await fetch("http://localhost:3000/api/launchers", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }
        )
        const data = await res.json()
        set({ launchers: data.launchers })
    },
    filterByType: (type) => set((state) => ({ launchers: state.launchers.filter((item) => item.rocketType.includes(type)) })),
    filterByCity: (city) => set((state) => ({ launchers: state.launchers.filter((item) => item.city.includes(city)) }))

}))