import { combineReducers } from "redux"

import socket from "./sockets"
import auth from "../components/Auth/auth.reducer"
import queue from "../components/Queue/queue.reducer"

const reducer = combineReducers({
    socket,
    auth,
    queue
})

export default reducer