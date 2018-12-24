import {connect} from "react-redux"
import GameRequests from "./GameRequests.component"

const mapStateToProps = ({
    gameRequests
}) => ({
    gameRequests
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(GameRequests)