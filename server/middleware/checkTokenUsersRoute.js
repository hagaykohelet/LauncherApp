export function checkAdminToken(req, res, next) {
    const user = req.user
    if (user.user_type !== "admin") {
        return res.status(401).json({ auth: "access denied" })
    }
    next()
}

export function checkIntelligenceToken(req, res, next) {
    const user = req.user
    if (user.user_type !== "admin" && user.user_type !== "intelligence") {
        return res.status(401).json({ auth: "access denied" })
    }
    next()
}

export function checkUserType(req, res, next) {
    const user = req.user
    const allowUsers = ["admin", "intelligence", "air force"]
    if (!allowUsers.includes(user.user_type)) {
        return res.status(401).json({ auth: "access denied" })
    }
    next()
}
