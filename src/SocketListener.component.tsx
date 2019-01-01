import * as React from "react"
import { Socket } from "socket.io";
import { GameRequest } from "./components/GameRequests/interface";
import { LobbyEntry } from "./components/Lobby/interface";
import { GameState, GAME_TYPES } from "./components/GameScreen/game.interface";
import { GAME_REQUEST_SOCKET_CHANNEL, LFG_SOCKET_CHANNEL, LOBBY_SOCKET_CHANNEL, GAME_SOCKET_CHANNEL, GAME_ACTION_SOCKET_CHANNEL } from "../shared/socketChannels";

export interface SocketListenerProps 
extends 
GameRequestSocketCommands, 
LFGSocketCommands,
ListSocketCommands,
PreGameSocketCommands,
InGameSocketCommands
{
    socket: Socket;
    despacito(any:any) : void; //desperate burrito
}

interface GameRequestSocketCommands {
    receiveIncomingGameRequest(request: GameRequest): void;
    receiveOutgoingGameRequest(request: GameRequest): void;
    removeIncomingGameRequest(request_id: number): void;
    removeOutgoingGameRequest(request_id: number): void;
}

interface LFGSocketCommands {
    ownPlayerJoinedLobby(): void;
    ownPlayerLeftLobby(user_id: number): void;
}

interface ListSocketCommands {
    addEntryToLobby(entry: LobbyEntry): void;
    removeEntryFromLobby(user_id: number): void;
    receiveGameInfo(gameInfo: GameState): void;
}

interface PreGameSocketCommands {
    receiveTeamInfo(teamInfo: any[]): void;
}

interface InGameSocketCommands {
    waitForOpponent() : void;
    turnValidated() : void;
}

class SocketListener extends React.Component<SocketListenerProps> {
    componentDidMount() {
        const {
            socket
        } = this.props
        
        this.gameRequests(socket)
        this.LFG(socket)
        this.list(socket)
        this.preGame(socket)
        this.inGame(socket)
    }
    gameRequests = (socket) => {
        const {
            receiveIncomingGameRequest, receiveOutgoingGameRequest,
            removeIncomingGameRequest, removeOutgoingGameRequest
        } = this.props
        
        socket.on(  
            GAME_REQUEST_SOCKET_CHANNEL.RECEIVE_GAME_REQUEST_IN,
            request => receiveIncomingGameRequest(request)
        )
        socket.on(
            GAME_REQUEST_SOCKET_CHANNEL.RECEIVE_GAME_REQUEST_OUT,
            request => receiveOutgoingGameRequest(request)
        )
        socket.on(
            GAME_REQUEST_SOCKET_CHANNEL.REMOVE_GAME_REQUEST_IN,
            request_id => removeIncomingGameRequest(request_id)
        )
        socket.on(
            GAME_REQUEST_SOCKET_CHANNEL.REMOVE_GAME_REQUEST_OUT,
            request_id => removeOutgoingGameRequest(request_id)
        )
    } 
    LFG = socket => {
        const {ownPlayerJoinedLobby, ownPlayerLeftLobby } = this.props

        socket.on(
            LFG_SOCKET_CHANNEL.USER_JOINED_LOBBY,
            () => ownPlayerJoinedLobby()
        )
        socket.on(
            LFG_SOCKET_CHANNEL.USER_LEFT_LOBBY,
            (user_id) => ownPlayerLeftLobby(user_id)
        )
    }
    list = socket => {
        const {addEntryToLobby, removeEntryFromLobby, receiveGameInfo } = this.props

        socket.on(
            LOBBY_SOCKET_CHANNEL.ENTRY_ADDED,
            entry => addEntryToLobby(entry)
        )
        socket.on(
            LOBBY_SOCKET_CHANNEL.ENTRY_REMOVED,
            user_id => removeEntryFromLobby(user_id)
        )

        socket.on(
            LOBBY_SOCKET_CHANNEL.SIGNAL_JOIN_ROOM,
            (roomId, request) => {
                socket.emit(
                    LOBBY_SOCKET_CHANNEL.JOIN_ROOM,
                    roomId,
                    request
                )
            }
        )

        socket.on(
            GAME_SOCKET_CHANNEL.READY_GAME,
            gameInfo => receiveGameInfo(gameInfo)
        )
    }
    preGame = (socket) => {
        const { receiveTeamInfo } = this.props

        socket.on(
            GAME_SOCKET_CHANNEL.RECEIVE_TEAM_INFO,
            teamInfo => receiveTeamInfo(teamInfo)
        )
    }
    inGame = (socket) => {
        const {waitForOpponent, turnValidated, despacito} = this.props

        socket.on(
            GAME_ACTION_SOCKET_CHANNEL.WAIT_FOR_OPPONENT,
            () => waitForOpponent()
        )

        socket.on(
            GAME_ACTION_SOCKET_CHANNEL.RECEIVE_FIRST_TURN_STACK,
            stack => {
                Promise.all(
                    stack.map(action => despacito(action))
                )
                .then(() => {
                    setTimeout(() => {
                        despacito({
                            type: GAME_TYPES.START_SECOND_STACK
                        })       
                    
                    }, 3000)
                })
            }
        )
        socket.on(
            GAME_ACTION_SOCKET_CHANNEL.RECEIVE_SECOND_TURN_STACK,
            stack => {
                Promise.all(
                    stack.map(action => despacito(action))

                )
                .then(() => {
                    despacito({
                        type: GAME_TYPES.START_VALIDATING
                    })
                })
            }
        )

        socket.on(
            GAME_ACTION_SOCKET_CHANNEL.TURN_VALIDATED,
            () => turnValidated()
        )
    }
    render() {

        return <React.Fragment>

        </React.Fragment>
    }
}

export default SocketListener