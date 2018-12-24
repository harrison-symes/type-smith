import * as React from "react";
import { Socket } from "socket.io";
import { QueueEntry, QueueState } from "./queue.reducer";
import Entry from "./Entry.container";
import { AuthState } from "components/Auth/auth.interface";

interface ListProps {
    socket: Socket;
    auth: AuthState;
    queue: QueueState;
    getQueue(): void;
    addEntryToQueue(entry : QueueEntry) : void;
    playerJoinedQueue(entry: QueueEntry): void;
}

class List extends React.Component<ListProps> {
    componentDidMount() {
        const {socket, queue, getQueue, playerJoinedQueue, addEntryToQueue} = this.props
        
        getQueue()
        socket.on("queueJoined", entry => addEntryToQueue(entry))
        socket.on("playerJoinedQueue", (entry) => playerJoinedQueue(entry))
    }
    render() {
        const {queue, auth} = this.props

        
        return (
            <div>
                <h2 className="page-title">Looking for a game:</h2>
                <div className="flex flex-wrap ">
                    {queue.lookingForGame
                        .map(entry => <Entry entry={entry} key={entry.id} />)
                    }
                </div>
            </div>
        )
    }
}

export default List