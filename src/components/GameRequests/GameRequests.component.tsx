import * as React from "react";
import { Socket } from "socket.io";
import { GameRequest, GameRequestsState } from "./interface";
import { GAME_REQUEST_SOCKET_CHANNEL } from "./GameRequests.socket";

export interface GameRequestsProps {
    socket: Socket;
    gameRequests: GameRequestsState;
    receiveIncomingGameRequest(request:GameRequest) : void;
    receiveOutgoingGameRequest(request:GameRequest) : void;
    removeIncomingGameRequest(request_id: number) : void;
    removeOutgoingGameRequest(request_id: number) : void;
}

class GameRequests extends React.Component<GameRequestsProps> {
    componentDidMount () {
        this.socketsListen()
    }
    socketsListen = () => {
        const {
            socket, 
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
    declineRequest = (request) => {
        const { socket } = this.props

        socket.emit(
            GAME_REQUEST_SOCKET_CHANNEL.CANCEL_GAME_REQUEST,
            request
        )
    } 
    acceptRequest = (request) => {
        const {socket} = this.props

        socket.emit(
            GAME_REQUEST_SOCKET_CHANNEL.ACCEPT_GAME_REQUEST,
            request
        )
    }
    render() {
        const {gameRequests} = this.props

        if (gameRequests.inbound.length == 0) return null

        return (
            <div>
                {/* <h2>Game Requests</h2> */}
                <div className="flex justify-center flex-wrap">
                    {gameRequests.inbound.map(request => (
                        <div className="wpx-300 lobby-entry">
                            <h3>{request.sender_user_name}</h3>
                            <p>Wants to play</p>
                            <div className="flex">
                                <button className="btn btn--purple" onClick={()=>this.declineRequest(request)}>Decline</button>
                                <button className="btn btn--green" onClick={()=>this.acceptRequest(request)}>Accept</button>
                            </div>
                        </div>
                    ))}
                
                </div>
                <div className="hpx-100" />
            </div>
        )
    }
}

export default GameRequests