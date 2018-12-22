import { combineReducers } from "redux"

import socket from "./sockets"
import auth from "../components/Auth/auth.reducer"
console.log("init reducer")
const reducer = combineReducers({
    socket,
    auth
})

export default reducer