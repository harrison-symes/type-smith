import * as lobbySocket from "./lobby"
import * as lobbyDb from "../db/lobby"
import * as gameRequestsSocket from "./gameRequest"

export const connection = (io, socket) => {
    console.log("User connected")
    socket.on("disconnect", () => disconnection(socket))
    lobbySocket.joinLobby(socket, io)
    lobbySocket.leaveLobby(socket, io)
    gameRequestsSocket.gameRequests(socket, io)
}

export const disconnection = async socket => {
    console.log("user disconnected")

    // console.log({leaveRes})
    const leaveRes = await lobbyDb.leaveLobby(socket.id, 0)
}





// for rooms
// socket.join("some room")
// socket.leave("some room")

//emit to single user
// io.to(socket.id).emit("message")