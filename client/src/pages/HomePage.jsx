import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import '../style/HomePage.css'
function HomePage() {
    const [launchers, setLaunchers] = useState([])
    async function getAllLaunchers() {
        const res = await fetch("http://localhost:3000/api/launchers")
        const data = await res.json()
        setLaunchers(data.launchers)
    }

    useEffect(() => {
        getAllLaunchers()
    }, [])
    return (
        <div className='home-page'>
            <h1>all launchers page</h1>
            <table>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>CITY</th>
                    <th>ROCKET TYPE</th>
                    <th>LATITUDE</th>
                    <th>LONGITUDE</th>
                </tr>
                {launchers?.map((item, index)=>
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.city}</td>
                    <td>{item.rocketType}</td>
                    <td>{item.latitude}</td>
                    <td>{item.longitude}</td>
                </tr>
                )}
            </table>

        </div>
    )
}

export default HomePage
