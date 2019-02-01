import * as React from "react"
import { Character, CharacterClassList } from "../../../shared/characters";
import HealthBar from "../statComponents/HealthBar";
import EnergyBar from "../statComponents/EnergyBar";
import UltimateBar from "../statComponents/UltimateBar";
import { Tooltip } from "react-tippy";

export interface GameCharacterProps {
    character: Character;
}

class GameCharacter extends React.Component<GameCharacterProps> {
    render() {
        const {character} = this.props
        if (!character) return <div className="mt2 mb2 game-character--container"></div>
        return (
            <div className={`user-character`}>
                <div className="user-character-inner">
                    <div className="portrait-container">
                        <div className="name-bar">
                            <div className="name-bar--text">
                                {character.characterClass}
                            </div>
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
                <div className="active-healthbar">
                    <HealthBar isFull={true} character={character} />
                </div>
            </div>
        )
    }
}

export default GameCharacter
