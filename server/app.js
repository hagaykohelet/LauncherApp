import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import supabaseConeect from './connectionToDB/supabase.js'

const PORT =process.env.PORT
const app = express()
app.use(express.json())


app.listen(3000, () => {
    console.log("server running ....")
})

