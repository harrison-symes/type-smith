import * as lobbyDb from "../db/lobby"
import { Socket } from "socket.io";

export const joinGame = (socket, room) => {
    socket.join(room)
}

export const joinQueue = (socket : Socket, io) => {
    socket.on("joinQueue", async (user_id) => {
        console.log(user_id, "joined queue")

        try {
            const entry = await lobbyDb.joinQueue(socket.id, user_id)
            io.emit("queueJoined", entry)
            console.log({entry}, socket.id);

            io.to(socket.id).emit("queueJoinedUser")
            socket.addListener("disconnect", async () => {
                const leaveRes = await lobbyDb.leaveQueue(socket.id, user_id)
                console.log("queue left", leaveRes)
            })

        }
        catch (e) {
            throw e
        }
    })
}

export const leaveQueue = (socket : Socket, io) => {
    socket.on("leaveQueue", async user_id => {

        try {
            const success = await lobbyDb.leaveQueue(socket.id, user_id)
            if (success !== null) {
                io.emit("userLeaveQueue", success)
                io.to(socket.id).emit("ownUserLeaveQueue")
            }
        }
        catch (e) {
            console.log(e)
        }
    })
}