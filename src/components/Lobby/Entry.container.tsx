import {connect} from "react-redux"
import Entry from "./Entry.component"

const mapStateToProps = ({
    socket,
    auth,
    gameRequests
}) => ({
    socket,
    auth,
    gameRequests
})

export default connect(mapStateToProps)(Entry)