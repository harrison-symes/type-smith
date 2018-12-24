import {connect} from "react-redux"
import Entry from "./Entry.component"

const mapStateToProps = ({
    socket,
    auth
}) => ({
    socket,
    auth
})

export default connect(mapStateToProps)(Entry)