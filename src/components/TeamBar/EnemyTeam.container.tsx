import {connect} from "react-redux"
import EnemyTeam from "./EnemyTeam.component"


const mapStateToProps = ({
    gameInfo,
    opponentTeam,
    socket
}) => ({
    gameInfo,
    opponentTeam,
    socket
})

export default connect(mapStateToProps)(EnemyTeam)