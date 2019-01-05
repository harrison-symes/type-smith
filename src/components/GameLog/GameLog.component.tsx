import * as React from "react"
import { TurnState } from "./GameLog.reducer";

class GameLog extends React.Component<{
    gameLog: TurnState[]
}> {
    messageList : HTMLElement

    scrollToBottom = () => {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        const {gameLog} = this.props
        return (
            <div className="game-log--container">
                <div className="game-log--screen"
                    ref={(el) => { this.messageList = el; }}
                >
                   {gameLog.map(turn => turn.turnLog.map(logMessage => <div className={`game-log--message ${logMessage.type}`}>
                       {logMessage.message}
                   </div>))}
                </div>
            </div>
        )
    }
}

export default GameLog