export const joinGame = (socket, room) => {
    socket.join(room)
}

export const joinQueue = (socket) => {
    socket.on("joinQueue", (message) => console.log(message))
}