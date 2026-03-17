import express from 'express'
import { createToken, verifyToken } from '../utils/token.js'
import { checkAdminToken } from '../middleware/checkTokenUsersRoute.js'
import { checkNewUserObj, checkUpdateObj, validateLogin } from '../middleware/usersRouteValidation.js'
import supabaseConnect from '../connectionToDB/supabase.js'


const launcherUsersRoute = express()

launcherUsersRoute.post('/register/create', verifyToken, checkAdminToken, checkNewUserObj, async (req, res) => {
    try {
        const newUser = req.body
        const { data, error } = await supabaseConnect
            .from("launchers_users")
            .insert(newUser)
            .select()
            .limit(1)
        if (error) {
            return res.status(400).json({ error })
        }
        return res.status(200).json({ message: "new user added" })
    }
    catch (err) {
        return res.status(400).json({ error: String(err) })
    }
})


launcherUsersRoute.put('/register/update/:id', verifyToken, checkAdminToken, checkUpdateObj, async (req, res) => {
    try {
        const userId = req.params.id
        const updateUser = req.body
        console.log(updateUser)
        const { data, error } = await supabaseConnect
            .from('launchers_users')
            .update(updateUser)
            .eq("id", userId)
            .select()
            .limit(1)
        if (error) {
            return res.status(400).json({ error: error })
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "iser not found" })
        }
        return res.status(201).json({ msg: "user update" })
    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
})




launcherUsersRoute.delete('/register/delete/:id', verifyToken, checkAdminToken, async (req, res) => {
    try {
        const userId = req.params.id
        const { data, error } = await supabaseConnect
            .from("launchers_users")
            .delete()
            .eq("id", userId)
            .select()
            .limit(1)
        if (error) {
            return res.status(400).json({ err: error })
        }
        if (data.length === 0) {
            return res.status(400).json({ msg: "user not found" })
        }
        return res.status(200).json({ msg: `user deleted` })

    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
})



launcherUsersRoute.post('/login', validateLogin, async (req, res) => {
    try {
        const { username, password } = req.body
        const { data, error } = await supabaseConnect
            .from("launchers_users")
            .update({ last_login: new Date().toLocaleString() })
            .eq("username", username)
            .eq("password", password)
            .select()
            .limit(1)
        if (error) {
            return res.status(400).json({ error })
        }
        if (data.length === 0) {
            return res.status(400).json({ msg: `${username} not found` })
        }
        const token = createToken({ username: username, password: password, user_type: data[0].user_type })
        return res.status(200).json({ token: token, user_type: data[0].user_type })
    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
})

launcherUsersRoute.get('/getUser', verifyToken, async (req, res) => {
    try {
        const { username, password, user_type } = req.user
        const { data, error } = await supabaseConnect
            .from("launchers_users")
            .select()
            .eq("username", username)
            .eq("password", password)
            .eq("user_type", user_type)
            .limit(1)
        if (error) {
            return res.status(400).json({ error: error })
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "user not found" })
        }
        return res.status(200).json({username: data[0].username, user_type:data[0].user_type})
    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
})

launcherUsersRoute.get('/getAllUsers', verifyToken, checkAdminToken, async (req, res) => {
    try {
        const { data, error } = await supabaseConnect
            .from("launchers_users")
            .select()
        if (error) {
            return res.status(400).json({ error: error })
        }
        return res.status(200).json({ data })

    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
})


export default launcherUsersRoute