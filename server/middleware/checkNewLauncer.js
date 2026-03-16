export default function newLauncerCheck(req, res, next) {
    const newLauncher = req.body
    const allowKeys = ["city", "rocketType", "latitude", "longitude", "name"]
    const newLauncherKeys = Object.keys(newLauncher)
    const allowRocketType = ["Shahab3", "Fetah110", "Radwan", "Kheibar"]
    if (!newLauncher) {
        return res.status(400).json({ msg: "you need enter new launcher" })
    }
    for (let key of newLauncherKeys) {
        if (!(allowKeys.includes(key))) {
            return res.status(401).json({ msg: `${key} not allow` })
        }
    }
    if (typeof newLauncher.city !== "string" || typeof newLauncher.name !== "string") {
        return res.status(401).json({ msg: "the type of keys not allowed" })
    }
    if (!newLauncher.city || !newLauncher.rocketType || !newLauncher.latitude || !newLauncher.longitude || !newLauncher.name
        || newLauncher.city.trim() === "" || newLauncher.rocketType.trim() === "" || newLauncher.name.trim() === ""
    ) {
        return res.status(401).json({ msg: "please enter a value" })
    }
    if (!(allowRocketType.includes(newLauncher.rocketType))) {
        return res.status(401).json({ msg: "this rocket type not valid!" })
    }
    return next()

} 