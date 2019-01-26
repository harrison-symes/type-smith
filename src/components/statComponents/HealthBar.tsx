import * as React from "react"
import {ProgressBar} from "react-bootstrap"
import { Character } from "../../interfacing/characters";

export interface HealthBarProps {
    character: Character;
}

export default (props : HealthBarProps)=> {
    const perc = props.character.health / props.character.healthMax * 100
    const label = `${props.character.health} / ${props.character.healthMax}`
    
    const bsStyle = perc > 50
        ? "success"
        : perc > 25
            ? "warning"
            : "danger"

    return (
        <ProgressBar 
            bsStyle={bsStyle}
            now={perc}
            label={label}
        />
    )
}