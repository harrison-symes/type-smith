import {connect} from "react-redux"
import EnemyCharacter, { EnemyCharacterProps } from "./EnemyCharacter.component"

const mapStateToProps = ({
    opponentTeam,
    socket,
}) => ({
    character: opponentTeam
        .find(character => character.isActive),
    socket
})


export default connect(mapStateToProps)(EnemyCharacter)