import { Socket } from "socket.io";
import { GameState } from "../../src/components/GameScreen/game.interface";
import { GameRequest } from "../../src/components/GameRequests/interface";
import createCharacter from "../gameUtils.ts/createCharacter";
import { LOBBY_SOCKET_CHANNEL, GAME_SOCKET_CHANNEL, TEAM_PREVIEW_SOCKET_CHANNEL, GAME_ACTION_SOCKET_CHANNEL } from "../../shared/socketChannels";
import { GameTurnAction, attackActionMapper } from "../../shared/attacks";

const games = {

}
//leave this here :)

export const game = (socket, io) => {
    joinRoom(socket, io)
}

const initTurn = (turnNumber, player_ids) => ({
    [player_ids[0]]: [],
    [player_ids[1]]: [],
    player_ids,
    playersSubmitted: 0,
    isComplete: false
})

const organiseGameInfo = (socket_id, roomId, request:GameRequest) => {
    const isSender = request.sender_socket_id == socket_id
    
    const newInfo : Partial<GameState> = {
        user_socket_id: socket_id,
        opponent_socket_id: request[
            `${isSender ? "target" : "sender"}_socket_id` 
        ],
        opponent_id: request[
            isSender ? "target_id" : "sender_id"
        ],
        user_id: request[
            isSender ? "sender_id" : "target_id"
        ],
        roomId
        
    }

    return newInfo
}

const joinRoom = (socket:Socket, io) => {
    socket.on(LOBBY_SOCKET_CHANNEL.JOIN_ROOM, (roomId, request) => {
        socket.join(roomId)
        socket.on("disconnect", () => delete games[roomId])
        const gameInfo = organiseGameInfo(socket.id, roomId, request)
        
        if (!games[roomId]) games[roomId] = {
            readyPlayers: 0,
            player_ids: [],
            player_socket_ids: [],
            turns: []
        } 
        const obj = games[roomId][socket.id] = {
            user_id: gameInfo.user_id,
            team: [],
            socket_id: socket.id
        }
        games[roomId].player_ids.push(gameInfo.user_id)
        games[roomId].player_socket_ids.push(socket.id)
        games[roomId][gameInfo.user_id] = obj
        
        io.to(socket.id).emit(
            GAME_SOCKET_CHANNEL.READY_GAME,
            gameInfo
        )
        roomListeners(socket, io)
    })

   
}

const mapTeamToGameObjects = (owner_id, team) => {
    return team.map(character => {
        const mapped = createCharacter(owner_id, character)
        return mapped
    })
}

const getOpponentId = (user_id, game) => {
    return game.player_ids.find(id => id != user_id)
}
const getOpponentSocketId = (socket_id, game) => {
    return game.player_socket_ids.find(id => id != socket_id)
}

const roomListeners = (socket, io) => {
    socket.on(
        TEAM_PREVIEW_SOCKET_CHANNEL.SUBMIT_TEAM,
        (roomId, user_id, team) => {
            const game = games[roomId]
            const opponent_id = getOpponentId(user_id, game)
            const opponent_socket_id = getOpponentSocketId(socket.id, game)
            game[user_id].team = mapTeamToGameObjects(user_id, team)
            game.readyPlayers++

            if (game.readyPlayers == 2) {
                io.to(socket.id).emit(
                    GAME_SOCKET_CHANNEL.RECEIVE_TEAM_INFO,
                    {
                        user_team: game[user_id].team,
                        opponent_team: game[opponent_id].team
                    }
                )
                io.to(opponent_socket_id).emit(
                    GAME_SOCKET_CHANNEL.RECEIVE_TEAM_INFO,
                    {
                        user_team: game[opponent_id].team,
                        opponent_team: game[user_id].team
                    }
                )
                game.turns.push(initTurn(1, game.player_ids))
            }
        }
    )

    socket.on(
        GAME_ACTION_SOCKET_CHANNEL.SUBMIT_TURN_ACTION,
        (roomId, user_id, action:GameTurnAction) => {
            const game = games[roomId]
            const turn = game.turns[game.turns.length -1]

            const {character, opponent, ability} = action

            const actionStack = ability.stack.map(action_type => {
                return attackActionMapper[action_type](character, opponent, ability)
            })

            turn[!turn.action_one ? "action_one" : "action_two"] = {
                actionStack,
                character
            }
            turn.playersSubmitted++
            
            if (turn.playersSubmitted < 2) {
                console.log("waiting for player 2")
                io.to(socket.id).emit(
                    GAME_ACTION_SOCKET_CHANNEL.WAIT_FOR_OPPONENT
                )
                return
            }
            
            const finalStack = [
                [...turn.action_one.actionStack],
                [...turn.action_two.actionStack]
            ]

            console.log(finalStack)
            
            //end turn
            turn.isComplete = true;
            
            //create next turn
            game.turns.push(initTurn(turn.id + 1, turn.player_ids))
            
            //submit stack to client side
            io.to(roomId).emit(
                GAME_ACTION_SOCKET_CHANNEL.RECEIVE_TURN_STACK,
                finalStack
            )

        }
    )
}