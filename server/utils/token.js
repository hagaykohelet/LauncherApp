import jwt from "jsonwebtoken"
import 'dotenv/config'

const secretKey = process.env.SECRET_KEY

export function createToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: "10h" })
}


export function verifyToken(req, res, next) {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({ authorization: "access denied" })
    const token  = auth.split(' ')[1]
    jwt.verify(token, secretKey, (err, user)=>{
        if (err){
            return res.status(401).json({err})
        }
        req.user = user
        next()
    })
}
