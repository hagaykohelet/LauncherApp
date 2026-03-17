import { create } from 'zustand'


export const useLauncherStore = create((set) => ({
    launchers: [],
    id: 0,
    users:[],
    getId: (currentId) => set({ id: currentId }),
    setLauncher: async (url, token) => {
        const res = await fetch(url, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }
        )
        const data = await res.json()
        set({ launchers: data.launchers })
    },
    filterByType: (type) => set((state) => ({ launchers: state.launchers.filter((item) => item.rocketType.includes(type)) })),
    filterByCity: (city) => set((state) => ({ launchers: state.launchers.filter((item) => item.city.includes(city)) })),
    setUsers: async (url, token) => {
        const res = await fetch(url, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }
        )
        const data = await res.json()
        set({ users: data.data })
    },

}))