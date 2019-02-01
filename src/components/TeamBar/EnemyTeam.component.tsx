import * as React from "react"
import { Character, CharacterClassList } from "../../../shared/characters";
import { GameState, TurnStage } from "../GameScreen/game.interface";
import { Socket } from "socket.io";
import HealthBar from "../statComponents/HealthBar";

import EnergyBar from "../statComponents/EnergyBar";
import UltimateBar from "../statComponents/UltimateBar";

import {Tooltip} from "react-tippy"

interface EnemyTeamProps {
    gameInfo: GameState;
    opponentTeam: Character[];
    socket: Socket;
}

class EnemyTeam extends React.Component<EnemyTeamProps> {
    renderCharacter = (character:Character) => {
        const {gameInfo, opponentTeam} = this.props
        const active = opponentTeam.find(character => character.isActive)
        if (!active) return

        return (
            <Tooltip
                className={`team-member ${character.isActive && "team-member--active"}`}
                position="bottom"
                trigger="mouseenter"
                animation="perspective"
                // followCursor
                inertia
                arrow="true"
                html={<span>
                   {character.characterClass}
                   <EnergyBar character={character} />
                   <UltimateBar character={character} />
                </span>}
                style={{ cursor: 'context-menu' }}
            >
                <div className="team-member--icon-container">
                    <span className={`team-member--icon ra ${character.icon}`} />
                
                </div>
                <div>
                    <HealthBar character={character} />
                </div>
            </Tooltip>
        )
    }
    render() {
        const {opponentTeam} = this.props

        return (
            <div className="enemy-team">
                {opponentTeam
                    .map(character => this.renderCharacter(character))
                }
            </div>
        )
    }
}


export default EnemyTeam