import * as React from "react"
import { Character, CharacterClassList } from "../../../shared/characters";
import { GAME_ACTION_SOCKET_CHANNEL } from "../../../shared/socketChannels";
import { GameState, TurnStage } from "../GameScreen/game.interface";
import { Socket } from "socket.io";
import { ATTACK_TYPES } from "../../../shared/types";
import { ATTACK_STACK_TYPES, GAME_ATTACKS } from "../../../shared/attacks";
import HealthBar from "../statComponents/HealthBar";
import { Transition, TransitionGroup } from "react-transition-group";

import posed from "react-pose"
import { tween, spring } from "popmotion";
import EnergyBar from "../statComponents/EnergyBar";
import UltimateBar from "../statComponents/UltimateBar";

import {Tooltip} from "react-tippy"
import { RouteComponentProps } from "react-router";

interface TeamBarProps extends RouteComponentProps {
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
            priority: -1,
            stack: [
                ATTACK_STACK_TYPES.SWITCH,
            ]
        }
        const activeCharacter = userTeam.find(c => c.isActive)
        //rogue passive
        if (activeCharacter && activeCharacter.characterClass == CharacterClassList.ASSASSIN) ability.priority = 6

        if (gameInfo.turnStage == TurnStage.NEED_TO_SWITCH) {
            socket.emit(
                GAME_ACTION_SOCKET_CHANNEL.SUBMIT_REQUIRED_SWITCH,
                gameInfo.roomId,
                gameInfo.user_id,
                {
                    character: userTeam.find(character => character.isActive),
                    opponent: opponentTeam.find(character => character.isActive),
                    ability
                }
            )
        } else {
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

    }
    renderCharacter = (character:Character) => {
        const {gameInfo, userTeam, opponentTeam} = this.props
        const team = userTeam
        const active = team.find(character => character.isActive)
        if (!active) return

        const isWaiting = !(gameInfo.turnStage == TurnStage.CHOOSING 
            || gameInfo.turnStage == TurnStage.NEED_TO_SWITCH)

        const canAttack = !!character.abilities.find(ability => 
            character[
                ability.isUltimate ? "ultimateCharge" : "energy"
            ] >= ability.cost!
        )

        const isDisabled = isWaiting 
        || (active.isTrapped && (
            canAttack
        )) 
        || (active.isTrapped && gameInfo.turnStage != TurnStage.NEED_TO_SWITCH)

        return (
            <Tooltip
                className={`team-member ${character.isActive && "team-member--active"}`}
                position="top"
                trigger="mouseenter"
                animation="perspective"
                // followCursor
                inertia
                arrow="true"
                html={<span className="character-info">
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
        const {userTeam} = this.props

        return (
            <div className={`user-team--container 
                ${this.props.location.pathname == "/team" && "active"}
            `}>
                <div className="user-team">
                    {userTeam
                        .map(character => this.renderCharacter(character))
                    }
                </div>
            </div>
        )
    }
}


export default TeamBar