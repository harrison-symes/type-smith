import { combineReducers } from "redux"

import socket from "./sockets"
import auth from "../components/Auth/auth.reducer"
import lobby from "../components/Lobby/lobby.reducer"
import isLFG from "../components/LFG/LFG.reducer";
import gameRequests from "../components/GameRequests/GameRequests.reducer"
import gameInfo from "../components/GameScreen/game.reducer"
import userTeam from "./userTeam.reducer"
import gameLog from "../components/GameLog/GameLog.reducer"

const reducer = combineReducers({
    socket,
    auth,
    lobby,
    isLFG,
    gameRequests,
    gameInfo,
    gameLog,
    userTeam: userTeam(true),
    opponentTeam: userTeam(false)
})

export default reducer