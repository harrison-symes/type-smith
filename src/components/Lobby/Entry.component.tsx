import * as React from "react";
import { AuthState } from "../Auth/auth.interface";
import { Socket } from "socket.io";
import { QueueEntry } from "./interface";

interface EntryProps {
    entry: QueueEntry;
    auth: AuthState,
    socket: Socket;
}

class Entry extends React.Component<EntryProps> {
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
                        <button className="btn btn--purple">Request to Join</button>
                    </React.Fragment>
                
                }
            </div>
        )
    }
}

export default Entry