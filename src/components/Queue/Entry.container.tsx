import {connect} from "react-redux"
import Entry from "./Entry.component"

const mapStateToProps = ({
    socket,
    auth
}) => ({
    socket,
    auth
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Entry)