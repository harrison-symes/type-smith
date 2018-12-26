import { combineReducers } from "redux"

import socket from "./sockets"
import auth from "../components/Auth/auth.reducer"
import lobby from "../components/Lobby/lobby.reducer"
import isLFG from "../components/LFG/LFG.reducer";
import gameRequests from "../components/GameRequests/GameRequests.reducer"
import gameInfo from "../components/GameScreen/game.reducer"

const reducer = combineReducers({
    socket,
    auth,
    lobby,
    isLFG,
    gameRequests,
    gameInfo
})

export default reducer