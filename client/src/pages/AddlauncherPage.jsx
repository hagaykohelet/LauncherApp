import React from 'react'
import { useState } from 'react'

function AddlauncherPage() {
    const [name, setName] = useState()
    const [rocketType, setRocketType] = useState()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [city, setCity] = useState()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)



    async function postNewLauncher(e) {
        e.preventDefault()

        const res = await fetch("http://localhost:3000/api/launchers", {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                city: city, rocketType: rocketType,
                latitude: latitude, longitude: longitude,
                name: name
            })
        })
        if (!res.ok) {
            setError(true)
        }
        else {
            const data = await res.json()
            setSuccess(true)
        }
    }
    return (
        <div>
            <h1>new launcher</h1>
            <form onSubmit={postNewLauncher}>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder='enter name' />
                <input type="text" onChange={(e) => setCity(e.target.value)} placeholder='enter city' />
                <input type="number" onChange={(e) => setLatitude(e.target.value)} placeholder='enter latitude' />
                <input type="number" onChange={(e) => setLongitude(e.target.value)} placeholder='enter longitude' />
                <select name="rocketType" onChange={(e) => setRocketType(e.target.value)}>
                    <option value="Shahab3">Shahab3</option>
                    <option value="Fetah110">Fetah110</option>
                    <option value="Radwan">Radwan</option>
                    <option value="Kheibar">Kheibar</option>
                </select>

                <button type='submit'>send</button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>new launcher added successfully</p>}
        </div>
    )
}

export default AddlauncherPage
