import { connect } from "react-redux";

import List from "./List.component"
import { getLobby } from "./lobby.api";
import { addEntryToLobby, removeEntryFromLobby } from "./lobby.actions";
import { LobbyEntry } from "./interface";

const mapStateToProps = ({
    socket,
    auth,
    lobby
}) => ({
    socket,
    auth,
    lobby
})

const mapDispatchToProps = (dispatch) => ({
    getLobby: () => dispatch(getLobby()),
    addEntryToLobby: (entry:LobbyEntry) => dispatch(addEntryToLobby(entry)),
    removeEntryFromLobby: (user_id: number) => dispatch(removeEntryFromLobby(user_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(List)