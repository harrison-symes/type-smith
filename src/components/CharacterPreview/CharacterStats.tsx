import * as React from "react"
import { statSheets } from "../../../shared/statSheets";
import { CharacterPreview } from "../../../shared/characterPreview";

interface CharacterStatsProps {
    character: CharacterPreview
}

const CharacterStats: React.SFC<CharacterStatsProps> = props => {
    const stats = statSheets[props.character.characterClass!]

    console.log({stats})
    return (
        <React.Fragment>
        </React.Fragment>
    )
}

export default CharacterStats