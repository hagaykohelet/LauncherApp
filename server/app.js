import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import launchersRoute from './routes/launchers.js'
import launcherUsersRoute from './routes/launcherUsers.js'

const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/launchers', launchersRoute)
app.use('/api/auth', launcherUsersRoute)


app.listen(3000, () => {
    console.log("server running ....")
})


