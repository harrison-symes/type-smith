import { combineReducers } from "redux"

import socket from "./sockets"
import auth from "../components/Auth/auth.reducer"

const reducer = combineReducers({
    socket,
    auth
})

export default reducer