import * as React from "react";
import { AuthState } from "../Auth/auth.interface";
import { Socket } from "socket.io";
import { LobbyEntry } from "./interface";
import { GAME_REQUEST_SOCKET_CHANNEL } from "../GameRequests/GameRequests.socket";

interface EntryProps {
    entry: LobbyEntry;
    auth: AuthState,
    socket: Socket;
}

class Entry extends React.Component<EntryProps> {
    sendRequest = () => {
        const {socket, entry, auth} = this.props
        console.log("sending socket");
        
        socket.emit(
            GAME_REQUEST_SOCKET_CHANNEL.SEND_GAME_REQUEST,
            {
                target_id: entry.user_id,
                sender_id: auth.user.id,
                target_socket_id: entry.socket_id
            }
        )
    }
    render() {
        const {entry, auth} = this.props

        return (
            <div className="lobby-entry wpx-300">
                {auth.user.id == entry.user_id ?
                    <React.Fragment>
                        <h3 className="lobby-entry__title">YOU</h3>
                        <p className="lobby-entry__text">are looking for a match</p>
                    </React.Fragment> :
                    <React.Fragment>
                        <h3 className="lobby-entry__title">{entry.user_name}</h3>
                        <p className="lobby-entry__text">Is looking for a match</p>
                        <button onClick={this.sendRequest} className="btn btn--purple">Request to Join</button>
                    </React.Fragment>
                
                }
            </div>
        )
    }
}

export default Entry