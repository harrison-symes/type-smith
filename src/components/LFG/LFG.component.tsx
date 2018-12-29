import * as React from "react";
import { Socket } from "socket.io";
import { AuthState } from "../Auth/auth.interface";
import { LFGState } from "./interface";
import { LFG_SOCKET_CHANNEL } from "../../../shared/socketChannels";

interface LFGProps {
    socket: Socket;
    auth: AuthState;
    isLFG: LFGState;
}

class LFG extends React.Component<LFGProps> {
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
            <div className="join-lobby">
                {
                    isLFG ? 
                    <div className="center">
                        <button 
                            className="btn h-100 w-100 btn--purple"
                            onClick={this.leaveLobby}    
                        >
                            Leave Lobby
                        </button>
                    </div> :
                    <div className="center">
                        <button className="btn h-100 w-100 btn--full btn--green btn--large" onClick={this.joinLobby}>
                            Join Lobby
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default LFG