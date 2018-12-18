import * as io from "socket.io-client"
const socket = io('http://localhost:8000')

const socketReducer = (state = socket, action) => {
    return state
}

export default socketReducer