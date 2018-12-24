import * as React from "react";
import { Socket } from "socket.io";
import { GameRequest } from "./interface";
import { GAME_REQUEST_SOCKET_CHANNEL } from "./GameRequests.socket";

export interface GameRequestsProps {
    socket: Socket;
    gameRequests: GameRequest[];
}

class GameRequests extends React.Component<GameRequestsProps> {
    componentDidMount () {
        this.socketsListen
    }
    socketsListen = () => {
        const {socket} = this.props

        socket.on(
            GAME_REQUEST_SOCKET_CHANNEL.RECEIVE_GAME_REQUEST,
            request => console.log({request})
        )
        socket.on(
            GAME_REQUEST_SOCKET_CHANNEL.REMOVE_GAME_REQUEST,
            request_id => console.log({request_id})
        )
    }
    render() {
        const {gameRequests} = this.props

        if (gameRequests.length == 0) return null

        return (
            <div>
                Game Reqeuests yo
            </div>
        )
    }
}

export default GameRequests