import * as io from "socket.io-client"
console.log(window.location)
const socket = io()

const socketReducer = (state = socket, _action) => {
    return state
}

export default socketReducer