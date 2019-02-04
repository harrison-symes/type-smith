import * as React from "react"
import { TurnState } from "./GameLog.reducer";
import {RouteComponentProps} from "react-router-dom"


interface GameLogProps extends RouteComponentProps {
    gameLog: TurnState[],
}

class GameLog extends React.Component<GameLogProps> {
    messageList : HTMLDivElement

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
            <div className={`game-log--container ${this.props.location.pathname == "/log" && "active"}`}>
                <div className="game-log--screen"
                    ref={(el:HTMLDivElement) => { this.messageList = el; }}
                >
                    {gameLog.map(turn => 
                        turn.turnLog.map(logMessage => 
                            <div className={`game-log--message ${logMessage.type}`}>
                                {logMessage.message}
                            </div>
                        )
                    )}
                </div>
            </div>
        )
    }
}

export default GameLog