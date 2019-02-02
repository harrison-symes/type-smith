import * as React from "react"
import { Character, CharacterClassList, CharacterAbility } from "../../../shared/characters";
import HealthBar from "../statComponents/HealthBar";
import EnergyBar from "../statComponents/EnergyBar";
import UltimateBar from "../statComponents/UltimateBar";
import { Tooltip } from "react-tippy";
import { Socket } from "net";
import { GAME_ACTION_SOCKET_CHANNEL } from "../../../shared/socketChannels";

export interface EnemyCharacterProps {
    socket: Socket;
    character: Character;
}

interface CharacterState {
    abilityUsed: CharacterAbility | null;
    showAbilityUsed: boolean;
}

class EnemyCharacter extends React.Component<EnemyCharacterProps, CharacterState> {
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
                console.log("character attacked", {character, ability})
                if (character.id == this.props.character.id) {
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
                console.log("character attacked", {character, ability})
                if (character.id == this.props.character.id) {
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
                this.setState({showAbilityUsed: false})
        })
    }
    render() {
        const {character} = this.props
        if (!character) return <div className="mt2 mb2 game-character--container"></div>
        return (
            <div className={`enemy-character`}>
                <div className="active-healthbar">
                    <HealthBar isFull={true} character={character} />
                </div>
                <div className="enemy-character-inner">
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
                        <div className="name-bar">
                        </div>
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
                            {character.isSpiked && 
                                <div className="">
                                    <span className="ra ra-caltrops" />
                                </div>
                            }
                        </div>
                    </div>
                
                </div>
            </div>
        )
    }
}

export default EnemyCharacter
