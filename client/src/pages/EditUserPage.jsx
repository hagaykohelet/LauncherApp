import React, { useState } from 'react'
import { useLauncherStore } from '../store/Store'
import Navbar from '../components/Navbar'
import '../style/EditUserPage.css'
function EditUserPage() {
    const token = localStorage.getItem("token")
    const id = useLauncherStore((state) => state.id)
    const [editUser, seteditUser] = useState({})
    const [message, setMessage] = useState(null)


    async function editUserFetch(e) {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:3000/api/auth/register/update/${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json', "Authorization": `Bearer ${token}` },
                    body: JSON.stringify(editUser)
                }
            )
            if (!res.ok) {
                setMessage("fail")
            }
            else {
                const data = await res.json()
                setMessage(data.msg)
            }
        } catch (err) {
            setMessage("fail")
        }
    }



    return (
        <div>
            <Navbar title={`edit user id:${id}`} />
            <div className="edit-user">
                <form onSubmit={editUserFetch}>
                    <input type="text" placeholder='user name' onChange={(e) => seteditUser({ ...editUser, username: e.target.value })} />
                    <input type="text" placeholder='password' onChange={(e) => seteditUser({ ...editUser, password: e.target.value })} />
                    <input type="email" placeholder='email' onChange={(e) => seteditUser({ ...editUser, email: e.target.value })} />
                    <select name="user type" onChange={(e) => seteditUser({ ...editUser, user_type: e.target.value })}>
                        <option value="admin">admin</option>
                        <option value="intelligence">intelligence</option>
                        <option value="air force">air force</option>
                    </select>
                    <button type='submit'>edit</button>
                </form>
                {message && <p>{message}</p>}
            </div>

        </div>
    )
}

export default EditUserPage
