import { combineReducers } from "redux"

import socket from "./sockets"

const reducer = combineReducers({
    socket
})

export default reducer