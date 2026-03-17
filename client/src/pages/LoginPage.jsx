import { useState } from "react"
import '../style/LoginPage.css'
import { useNavigate } from "react-router-dom"
function LoginPage() {
    const [password, setPassword] = useState()
    const [username, setUsername] = useState()
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    async function getToken() {
        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ username: username, password: password })
            }
            )
            if (!res.ok) {
                setError(false)
            }
            else {
                const data = await res.json()
                localStorage.setItem("token", data.token)
                localStorage.setItem("user type", data.user_type)
                navigate('/home')
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="LoginPage">
            <h1>login page</h1>
            <div className="inputs">
                <input type="text" placeholder="please enter your name" onChange={(e) => { setUsername(e.target.value) }} />
                <input type="text" placeholder="please enter your password" onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <button onClick={getToken}>login</button>
        </div>
    )
}

export default LoginPage
