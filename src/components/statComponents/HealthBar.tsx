import * as React from "react"
import {ProgressBar} from "react-bootstrap"
import { Character } from "../../../shared/characters";

export interface HealthBarProps {
    character: Character;
    isFull?: boolean;
}

const HealthBar = (props : HealthBarProps)=> {
    const perc = props.character.health / props.character.healthMax * 100
    const fullLabel = `${props.character.health} / ${props.character.healthMax}`
    const label = props.character.health 
    const bsStyle = perc > 50
        ? "success"
        : perc > 25
            ? "warning"
            : "danger"

    return (
        <ProgressBar

            bsStyle={bsStyle}
            now={perc}
            label={props.isFull ? fullLabel : label}
        />
    )
}

HealthBar.defaultProps = {
    isFull: false,
}

export default HealthBar