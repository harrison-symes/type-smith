import * as React from "react";
import { Socket } from "socket.io";
import { AuthState } from "../Auth/auth.interface";
import { LFG_SOCKET_CHANNEL } from "../../../shared/socketChannels";

interface LFGProps {
    socket: Socket;
    auth: AuthState;
    isLFG: LFGState;
}

interface LFGState {
    showSection: boolean;
}

class LFG extends React.Component<LFGProps, LFGState> {
    constructor(props) {
        super(props)

        this.state = {
            showSection: false
        }
    }
    toggleShow = () => this.setState({showSection: !this.state.showSection})
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
        const {showSection} = this.state

        return (
            <div className={`lfg ${showSection && "is-open"}`}>
                <div className="lfg-content">
                    <span className={`"lfg-arrow ra ${
                        showSection ? "ra-save-arrow" : "ra-up-card"}`
                    } onClick={this.toggleShow} />
                    {
                        isLFG ? 
                        <div className="center">
                            <button 
                                className="btn lfg-cancel"
                                onClick={this.leaveLobby}    
                            >
                                Cancel
                            </button>
                        </div> :
                        <div className="center">
                            <button className="btn lfg-btn" onClick={this.joinLobby}>
                                Look for Game
                            </button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default LFG