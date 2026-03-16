import { useEffect } from 'react'
import { useState } from 'react'
import '../style/HomePage.css'
import { useLauncherStore } from '../store/launchersStore'
import { useNavigate } from 'react-router-dom'
function HomePage() {
    const [search, setSearch] = useState(true)
    const navigate = useNavigate()
    const { launchers, setLauncher, getId, filterByType, filterByCity } = useLauncherStore()


    useEffect(() => {
        setLauncher()
    }, [])

    return (
        <div className='home-page'>
            <h1>all launchers page</h1>
            <input type="text" onChange={(e) => { filterByType(e.target.value); setSearch(!search) }} placeholder='search by type' />
            <input type="text" onChange={(e) => { filterByCity(e.target.value); setSearch(!search) }} placeholder='search by city' />
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
                    </tr>
                )}
            </table>
            <button onClick={() => navigate('/add-launcher')}>add new launcher</button>
        </div>
    )
}

export default HomePage
