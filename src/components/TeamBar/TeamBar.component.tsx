import * as React from "react"
import { Character } from "../../interfacing/characters";
import { GAME_ACTION_SOCKET_CHANNEL } from "../../../shared/socketChannels";
import { GameState } from "../GameScreen/game.interface";
import { Socket } from "socket.io";
import { ATTACK_TYPES } from "../../../shared/types";
import { ATTACK_STACK_TYPES, GAME_ATTACKS } from "../../../shared/attacks";

interface TeamBarProps {
    isPlayerSide: boolean;
    gameInfo: GameState;
    userTeam: Character[];
    opponentTeam: Character[];
    socket: Socket;
}

class TeamBar extends React.Component<TeamBarProps> {
    
    switchCharacter = (character) => {
        const {socket, gameInfo, userTeam, opponentTeam} = this.props

        const ability = {
            name: [GAME_ATTACKS.SWITCH],
            cost: 0,
            power: 0,
            descriptiom: "Switch to a different character",
            isUltimate: false,
            type: ATTACK_TYPES.STATUS,
            targetCharacter: character,
            priority: 0,
            stack: [
                //switch out
                ATTACK_STACK_TYPES.SWITCH,
                //opponent Switch Catch
            ]
        }

        socket.emit(
            GAME_ACTION_SOCKET_CHANNEL.SUBMIT_TURN_ACTION,
            gameInfo.roomId,
            gameInfo.user_id,
            {
                character: userTeam.find(character => character.isActive),
                opponent: opponentTeam.find(character => character.isActive),
                ability
            }
        )
    }
    render() {
        const {userTeam, opponentTeam, isPlayerSide} = this.props
        const team = isPlayerSide ? userTeam : opponentTeam
        return (
            <div className="team-bar width-100">
                {team
                    .filter(({isActive}) => !isActive)
                    .map(character => (
                        <div className="team-member">
                            {character.characterClass}
                            {isPlayerSide && 
                                <button className="btn" onClick={() => this.switchCharacter(character)}>
                                    Switch
                                </button>
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}


export default TeamBar