import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const PORT =process.env.PORT
const app = express()
app.use(express.json())



app.listen(3000, () => {
    console.log("server running ....")
})

