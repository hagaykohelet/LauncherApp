import React from 'react'
import { useLauncherStore } from '../store/launchersStore'
import { useEffect } from 'react'
import { useState } from 'react'

function LauncherDetailsPage() {
    const [launcher, setLauncher] = useState([])
    
    const id = useLauncherStore((state) => state.id)
    async function getLauncherOnId(id) {
        try {
            const res = await fetch(`http://localhost:3000/api/launchers/${id}`)
            if (!res.ok) {
                console.log(res)
            }
            else {
                const data = await res.json()
                setLauncher(data.launcher[0])
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getLauncherOnId(id)
    }, [])
    return (
        <div>
            <h1>detail of launcher {launcher.id}</h1>
            <p>name: {launcher.name}</p>
            <p>city: {launcher.city}</p>
            <p>rocket type: {launcher.rocketType}</p>
            <p>latitiude: {launcher.latitude}</p>
            <p>longitude: {launcher.longitude}</p>
        </div>
    )
}

export default LauncherDetailsPage
