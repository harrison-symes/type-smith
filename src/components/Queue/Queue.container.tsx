import {connect} from "react-redux";
import Queue from "./Queue.component";

const mapStateToProps = ({
    socket
}) => ({
    socket
})

export default connect(mapStateToProps)(Queue)