import * as React from "react"
import { Character, CharacterClassList } from "../../interfacing/characters";
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

interface TeamBarProps {
    isPlayerSide: boolean;
    gameInfo: GameState;
    userTeam: Character[];
    opponentTeam: Character[];
    socket: Socket;
}

const icons = {
    [CharacterClassList.WARRIOR]: "ra-crossed-swords",
    [CharacterClassList.MAGE]: "ra-wizard-face",
    [CharacterClassList.ASSASSIN]: "ra-cowled",
    [CharacterClassList.PALADIN]: "ra-elf-helmet",
    [CharacterClassList.WITCH]: "ra-witch-face",
    [CharacterClassList.SNIPER]: "ra-eye-target",
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
        const {gameInfo, isPlayerSide, userTeam, opponentTeam} = this.props
        const team = isPlayerSide ? userTeam : opponentTeam
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
                html={<span>
                    <div className="subtitle">
                        <span className="ra ra-lg ra-strong" />
                        {" "}
                        {character.power}
                    </div>
                    <div className="subtitle">
                        <span className="ra ra-lg ra-vibrating-shield" />
                        {" "}
                        {character.defense}
                    </div>
                    <div className="subtitle">
                        <span className="ra ra-lg ra-electric" />
                        {" "}
                        {character.speed}
                    </div>
                </span>}
                style={{ cursor: 'context-menu' }}
            >
                <React.Fragment>

                    <p className="team-member--name">
                        {character.characterClass}
                        {" "}
                        <span className={`team-member--image ra ${icons[character.characterClass]}`} />
                    </p>
                    <div>
                        <HealthBar character={character} />
                        <EnergyBar character={character} />
                        <UltimateBar character={character} />
                    </div>
                    {(isPlayerSide && !character.isActive && character.isAlive) &&
                        <button 
                        className="team-member--btn btn" 
                        disabled={isDisabled}
                        onClick={() => this.switchCharacter(character)}>
                            Switch
                        </button>
                    }
                </React.Fragment>
            </Tooltip>
        )
    }
    render() {
        const {userTeam, opponentTeam, isPlayerSide} = this.props
        const team = isPlayerSide ? userTeam : opponentTeam

        return (
            <div className="team-bar width-100">
                {team
                    .map(character => this.renderCharacter(character))
                }
            </div>
        )
    }
}


export default TeamBar