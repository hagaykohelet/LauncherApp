import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import supabaseConeect from './connectionToDB/supabase.js'
import launchersRoute from './routes/launchers.js'

const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/launchers', launchersRoute)

app.listen(3000, () => {
    console.log("server running ....")
})


