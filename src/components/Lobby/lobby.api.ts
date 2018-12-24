import { getRequest } from "../../utils/request";
import { receiveLobby } from "./lobby.actions";

export const getLobby = () =>
    async dispatch => {
        try {
            const res = await getRequest("lobby")
            dispatch(receiveLobby(res.body))
        } catch (e) {
            console.log(e)
        }
    }