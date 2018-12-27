import { combineReducers } from "redux"

import socket from "./sockets"
import auth from "../components/Auth/auth.reducer"
import lobby from "../components/Lobby/lobby.reducer"
import isLFG from "../components/LFG/LFG.reducer";
import gameRequests from "../components/GameRequests/GameRequests.reducer"
import gameInfo from "../components/GameScreen/game.reducer"
import userTeam from "../components/GameScreen/userTeam.reducer"
import opponentTeam from "../components/GameScreen/opponentTeam.reducer"

const reducer = combineReducers({
    socket,
    auth,
    lobby,
    isLFG,
    gameRequests,
    gameInfo,
    userTeam,
    opponentTeam
})

export default reducer