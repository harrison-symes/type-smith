import * as React from "react"
import {ProgressBar} from "react-bootstrap"
import { Character } from "../../../shared/characters";

export interface HealthBarProps {
    character: Character;
}

export default (props : HealthBarProps)=> {
    const perc = props.character.energy / props.character.energyMax * 100
    const label = `${props.character.energy} / ${props.character.energyMax}`
    
    return (
        <ProgressBar 
            striped
            bsStyle="info"
            now={perc}
            label={label}
        />
    )
}