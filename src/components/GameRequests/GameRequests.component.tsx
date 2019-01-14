import * as React from "react";
import { Socket } from "socket.io";
import { GameRequest, GameRequestsState } from "./interface";
import { GAME_REQUEST_SOCKET_CHANNEL } from "../../../shared/socketChannels";

export interface GameRequestsProps {
    socket: Socket;
    gameRequests: GameRequestsState;
}

class GameRequests extends React.Component<GameRequestsProps> {
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

        // if (gameRequests.inbound.length == 0) return null

        return (
            <div className="game-requests">
                {gameRequests.inbound.map((request, i) => (
                    <div className="game-request--item--container" style={{marginLeft: `${i + 3}rem`}}>
                        <div className="game-request--item">
                            <span className="game-request--text">
                                <h3 className="game-request--title">{request.sender_user_name}</h3>
                                <p>Has challenged you</p>
                            </span>
                            <div className="game-request--btns">
                                <button className="btn btn-decline" onClick={()=>this.declineRequest(request)}>Decline</button>
                                <button className="btn btn-accept" onClick={()=>this.acceptRequest(request)}>Accept</button>
                            </div>
                        </div>
                    </div>
                ))}
            
            </div>
        )
    }
}

export default GameRequests