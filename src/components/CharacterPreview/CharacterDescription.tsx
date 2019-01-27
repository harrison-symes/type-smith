import * as React from "react"

interface CharacterDescriptionProps {
    character: any
}

const CharacterDescription : React.SFC<CharacterDescriptionProps> = (props) => (
    <React.Fragment>
        <div className="character-preview--description">
            <span className="title">Usage:</span>
            <div className="text">
                {props.character.description.usage}
            </div>
        </div>
        <div className="character-preview--description">
            <span className="title">Strenths:</span>
            <div className="text">
                {props.character.description.strengths}
            </div>
        </div>
        <div className="character-preview--description">
            <span className="title">Weaknesses:</span>
            <div className="text">
                {props.character.description.weaknesses}
            </div>
        </div>
    </React.Fragment>
)

export default CharacterDescription