import * as React from "react";
import { AuthState } from "../Auth/auth.interface";
import { Socket } from "socket.io";
import { LobbyEntry } from "./interface";
import { GAME_REQUEST_SOCKET_CHANNEL } from "../GameRequests/GameRequests.socket";
import { GameRequestsState } from "components/GameRequests/interface";

interface EntryProps {
    entry: LobbyEntry;
    auth: AuthState,
    socket: Socket;
    gameRequests: GameRequestsState;
}

class Entry extends React.Component<EntryProps> {
    cancelRequest = () => {
        const {socket, gameRequests, entry} = this.props

        const request = gameRequests.outbound.find(request => request.target_id == entry.user_id)

        socket.emit(
            GAME_REQUEST_SOCKET_CHANNEL.CANCEL_GAME_REQUEST,
            request
        )
    }
    sendRequest = () => {
        const {socket, entry, auth} = this.props
        
        socket.emit(
            GAME_REQUEST_SOCKET_CHANNEL.SEND_GAME_REQUEST,
            {
                target_id: entry.user_id,
                sender_id: auth.user.id,
                target_socket_id: entry.socket_id,
                target_user_name: entry.user_name,
                sender_user_name: auth.user.user_name
            }
        )
    }
    render() {
        const {entry, auth, gameRequests} = this.props

        const isRequestSent = gameRequests.outbound.find(request => request.target_id == entry.user_id)

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
                        {isRequestSent ?
                            <button onClick={this.cancelRequest} className="btn btn--purple">Cancel Request</button> :
                            <button onClick={this.sendRequest} className="btn btn--green">Request to Join</button>

                        }
                    </React.Fragment>
                
                }
            </div>
        )
    }
}

export default Entry