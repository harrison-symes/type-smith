import {connect} from "react-redux"
import EnemyCharacter, { EnemyCharacterProps } from "./EnemyCharacter.component"

const mapStateToProps = ({
    opponentTeam
}) => ({
    character: opponentTeam
        .find(character => character.isActive)
})


export default connect(mapStateToProps)(EnemyCharacter)