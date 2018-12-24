import * as express from "express"
import * as lobbyDb from "../db/lobby"
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const Lobby = await lobbyDb.getLobbyList()
        res.json(Lobby)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


export default router