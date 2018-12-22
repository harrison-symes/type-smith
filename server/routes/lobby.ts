import * as express from "express"
import * as lobbyDb from "../db/lobby"
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const queue = await lobbyDb.getQueueList()
        res.json(queue)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


export default router