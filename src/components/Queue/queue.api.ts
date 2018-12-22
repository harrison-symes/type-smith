import { getRequest } from "../../utils/request";
import { receiveQueue } from "./queue.actions";

export const getQueue = () => 
    async dispatch => {
        try {
            const res = await getRequest("lobby")
            dispatch(receiveQueue(res.body))
        } catch(e) {
            console.log(e)
        }
    }