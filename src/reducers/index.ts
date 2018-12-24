import { combineReducers } from "redux"

import socket from "./sockets"
import auth from "../components/Auth/auth.reducer"
import lobby from "../components/Lobby/lobby.reducer"
import isLFG from "../components/LFG/LFG.reducer";

const reducer = combineReducers({
    socket,
    auth,
    lobby,
    isLFG
})

export default reducer