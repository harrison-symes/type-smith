import * as React from "react"
import {ProgressBar} from "react-bootstrap"
import { Character } from "../../interfacing/characters";

export interface HealthBarProps {
    character: Character;
}

export default (props : HealthBarProps)=> {
    const perc = props.character.ultimateCharge / props.character.ultimateChargeMax * 100
    const label = `${props.character.ultimateCharge} / ${props.character.ultimateChargeMax}`

    return (
        <ProgressBar 
            bsStyle={"info"}
            now={perc}
            label={label}
        />
    )
}