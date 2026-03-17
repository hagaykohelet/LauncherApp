import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useEffect } from 'react'
import '../style/RegisterPage.css'
import { useLauncherStore } from '../store/Store'

function RegisterPage() {
  const token = localStorage.getItem("token")
  const {users,setUsers} = useLauncherStore()
  const [message, setMessage] = useState(null)
  const [newUser, setnewUser] = useState({username:"",password:"",
    email:"",
    user_type:"",
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
        setMessage("agent added successfully")
        setUsers("http://localhost:3000/api/auth/getAllUsers",token)
      }

    } catch (err) {
    setMessage("fail")

    }
  }


  useEffect(() => {
    setUsers("http://localhost:3000/api/auth/getAllUsers",token)
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
        {users?.map((item, index) =>
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.username}</td>
            <td>{item.password}</td>
            <td>{item.email}</td>
            <td>{item.user_type}</td>
            <td>{item.last_login}</td>
            <td><button >edit user</button></td>
            <td><button >delete user</button></td>
          </tr>
        )}
      </table>
      <div className="new-user">
        <h3>add new user</h3>
        <form onSubmit={saveUser}>
          <input type="text" placeholder='user name' onChange={(e) => setnewUser({...newUser,username:e.target.value})} />
          <input type="text" placeholder='password' onChange={(e) => setnewUser({...newUser,password:e.target.value})} />
          <input type="email" placeholder='email' onChange={(e) => setnewUser({...newUser,email:e.target.value})} />
          <input type="text" placeholder='user type' onChange={(e) => setnewUser({...newUser,user_type:e.target.value})} />
          <button type='submit'>save new user</button>
        </form>
        {message &&<p>{message}</p>}
      </div>
    </div>
  )
}

export default RegisterPage
