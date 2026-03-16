import express from 'express'
import supabaseConeect from '../connectionToDB/supabase.js'
import newLauncerCheck from '../middleware/checkNewLauncer.js'
import { deleteLauncherById, getById, getController, postNewLauncher } from '../controllers/launcher_controller.js'

const launchersRoute = express()

launchersRoute.get('/', getController)

launchersRoute.get('/:id', getById)

launchersRoute.post('/',newLauncerCheck,postNewLauncher)

launchersRoute.delete('/:id', deleteLauncherById)

export default launchersRoute