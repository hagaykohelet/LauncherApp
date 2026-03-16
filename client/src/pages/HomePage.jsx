import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function HomePage() {
    const [launchers, setLaunchers] = useState([])
    async function getAllLaunchers() {
        const res = await fetch("http://localhost:3000/api/launchers")
        const data = await res.json()
        setLaunchers(data)
    }
    
useEffect(() => {
    getAllLaunchers()
}, [])
console.log(launchers)
    return (
        <div>

        </div>
    )
}

export default HomePage
