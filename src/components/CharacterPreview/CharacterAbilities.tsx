import * as React from "react"
import mapAbilities from "../../../shared/mapAbilities"

interface CharacterAbilitiesProps {
    character: any
}

const CharacterAbilities: React.SFC<CharacterAbilitiesProps> = props => {
    return (
        <React.Fragment>
            {props.character.abilities.map(ability => {
                const abilityFull = mapAbilities[ability.name]()
                return <div className={`character-preview--description ${abilityFull.isUltimate && "ultimate"}`}>
                    <div className="bold flex w-100 justify-space-between">
                        <span>{ability.name}</span>
                        <span>{abilityFull.cost} {abilityFull.isUltimate ? "Charges" : "Energy"}</span>
                    </div>
                    <div className="text">
                        {abilityFull.description}
                    </div>
                </div>

            })}
        </React.Fragment>
    )
}

export default CharacterAbilities