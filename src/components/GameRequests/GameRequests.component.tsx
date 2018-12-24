import * as React from "react";
import { Socket } from "socket.io";
import { GameRequest } from "./interface";

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