import * as React from "react"
import { CharacterAbility, Character } from "../../interfacing/characters";
import { Socket } from "socket.io";
import { GameState, TurnStage } from "../GameScreen/game.interface";
import { GAME_ACTION_SOCKET_CHANNEL } from "../../../shared/socketChannels";

import {Tooltip} from "react-tippy"

export interface CharacterBarProps {
    socket: Socket;
    gameInfo: GameState;
    character: Character;
    opponent: Character;
    opponent23?: any;
}

class CharacterBar extends React.Component<CharacterBarProps> {
    submitAction = (ability) => {
        const {gameInfo, socket, character, opponent} = this.props

        socket.emit(
            GAME_ACTION_SOCKET_CHANNEL.SUBMIT_TURN_ACTION,
            gameInfo.roomId,
            gameInfo.user_id,
            {   
                character,
                opponent,
                ability
            }
        )
    }
    renderAbility = (ability: CharacterAbility) => {
        const {gameInfo, character} = this.props
        const isWaiting = gameInfo.turnStage != TurnStage.CHOOSING
        const hasEnergy = ability.isUltimate
            ? character.ultimateCharge >= ability.cost
            : character.energy >= ability.cost

        const isDisabled = !hasEnergy || isWaiting 
        return (
            <Tooltip
                className="btn--container w-25"
                position="top"
                trigger="mouseenter"
                animation="perspective"
                // followCursor
                inertia
                arrow="true"
                html={<span>
                    <text>Cost: {ability.cost} {ability.isUltimate ? "Charges" : "Energy"}</text>
                    <br />
                    <text>Type: {ability.type}</text>
                    <br />
                    <text>{ability.description}</text>
                </span>}
                style={{ cursor: 'context-menu'}}
            >
                <button 
                    className="btn" 
                    onClick={() => this.submitAction(ability)}
                    disabled={isDisabled}
                >
                    <span className={`ra ra-lg ${ability.icon}`} />
                    {" "}
                    {ability.name}
                </button>
            </Tooltip>

        )
    }
    render() {
        const {character} = this.props

        return (
            <div className="character-bar">
                {character.abilities.map(this.renderAbility)}
            </div>
        )
    }
}

export default CharacterBar