import * as React from "react"
import {connect} from "react-redux"
import TeamPreview from "../components/TeamPreview/TeamPreview.container";
import { Socket } from "socket.io";
import { GameState } from "../components/GameScreen/game.interface";
import { GAME_SOCKET_CHANNEL } from "../components/GameScreen/game.socket";
import { AuthState } from "../components/Auth/auth.interface";
import { receiveTeamInfo } from "../components/GameScreen/gameScreen.actions";

interface PreGameProps {
    socket: Socket,
    gameInfo: GameState;
    auth: AuthState
    receiveTeamInfo(teamInfo : any[]) : void;
}

class PreGame extends React.Component<PreGameProps> {
    constructor(props) {
        super(props)
        this.socketsListen()
    }
    socketsListen() {
        const {socket, receiveTeamInfo, auth} = this.props

        socket.on(
            GAME_SOCKET_CHANNEL.RECEIVE_TEAM_INFO,
            teamInfo => {
                console.log({teamInfo})
                receiveTeamInfo(teamInfo)
            }
        )
    }
    render() {
        return (
            <div>
                <h1>Pre Game</h1>
                <TeamPreview />
            </div>
        )
    }
}

const mapStateToProps = ({
    socket,
    gameInfo,
    auth
}) => ({
    socket,
    gameInfo,
    auth
})

const mapDispatchToProps = dispatch => ({
    receiveTeamInfo: teamInfo => dispatch(receiveTeamInfo(teamInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreGame)