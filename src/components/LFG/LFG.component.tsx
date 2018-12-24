import * as React from "react";
import { Socket } from "socket.io";
import { AuthState } from "../Auth/auth.interface";
import { LFGState } from "./interface";
import { LFG_SOCKET_CHANNEL } from "./LFG.socket";

interface LFGProps {
    socket: Socket;
    auth: AuthState;
    isLFG: LFGState;
    ownPlayerJoinedLobby():void;
    ownPlayerLeftLobby(user_id: number):void;
}

class LFG extends React.Component<LFGProps> {
    componentDidMount() {
        this.socketsListen()
    }
    socketsListen = () => {
        const {socket, ownPlayerJoinedLobby, ownPlayerLeftLobby} = this.props
        socket.on(LFG_SOCKET_CHANNEL.USER_JOINED_LOBBY, () => {
            ownPlayerJoinedLobby()
        })
        socket.on(LFG_SOCKET_CHANNEL.USER_LEFT_LOBBY, (user_id) => {
            ownPlayerLeftLobby(user_id)
        })
    }
    joinLobby  = () => {
        const {socket, auth} = this.props

        socket.emit(
            LFG_SOCKET_CHANNEL.USER_JOIN_LOBBY, 
            auth.user.id
        )
    }
    leaveLobby = () => {
        const {socket, auth} = this.props
        socket.emit(
            LFG_SOCKET_CHANNEL.USER_LEAVE_LOBBY, 
            auth.user.id
        )
    }
    render() {
        const {isLFG} = this.props

        return (
            <div className="join-queue">
                {
                    isLFG ? 
                    <div className="center">
                        <button 
                            className="btn h-100 w-100 btn--purple"
                            onClick={this.leaveLobby}    
                        >
                            Leave Queue
                        </button>
                    </div> :
                    <div className="center">
                        <button className="btn h-100 w-100 btn--full btn--green btn--large" onClick={this.joinLobby}>
                            Join Queue
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default LFG