import * as React from "react";
import { Socket } from "socket.io";
import { AuthState } from "../Auth/auth.interface";
import { QueueState } from "./queue.reducer";

interface JoinProps {
    socket: Socket;
    auth: AuthState;
    queue: QueueState;
    userJoinedQueue(): void;
    userLeftQueue(id:number): void;
}

class Join extends React.Component<JoinProps> {
    componentDidMount() {
        const {socket, userJoinedQueue, userLeftQueue} = this.props
        console.log("listening");
        
        socket.on("queueJoinedUser", () => {
            console.log("you joined the queue")
            userJoinedQueue()
        })
        socket.on("ownUserLeaveQueue", (id) => {
            userLeftQueue(id)
        })
    }
    joinQueue  = () => {
        const {socket, auth} = this.props

        socket.emit("joinQueue", auth.user.id)
    }
    leaveQueue = () => {
        const {socket, auth} = this.props
    
        socket.emit("leaveQueue", auth.user.id)
    }
    render() {
        const {queue} = this.props

        return (
            <div>
                {
                    queue.isInQueue ? 
                    <React.Fragment>
                        <p>You are in the queue</p>
                        <button className="btn btn--purple">Leave Queue</button>
                    </React.Fragment> :
                    <button className="btn btn--green btn--large" onClick={this.joinQueue}>
                        Join Queue
                    </button>
                }
            </div>
        )
    }
}

export default Join