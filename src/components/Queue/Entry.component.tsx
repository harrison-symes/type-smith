import * as React from "react";
import { QueueEntry } from "./queue.reducer";
import { AuthState } from "../Auth/auth.interface";
import { Socket } from "socket.io";

interface EntryProps {
    entry: QueueEntry;
    auth: AuthState,
    socket: Socket;
}

class Entry extends React.Component<EntryProps> {
    render() {
        const {entry} = this.props

        return (
            <div className="queue-entry">
                <h3 className="queue-entry__title">{entry.user_name}</h3>
                <p className="queue-entry__text">Is looking for a match</p>
                <button className="btn btn--purple">Request to Join</button>
            </div>
        )
    }
}

export default Entry