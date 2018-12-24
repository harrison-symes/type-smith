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
    ownUserLeftQueue() : void;
}

class Join extends React.Component<JoinProps> {
    componentDidMount() {
        const {socket, userJoinedQueue, userLeftQueue, ownUserLeftQueue} = this.props
        console.log("listening");
        
        socket.on("queueJoinedUser", () => {
            console.log("you joined the queue")
            userJoinedQueue()
        })
        socket.on("leaveQueue", (id) => {
            userLeftQueue(id)
        })
        socket.on("youLeftQueue", () => ownUserLeftQueue())
    }
    joinQueue  = () => {
        const {socket, auth} = this.props

        socket.emit("joinQueue", auth.user.id)
    }
    leaveQueue = () => {
        const {socket, auth} = this.props
        console.log("leaving queue")
        socket.emit("leaveQueue", auth.user.id)
    }
    render() {
        const {queue} = this.props

        return (
            <div className="join-queue">
                {
                    queue.isInQueue ? 
                    <div className="center">
                        <button 
                            className="btn h-100 w-100 btn--purple"
                            onClick={this.leaveQueue}    
                        >
                            Leave Queue
                        </button>
                    </div> :
                    <div className="center">
                        <button className="btn h-100 w-100 btn--full btn--green btn--large" onClick={this.joinQueue}>
                            Join Queue
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default Join