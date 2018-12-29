import {connect} from "react-redux";
import LFG from "./LFG.component";

const mapStateToProps = ({
    socket,
    isLFG,
    auth
}) => ({
    socket,
    isLFG,
    auth
})

export default connect(mapStateToProps)(LFG)