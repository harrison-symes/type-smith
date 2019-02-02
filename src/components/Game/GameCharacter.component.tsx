import * as React from "react"
import { Character, CharacterClassList, CharacterAbility } from "../../../shared/characters";
import HealthBar from "../statComponents/HealthBar";
import EnergyBar from "../statComponents/EnergyBar";
import UltimateBar from "../statComponents/UltimateBar";
import { Tooltip } from "react-tippy";
import { GAME_ACTION_SOCKET_CHANNEL } from "../../../shared/socketChannels";
import { Socket } from "net";

export interface GameCharacterProps {
    character: Character;
    socket: Socket;
}

interface CharacterState {
    abilityUsed: CharacterAbility | null;
    showAbilityUsed: boolean;
}

class GameCharacter extends React.Component<GameCharacterProps, CharacterState> {
    constructor(props) {
        super(props)
        this.state = {
            abilityUsed: null,
            showAbilityUsed: false
        }
    }
    componentDidMount() {
        console.log("mounted")
        this.props.socket.on(
            GAME_ACTION_SOCKET_CHANNEL.RECEIVE_FIRST_TURN_STACK,
            (_stack, character, ability) => {
                console.log("character attacked", { character, ability })
                if (character && this.props.character && character.id == this.props.character.id) {
                    this.setState({
                        showAbilityUsed: true,
                        abilityUsed: ability
                    })
                }
            }
        )
        this.props.socket.on(
            GAME_ACTION_SOCKET_CHANNEL.RECEIVE_SECOND_TURN_STACK,
            (_stack, character, ability) => {
                console.log("character attacked", { character, ability })
                if (character && this.props.character && character.id == this.props.character.id) {
                    this.setState({
                        showAbilityUsed: true,
                        abilityUsed: ability
                    })
                }
            }
        )
        this.props.socket.on(
            GAME_ACTION_SOCKET_CHANNEL.TURN_VALIDATED,
            () => {
                console.log("turn validated, hide tooltip")
                this.setState({ showAbilityUsed: false })
            }
        )
    }
    render() {
        const {character} = this.props
        if (!character) return <div className="mt2 mb2 game-character--container"></div>
        return (
            <div className={`user-character`}>
                <div className="user-character-inner">
                    <div className="portrait-container">
                        <Tooltip
                            className="name-bar"
                            position="top"
                            open={this.state.showAbilityUsed}
                            html={<span>
                                {this.state.abilityUsed && this.state.abilityUsed.name}
                            </span>}
                        >

                            <div className="name-bar--text">
                                {character.characterClass}
                            </div>
                        </Tooltip>
                        <div className="portrait">
                            <div className="portrait--inner">
                                <span className={`class-icon ra ${character.icon}`} />
                            </div>
                        </div>
                    </div>
                    <div className="info-container">

                        <EnergyBar character={character} />
                        <UltimateBar character={character} />

                        <div className="stats-container" >
                            <div className="">
                                <span className="ra ra-strong" />
                                {" "}
                                {character.power}
                            </div>
                            <div className="">
                                <span className="ra ra-vibrating-shield" />
                                {" "}
                                {character.defense}
                            </div>
                            <div className="">
                                <span className="ra ra-electric" />
                                {" "}
                                {character.speed}
                            </div>
                        </div>
                        <div className="stats-container">
                            {character.isTrapped &&
                                <Tooltip text="Trapped (cannot switch out)">
                                    <span className="ra ra-lg ra-prisoner" />
                                </Tooltip>
                            }
                            {character.isSpiked &&
                                <Tooltip text="Spiked (takes 10 damage upon switching out)">
                                    <span className="ra ra-lg ra-caltrops" />
                                </Tooltip>
                            }
                            {character.isPlagued &&
                                <Tooltip text="Plagued (Takes 5 damage after using any ability)">
                                    <span className="ra ra-lg ra-vomiting" />
                                </Tooltip>
                            }
                            {character.isImmune &&
                                <Tooltip text="Immune (cannot take damage this turn)">
                                    <span className="ra ra-lg ra-stone-wall" />
                                </Tooltip>
                            }
                        </div>
                    </div>

                </div>
                <div className="active-healthbar">
                    <HealthBar isFull={true} character={character} />
                </div>
            </div>
        )
    }
}

export default GameCharacter
