import express from 'express'

const launchersRoute = express()


launchersRoute.get('/launchers', async(req, res)=>{
    return res.send("launchers route")
})