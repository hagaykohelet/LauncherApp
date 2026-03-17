import React from 'react'
import { useLauncherStore } from '../store/Store'
import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'

function LauncherDetailsPage() {
    const [launcher, setLauncher] = useState([])
    const token = localStorage.getItem("token")
    const id = useLauncherStore((state) => state.id)
    async function getLauncherOnId(id) {
        try {
            const res = await fetch(`http://localhost:3000/api/launchers/${id}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            }
            )
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
            <Navbar title={`detail of launcher ${launcher.id}`}/>
            <p>name: {launcher.name}</p>
            <p>city: {launcher.city}</p>
            <p>rocket type: {launcher.rocketType}</p>
            <p>latitiude: {launcher.latitude}</p>
            <p>longitude: {launcher.longitude}</p>
        </div>
    )
}

export default LauncherDetailsPage
