import SocketListener from "./SocketListener.component"
import {connect} from "react-redux"
import { receiveGameRequestInbound, receiveGameRequestOutbound, removeGameRequestInbound, removeGameRequestOutbound } from "./components/GameRequests/GameRequests.actions";
import { ownPlayerJoinedLobby, ownPlayerLeftLobby } from "./components/LFG/LFG.actions";
import { LobbyEntry } from "./components/Lobby/interface";
import { addEntryToLobby, removeEntryFromLobby } from "./components/Lobby/lobby.actions";
import { receiveGameInfo, receiveTeamInfo, waitForOpponent, turnValidated, switchCharacterRequest } from "./components/GameScreen/gameScreen.actions";

const mapStateToProps = ({
    socket
}) => ({
    socket
})

const mapDispatchToProps = dispatch => ({
    //gameRequests
    receiveIncomingGameRequest: request => dispatch(receiveGameRequestInbound(request)),
    receiveOutgoingGameRequest: request => dispatch(receiveGameRequestOutbound(request)),
    removeIncomingGameRequest: request_id => dispatch(removeGameRequestInbound(request_id)),
    removeOutgoingGameRequest: request_id => dispatch(removeGameRequestOutbound(request_id)),
    //LFG
    ownPlayerJoinedLobby: () => dispatch(ownPlayerJoinedLobby()),
    ownPlayerLeftLobby: (_user_id: number) => dispatch(ownPlayerLeftLobby()),
    //list (lobby)
    addEntryToLobby: (entry: LobbyEntry) => dispatch(addEntryToLobby(entry)),
    removeEntryFromLobby: (user_id: number) => dispatch(removeEntryFromLobby(user_id)),
    receiveGameInfo: gameInfo => dispatch(receiveGameInfo(gameInfo)),
    //pregame
    receiveTeamInfo: teamInfo => dispatch(receiveTeamInfo(teamInfo)),
    //ingame
        //turns
        waitForOpponent: () => dispatch(waitForOpponent()),
        turnValidated: () => dispatch(turnValidated()),
        switchCharacterRequest: () => dispatch(switchCharacterRequest()),
        despacito: (action) => Promise.resolve().then(() => dispatch(action))
})

export default connect(mapStateToProps, mapDispatchToProps)(SocketListener)