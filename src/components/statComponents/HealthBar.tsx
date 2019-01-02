import * as React from "react"
import {ProgressBar} from "react-bootstrap"
import { Character } from "src/interfacing/characters";

export interface HealthBarProps {
    character: Character;
}

export default (props : HealthBarProps)=> {
    const perc = props.character.health / props.character.healthMax * 100
    const label = `${props.character.health} / ${props.character.healthMax}`
    
    return (
        <ProgressBar 
            now={perc}
            label={label}
        />
    )
}