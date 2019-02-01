import * as React from "react"
import { CharacterAbility, Character } from "../../../shared/characters";
import { Socket } from "socket.io";
import { GameState, TurnStage } from "../GameScreen/game.interface";
import { GAME_ACTION_SOCKET_CHANNEL } from "../../../shared/socketChannels";

import {Tooltip} from "react-tippy"
import { RouterProps, RouteComponentProps } from "react-router";

export interface CharacterBarProps extends RouteComponentProps {
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
    renderTooltip = (ability) => {
        return (

            <Tooltip
                className="info-icon"
                position="top"
                trigger="mouseenter"
                animation="perspective"
                // followCursor
                inertia
                arrow="true"
                html={<span className="ability-description">
                    <div>{ability.name}</div>
                    <div>Cost: {ability.cost} {ability.isUltimate ? "Charges" : "Energy"}</div>
                    <text>{ability.description}</text>
                </span>}
                style={{ cursor: 'context-menu'}}
            >
                <span className="ra ra-info" />
            </Tooltip>
        )
    }
    renderAbility = (ability: CharacterAbility, i:number) => {
        const {gameInfo, character} = this.props
        const isWaiting = gameInfo.turnStage != TurnStage.CHOOSING
        const hasEnergy = ability.isUltimate
            ? character.ultimateCharge >= ability.cost
            : character.energy >= ability.cost

        const isDisabled = !hasEnergy || isWaiting 
        return (
            <div className="ability-container">
                {i % 2 == 0 && this.renderTooltip(ability)}
                <button 
                    className="ability-button" 
                    onClick={() => this.submitAction(ability)}
                    disabled={isDisabled}
                    >
                    <span className={`ra ra-lg ${ability.icon}`} />
                    {" "}
                    {ability.name}
                </button>
                {i % 2 == 1 && this.renderTooltip(ability)}
            </div>
        )
    }
    render() {
        const {character} = this.props

        return (
            <div className={`ability-bar ${this.props.location.pathname == "/abilities" && "active" }`}>
                <div className="ability-bar--inner">
                    {character.abilities.map(this.renderAbility)}
                </div>
            </div>
        )
    }
}

export default CharacterBar