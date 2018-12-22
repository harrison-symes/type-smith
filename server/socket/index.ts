import * as lobbySocket from "./lobby"

export const connection = (io, socket) => {
    console.log("User connected")
    socket.on("disconnect", disconnection)
    lobbySocket.joinQueue(socket)
}

export const disconnection = socket => {
    console.log("user disconnected")
}





// for rooms
// socket.join("some room")
// socket.leave("some room")

//emit to single user
// io.to(socket.id).emit("message")