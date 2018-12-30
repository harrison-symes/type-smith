import * as React from "react"
import { connect } from "react-redux"
import CharacterBar from "../components/CharacterBar/CharacterBar.container";
import GameLog from "../components/GameLog/GameLog.container";
import GameScreen from "../components/GameScreen/GameScreen.container";
import TeamBar from "../components/TeamBar/TeamBar.component";
import { Character } from "../interfacing/characters";
import { GameState, TurnStage } from "../components/GameScreen/game.interface";
import { Socket } from "socket.io";
import { GAME_ACTION_SOCKET_CHANNEL } from "../../shared/socketChannels";

interface GameProps {
    socket: Socket;
    userTeam: Character[];
    opponentTeam: Character[];
    gameInfo: GameState;
}

class Game extends React.Component<GameProps> {
    componentWillReceiveProps (nextProps:GameProps) {
        const nextStage = nextProps.gameInfo.turnStage
        const lastStage = this.props.gameInfo.turnStage
        if (nextStage != lastStage && nextStage == TurnStage.VALIDATING) {
            this.props.socket.emit(
                GAME_ACTION_SOCKET_CHANNEL.VALIDATE_TURN,
                this.props.gameInfo.roomId
            )
        }
    }
    render() {
        const {userTeam, opponentTeam} = this.props
        return (
            <div>
                <TeamBar isPlayerSide={false} team={opponentTeam} />
                <GameScreen />
                <CharacterBar />
                <TeamBar isPlayerSide={true} team={userTeam} />
                <GameLog />
            </div>
        )
    }
}

const mapStateToProps = ({
    socket,
    gameInfo,
    userTeam,
    opponentTeam
}) => ({
    socket,
    gameInfo,
    userTeam,
    opponentTeam
})

export default connect(mapStateToProps)(Game)
