import * as React from "react"
import { Character, CharacterClassList } from "../../../shared/characters";
import HealthBar from "../statComponents/HealthBar";
import EnergyBar from "../statComponents/EnergyBar";
import UltimateBar from "../statComponents/UltimateBar";
import { Tooltip } from "react-tippy";

export interface EnemyCharacterProps {
    character: Character;
}

class EnemyCharacter extends React.Component<EnemyCharacterProps> {
    render() {
        const {character} = this.props
        if (!character) return <div className="mt2 mb2 game-character--container"></div>
        return (
            <div className={`game-character--container`}>
                <div className="game-character--portrait-container">
                    <div className={`ra ra-lg game-character--portrait ${character.icon}`} />
                </div>
                <div className="game-character--stats">
                    
                    <HealthBar character={character} />
                    <EnergyBar character={character} />
                    <UltimateBar character={character} />

                    <div className="game-character-stats" >
                        <div className="page-title">
                            <span className="ra ra-lg ra-strong" />
                            {" "}
                            {character.power}
                        </div>
                        <div className="page-title">
                            <span className="ra ra-lg ra-vibrating-shield" />
                            {" "}
                            {character.defense}
                        </div>
                        <div className="page-title">
                            <span className="ra ra-lg ra-electric" />
                            {" "}
                            {character.speed}
                        </div>
                        {character.isSpiked && 
                            <div className="page-title">
                                <span className="ra ra-lg ra-caltrops" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default EnemyCharacter
