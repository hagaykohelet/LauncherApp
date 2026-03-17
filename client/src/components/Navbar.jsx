import { useNavigate } from 'react-router-dom'
import '../style/Navbar.css'

function Navbar({ title }) {
    const user_type = localStorage.getItem("user type")
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    async function getCurrentUser() {
        try {
            const res = await fetch("http://localhost:3000/api/auth/getUser",
                { headers: { "Authorization": `Bearer ${token}` } }
            )
            if (!res.ok){
                console.log(res)
            }
            else{
                const data = await res.json()
                window.alert(`username: ${data.username} type of user: ${data.user_type}`)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='nav'>
            {user_type == "admin" && <button onClick={()=>navigate('/registerNewUser')}>register page</button>}
            <button onClick={()=>navigate('/')}>login page</button>
            <h1>{title}</h1>
            <button onClick={getCurrentUser}>get current user info</button>
            <button onClick={() => { localStorage.clear(); navigate('/') }}>logout</button>

        </div>
    )
}

export default Navbar
