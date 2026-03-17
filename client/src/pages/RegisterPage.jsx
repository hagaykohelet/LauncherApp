import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useEffect } from 'react'
import '../style/RegisterPage.css'
import { useLauncherStore } from '../store/Store'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const { users, setUsers, getId } = useLauncherStore()
  const [message, setMessage] = useState(null)
  const [newUser, setnewUser] = useState({
    username: "", password: "",
    email: "",
    user_type: "",
  })

  async function saveUser(e) {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/api/auth/register/create', {
        method: "POST",
        headers: { 'Content-type': 'application/json', "Authorization": `Bearer ${token}` },
        body: JSON.stringify(newUser)

      })
      if (!res.ok) {
        setMessage("fail")
      }
      else {
        const data = await res.json()
        setUsers("http://localhost:3000/api/auth/getAllUsers", token)
        setMessage("new user added")
      }

    } catch (err) {
      setMessage("fail")

    }
  }
  async function deleteUser(id) {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/register/delete/${id}`,
        {

          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        }
      )
      if (!res.ok) {
        console.log(res)
      }
      else {
        setUsers("http://localhost:3000/api/auth/getAllUsers", token)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    setUsers("http://localhost:3000/api/auth/getAllUsers", token)
  }, [])
  return (

    <div>
      <Navbar title={"register new user"} />
      <table>
        <tr>
          <th>ID</th>
          <th>USER NAME</th>
          <th>PASSWORD</th>
          <th>EMAIL</th>
          <th>USER TYPE</th>
          <th>LAST LOGIN</th>
          <th>DELETE</th>
          <th>EDIT</th>
        </tr>
        {users?.map((user, index) =>
          <tr key={index}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>{user.email}</td>
            <td>{user.user_type}</td>
            <td>{user.last_login}</td>
            <td><button onClick={() => { navigate("/editUser"); getId(user.id) }}>edit user</button></td>
            <td><button onClick={() => { deleteUser(user.id) }}>delete user</button></td>
          </tr>
        )}
      </table>
      <div className="new-user">
        <h3>add new user</h3>
        <form onSubmit={saveUser}>
          <input type="text" placeholder='user name' onChange={(e) => setnewUser({ ...newUser, username: e.target.value })} />
          <input type="text" placeholder='password' onChange={(e) => setnewUser({ ...newUser, password: e.target.value })} />
          <input type="email" placeholder='email' onChange={(e) => setnewUser({ ...newUser, email: e.target.value })} />
          <select name="user type" onChange={(e) => setnewUser({ ...newUser, user_type: e.target.value })}>
            <option value="admin" selected>admin</option>
            <option value="intelligence">intelligence</option>
            <option value="air force">air force</option>
          </select>
          <button type='submit'>save new user</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default RegisterPage
