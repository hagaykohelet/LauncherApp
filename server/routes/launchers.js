import express from 'express'
import newLauncerCheck from '../middleware/checkNewLauncer.js'
import { deleteLauncherById, getById, getController, postNewLauncher } from '../controllers/launcher_controller.js'
import { verifyToken } from '../utils/token.js'
import { checkIntelligenceToken, checkUserType } from '../middleware/checkTokenUsersRoute.js'

const launchersRoute = express()

launchersRoute.get('/', verifyToken, checkUserType , getController)

launchersRoute.get('/:id', verifyToken, checkUserType,getById)

launchersRoute.post('/',verifyToken,newLauncerCheck,checkIntelligenceToken,postNewLauncher)

launchersRoute.delete('/:id', verifyToken,checkIntelligenceToken,deleteLauncherById)

export default launchersRoute