import db from "./connection"

export const getLobbyList = () => 
    db("lobby")
        .join("users", "lobby.user_id", "users.id")
        .select("lobby.*", "users.user_name")
        
export const getLobbyItem = (id: number) => 
db("lobby")
.where("lobby.id", id)
.orWhere("lobby.socket_id", id)
.join("users", "lobby.user_id", "users.id")
.select("lobby.*", "users.user_name")
.first()
    
export const joinLobby = async (socket_id: string, user_id: number) => {
    const entry_id = await db("lobby").insert({user_id, socket_id}, "id")
    if (entry_id.length !== 1) return null
    return await getLobbyItem(entry_id[0])
}
    
export const leaveLobby = (socket_id:string, user_id: number) => 
    db("lobby")
        .where({user_id})
        .orWhere({socket_id})
        .del()
