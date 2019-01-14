import * as React from "react";
import { AuthState } from "../Auth/auth.interface";
import { Socket } from "socket.io";
import { LobbyEntry } from "./interface";
import { GAME_REQUEST_SOCKET_CHANNEL } from "../../../shared/socketChannels";
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
        const isOwnListing = auth.user.id == entry.user_id

        return (
            <div className="lobby-entry">
                <h3 className="lobby-entry--title">
                    {entry.user_name}
                </h3>
                <span className="lobby-entry--info ra ra-info"></span>
                {isOwnListing ?
                    <button disabled className="btn btn-cancel">Your Listing</button> :
                    isRequestSent ?
                        <button onClick={this.cancelRequest} className="btn btn-cancel">Cancel</button> :
                        <button onClick={this.sendRequest} className="btn btn-challenge">Challenge</button>
                }
            </div>
        )
    }
}

export default Entry