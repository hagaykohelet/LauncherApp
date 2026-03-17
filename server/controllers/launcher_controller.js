import supabaseConnect from "../connectionToDB/supabase.js"


export async function getController(req, res) {
    try {
        const { data, error } = await supabaseConnect
            .from("launchers")
            .select()
        if (error) {
            return res.status(400).json({ error: String(error.message) })
        }
        return res.status(200).json({ launchers: data })
    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
}


export async function getById(req, res) {
    try {
        const launchrId = req.params.id
        const { data, error } = await supabaseConnect
            .from("launchers")
            .select()
            .eq("id", launchrId)
        if (error) {
            return res.status(400).json({ error: String(error.message) })
        }
        if (data.length === 0) {
            return res.json({ msg: "this launcher not found" })
        }
        return res.status(200).json({ launcher: data })
    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
}

export async function postNewLauncher(req, res){
     try {
        const newLauncher = req.body
        const { data, error } = await supabaseConnect
            .from('launchers')
            .insert(newLauncher)
            .select()
        if (error) {
            console.log(error.message)
            return res.status(400).json({ error: String(error.message) })
        }
        return res.status(201).json({ data })

    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
}

export async function deleteLauncherById(req, res){
    try {
        const launcerId = req.params.id
        const { data, error } = await supabaseConnect
            .from("launchers")
            .delete()
            .eq("id", launcerId)
            .select()
        if (error) {
            return res.status(400).json({ error: error.message })
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "this id not found!" })
        }
        return res.status(200).json({ message: "deleted successfully" })
    } catch (err) {
        return res.status(400).json({ error: String(err) })
    }
}
