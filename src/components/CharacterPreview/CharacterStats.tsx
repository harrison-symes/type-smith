import * as React from "react"
import { statSheets } from "../../../shared/statSheets";
import { CharacterPreview } from "../../../shared/characterPreview";
import { ProgressBar } from "react-bootstrap";
import { calcHealth, calcPower, calcDefense, calcSpeed, calcEnergy } from "../../../server/gameUtils/createCharacter";
import {Tooltip} from "react-tippy"

interface CharacterStatsProps {
    character: CharacterPreview
}

const statIcon = label => {
    switch(label) {
        case "Health": return "ra-hearts"
        case "Power": return "ra-giant" 
        case "Defense": return "ra-vibrating-shield"
        case "Speed": return "ra-speedometer" 
        case "Energy": return "ra-batteries"
        default: return ""
    }
}

const calcStat = (label, stat) => {
    switch(label) {
        case "Health": return calcHealth(stat)
        case "Power": return calcPower(stat)
        case "Defense": return calcDefense(stat)
        case "Speed": return calcSpeed(stat) 
        case "Energy": return calcEnergy(stat)
        default: return 0
    }
}

const renderStat = (label:string, value: number) => (
    <div className="stat-container">
        <Tooltip
            className="stat-icon"
            position="top"
            trigger="mouseenter"
            animation="perspective"
            // followCursor
            inertia
            arrow="true"
            html={<span>
                {label}
            </span>}
            style={{ cursor: 'context-menu' }}
        >
            <span className={`ra ra-lg ${statIcon(label)}`} />
        </Tooltip>
        <ProgressBar
            striped
            now={value / 5 * 100}
        />
        <span className="stat-value">{calcStat(label, value)}</span>
    </div>
)

const CharacterStats: React.SFC<CharacterStatsProps> = props => {
    const stats = statSheets[props.character.characterClass!]

    console.log({stats})
    return (
        <React.Fragment>
            {renderStat("Health", stats.healthStat)}
            {renderStat("Defense", stats.defenseStat)}
            {renderStat("Power", stats.powerStat)}
            {renderStat("Speed", stats.speedStat)}
            {renderStat("Energy", stats.energyStat)}
        </React.Fragment>
    )
}

export default CharacterStats