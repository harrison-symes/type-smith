import * as React from "react"
import { connect } from "react-redux"
import {HashRouter as Router, Route} from "react-router-dom";

import { Character } from "../../shared/characters";
import { GameState, TurnStage } from "../components/GameScreen/game.interface";
import { Socket } from "socket.io";
import { GAME_ACTION_SOCKET_CHANNEL } from "../../shared/socketChannels";
import { Dispatch } from "redux";
import EnemyTeamContainer from "../components/TeamBar/EnemyTeam.container";
import EnemyCharacter from "../components/Game/EnemyCharacter.container";
import MobileNav from "../components/Game/MobileNav.container";
import GameCharacter from "../components/Game/GameCharacter.container";
import CharacterBar from "../components/CharacterBar/CharacterBar.container"
import TeamBar from "../components/TeamBar/TeamBar.container";
import GameLog from "../components/GameLog/GameLog.container"

interface GameProps {
    socket: Socket;
    userTeam: Character[];
    opponentTeam: Character[];
    gameInfo: GameState;
    dispatch: Dispatch;
}

class Game extends React.Component<GameProps> {
    componentWillReceiveProps (nextProps:GameProps) {
        this.checkValidating(nextProps)
        this.checkSecondStackReady(nextProps)
    }
    checkSecondStackReady (nextProps:GameProps) {
        const nextStage = nextProps.gameInfo.turnStage
        const lastStage = this.props.gameInfo.turnStage

        if (nextStage != lastStage && nextStage == TurnStage.WAITING_SECOND) {
            nextProps.dispatch({
                type: "GET_USER_ACTIVE",
                getCharacter: (character) => {
                    nextProps.socket.emit(
                        GAME_ACTION_SOCKET_CHANNEL.REQUEST_SECOND_STACK,
                        nextProps.gameInfo.roomId,
                        nextProps.gameInfo.user_id,
                        character    
                    )   
                    
                }
            })
        }
        
    }
    checkValidating (nextProps:GameProps) {
        const nextStage = nextProps.gameInfo.turnStage
        const lastStage = this.props.gameInfo.turnStage
        if (nextStage != lastStage && nextStage == TurnStage.VALIDATING) {
            nextProps.dispatch({
                type: "GET_USER_ACTIVE",
                getCharacter: (character) => {
                    if (character.isAlive) {
                        this.props.socket.emit(
                            GAME_ACTION_SOCKET_CHANNEL.VALIDATE_TURN,
                            this.props.gameInfo.roomId
                        )
                    } else {
                        this.props.socket.emit(
                            GAME_ACTION_SOCKET_CHANNEL.CHARACTER_DIED,
                            this.props.gameInfo.roomId
                        )
                    }

                }
            })
        }
    }
    render() {
        return (
            <Router>
                <div className="game-container">
                    <EnemyTeamContainer />
                    <EnemyCharacter />
                    <Route component={GameLog} />
                    <Route component={CharacterBar} />
                    <Route component={TeamBar} />
                    <GameCharacter />
                    <Route component={MobileNav} />
                </div>
            </Router>
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
