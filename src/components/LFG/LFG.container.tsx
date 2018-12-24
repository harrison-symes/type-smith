import {connect} from "react-redux";
import Join from "./LFG.component";
import { ownPlayerJoinedLobby, ownPlayerLeftLobby } from "./LFG.actions";

const mapStateToProps = ({
    socket,
    isLFG,
    auth
}) => ({
    socket,
    isLFG,
    auth
})

const mapDispatchToProps = dispatch => ({
    ownPlayerJoinedLobby: () => dispatch(ownPlayerJoinedLobby()),
    ownPlayerLeftLobby: (user_id:number) => dispatch(ownPlayerLeftLobby(user_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Join)