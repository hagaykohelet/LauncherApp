import supabaseConnect from "../connectionToDB/supabase.js"

export async function checkNewUserObj(req, res, next){
    const newUser = req.body
    const allowKeysUser = ["username", "password", "email", "user_type"] 
    const newUserKeys = Object.keys(newUser)
    const newUserValue = Object.values(newUser)
    const allowUserType = ["admin","intelligence","air force"]
    if (!newUser){
        return res.status(400).json({error:"please enter a value"})
    }
    for (let key of allowKeysUser){
        if (!newUserKeys.includes(key)){
            return res.status(400),json({error:"missing keys!"})
        }
    }
    for (let key of newUserValue){
        if (key.trim() === "" || key === null){
            return res.status(400).json({error:`pleawse enter a value`})
        }
    }
    if (!allowUserType.includes(newUser.user_type)){
        return res.status(400).json({error:"this user type not allowed"})
    }
     const { data, err } = await supabaseConnect
            .from("launchers_users")
            .select()
            .eq("user_type", newUser.user_type)
            .limit(1)
        if (data.length > 0){
            return res.status(400).json({msg:"this user type already exist"})
        }

    next()
}


export function validateLogin(req, res, next){
    const user = req.body
    const userKeys = Object.keys(user)
    if (!user){
        return res.status(400).json({msg:"enter a value"})
    }
    if (!userKeys.includes("password") || !userKeys.includes("username")){
        return res.status(400).json({msg:"missing keys"})
    }
    if (!user.password || !user.username){
        return res.status(400).json({msg:"missing value"})
    }
    next()
}


export function checkUpdateObj(req, res, next){
    const updateObj = req.body
    const allowKeys = ["username", "password", "email", "user_type"]
    const updateObjKeys = Object.keys(updateObj)
    const updateObjValue  =Object.values(updateObj)
    if (!updateObj){
        return res.status(400).json({error:"please enter a value"})
    }
    for (let key of updateObjKeys){
        if (!allowKeys.includes(key)){
            return res.status(400).json({error:"missing keys"})
        }
    }
    for (let val of updateObjValue){
        if (val.trim() === ""){
            return res.status(400).json({error:"please enter a value"})
        }
    }
    next()

}