import {connect} from "react-redux"
import TeamBar from "./TeamBar.component"


const mapStateToProps = ({
    gameInfo,
    userTeam,
    opponentTeam,
    socket
}) => ({
    gameInfo,
    userTeam,
    opponentTeam,
    socket
})

export default connect(mapStateToProps)(TeamBar)