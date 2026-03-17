import { useEffect } from 'react'
import { useState } from 'react'
import '../style/HomePage.css'
import { useLauncherStore } from '../store/Store'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
function HomePage() {

    const navigate = useNavigate()
    const { launchers, setLauncher, getId,  filterByType, filterByCity } = useLauncherStore()
    const token = localStorage.getItem("token")
    async function deleteLauncher(id) {
        try {
            const res = await fetch(`http://localhost:3000/api/launchers/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            console.log(res)
            if (!res.ok) {
                console.log(res)
            }
            else {
                const data = await res.json()
                setLauncher("http://localhost:3000/api/launchers",token)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setLauncher("http://localhost:3000/api/launchers",token)
    }, [])
    return (
        <div className='home-page'>
            <Navbar title="launchers page"/>
            <input type="text" onChange={(e) => { filterByType(e.target.value) }} placeholder='search by type' />
            <input type="text" onChange={(e) => { filterByCity(e.target.value) }} placeholder='search by city' />
            <button onClick={() => navigate('/add-launcher')}>add new launcher</button>
            <button onClick={()=>{setLauncher(token)}}>show all</button>
            <table>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>CITY</th>
                    <th>ROCKET TYPE</th>
                    <th>LATITUDE</th>
                    <th>LONGITUDE</th>
                    <th>show details</th>
                </tr>
                {launchers?.map((item, index) =>
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.city}</td>
                        <td>{item.rocketType}</td>
                        <td>{item.latitude}</td>
                        <td>{item.longitude}</td>
                        <td><button onClick={() => { navigate('/launcher-details'); getId(item.id) }}>click here</button></td>
                        <td><button onClick={() => { deleteLauncher(item.id) }}>delete launcher</button></td>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default HomePage
