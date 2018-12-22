import * as React from "react";
import { connect } from "react-redux";
import { Socket } from "socket.io";

interface QueueProps {
    socket: Socket
}

class Queue extends React.Component<QueueProps> {
    joinQueue  = () => {
        const {socket} = this.props

        socket.emit("joinQueue", "hey let me in")
    }
    render() {

        return (
            <div>
                Queue system here
                <button onClick={this.joinQueue}>
                    Join
                </button>
            </div>
        )
    }
}

export default Queue