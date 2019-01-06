import { Socket } from "socket.io";
import { GameState, GAME_TYPES, TurnStage } from "../../src/components/GameScreen/game.interface";
import { GameRequest } from "../../src/components/GameRequests/interface";
import createCharacter from "../gameUtils.ts/createCharacter";
import { LOBBY_SOCKET_CHANNEL, GAME_SOCKET_CHANNEL, TEAM_PREVIEW_SOCKET_CHANNEL, GAME_ACTION_SOCKET_CHANNEL } from "../../shared/socketChannels";
import { GameTurnAction, attackActionMapper, ATTACK_STACK_TYPES, GAME_ATTACKS } from "../../shared/attacks";

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
    playersSubmittedSecond: 0,
    playersValidated: 0,
    isComplete: false,
    turnActions: [],
    deathSwitchesNeeded: 0,
    deathSwitchesValidated: 0,
    deathSwitchActions: []
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
    console.log(team)
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

const orderTurnActions = ([actionOne, actionTwo]) => {
    let first;
    let second;
    
    const priorityOne = actionOne.ability.priority || 0
    const priorityTwo = actionTwo.ability.priority || 0
    console.log({priorityOne, priorityTwo})
    if (priorityOne == priorityTwo) {
        //no priority, speed check

        const speedOne = actionOne.character.speed
        const speedTwo = actionTwo.character.speed
        if (speedOne > speedTwo) {
            console.log(actionOne.character.characterClass, "first")
            first = actionOne
            second = actionTwo
        }
        else if (speedTwo > speedOne) {
            console.log(actionTwo.character.characterClass, "first")
            first = actionTwo
            second = actionOne
        }
        else {
            const speedTie = Math.random() > 0.5
            const winner = speedTie ? actionOne : actionTwo
            const loser = speedTie ? actionTwo : actionOne
            //speed tie action added
            // winner.ability.stack.push({

            // }) 
            console.log(winner.character.characterClass, "won speed tie")
            first = winner
            second = loser
        }
    } else {
        //a move has higher / lower priority
        console.log("priority off")
        if (priorityOne > priorityTwo) {
            first = actionOne
            second = actionTwo
        } else if (priorityTwo > priorityOne) {
            first = actionTwo
            second = actionOne
        }
    }
    
    console.log("first:", first.ability.name)
    console.log("second:", second.ability.name)
    
    return [
        second,
        first,
    ] //second is first for pop()
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

            const actionObj = {
                character,
                opponent,
                ability
            }

            turn.turnActions.push(actionObj)
            turn.playersSubmitted++
            
            io.to(socket.id).emit(
                GAME_ACTION_SOCKET_CHANNEL.WAIT_FOR_OPPONENT
            )
            if (turn.playersSubmitted < 2) {
                console.log("waiting for player 2")
                return
            }
            
            turn.turnActions = orderTurnActions(turn.turnActions)
            //execute first stack
            const firstStack = turn.turnActions.pop()
            if (firstStack.character.isSpiked && firstStack.ability.name == GAME_ATTACKS.SWITCH) {
                firstStack.ability.stack.push(
                    ATTACK_STACK_TYPES.ACTIVATE_SPIKE_TRAP
                )
            }
            const actionStack = [
                ATTACK_STACK_TYPES.USE_ATTACK,
                ...firstStack.ability.stack
            ].map(action_type => {
                return attackActionMapper[action_type](firstStack.character, firstStack.opponent, firstStack.ability)
            })

            const finalStack = [
                ...actionStack
            ]

            //submit stack to client side
            io.to(roomId).emit(
                GAME_ACTION_SOCKET_CHANNEL.RECEIVE_FIRST_TURN_STACK,
                finalStack
            )   
                
        }
    )

    socket.on(
        GAME_ACTION_SOCKET_CHANNEL.CHARACTER_DIED,
        (roomId) => {
            const game = games[roomId]
            const turn = game.turns[game.turns.length - 1]
            
            turn.deathSwitchesNeeded++
            io.to(socket.id).emit(
                GAME_ACTION_SOCKET_CHANNEL.SWITCH_CHARACTER_REQUEST
            )
        }
    )
            
    socket.on(
        GAME_ACTION_SOCKET_CHANNEL.SUBMIT_REQUIRED_SWITCH,
        (roomId, user_id, action:GameTurnAction) => {
            const game = games[roomId]
            const turn = game.turns[game.turns.length - 1]

            turn.deathSwitchActions.push(action)
            turn.deathSwitchesValidated++

            io.to(socket.id).emit(
                GAME_ACTION_SOCKET_CHANNEL.WAIT_FOR_OPPONENT
            )

            if (turn.deathSwitchesValidated == turn.deathSwitchesNeeded) {
                const [actionOne, actionTwo] = turn.deathSwitchActions

                const actionStack = [
                    ATTACK_STACK_TYPES.USE_ATTACK,
                    ...actionOne.ability.stack
                ].map(action_type => {
                    return attackActionMapper[action_type](actionOne.character, actionOne.opponent, actionOne.ability)
                })

                let secondStack = []
                if (turn.deathSwitchesNeeded == 2) {
                    secondStack = actionTwo.ability.stack.map(action_type => {
                        return attackActionMapper[action_type](actionTwo.character, actionTwo.opponent, actionTwo.ability)
                    })
                }

                const finalStack = [
                    ...actionStack,
                    ...secondStack
                ]

                io.to(roomId).emit(
                    GAME_ACTION_SOCKET_CHANNEL.RECEIVE_SECOND_TURN_STACK,
                    finalStack
                )  
            }

        }
    )

    socket.on(
        GAME_ACTION_SOCKET_CHANNEL.REQUEST_SECOND_STACK,
        (roomId, user_id, character) => {
            const game = games[roomId]
            const turn = game.turns[game.turns.length - 1]
            console.log("second stack")
            
            const secondStack = turn.turnActions[0]

            if (secondStack.character.owner_id == user_id) {
                secondStack.character = character
            } else {
                secondStack.opponent = character
            }

            turn.playersSubmittedSecond++
            if (turn.playersSubmittedSecond < 2) {
                console.log("waiting for player 2")
                return
            }

            turn.turnActions.pop()
            let actionStack = []

            if (secondStack.character.isTrapped && secondStack.ability.name == GAME_ATTACKS.SWITCH) {
                //nothing happens, switch fails
            }
            else if (secondStack.character.isAlive) {
                if (secondStack.character.isSpiked && secondStack.ability.name == GAME_ATTACKS.SWITCH) {
                    secondStack.ability.stack.push(
                        ATTACK_STACK_TYPES.ACTIVATE_SPIKE_TRAP
                    )
                }
                actionStack = [
                    ATTACK_STACK_TYPES.USE_ATTACK,
                    ...secondStack.ability.stack
                ].map(action_type => {
                    return attackActionMapper[action_type](secondStack.character, secondStack.opponent, secondStack.ability)
                })
            }

            const finalStack = [
                ...actionStack
            ]

            io.to(roomId).emit(
                GAME_ACTION_SOCKET_CHANNEL.RECEIVE_SECOND_TURN_STACK,
                finalStack
            )  
        }
    )
            
    socket.on(
        GAME_ACTION_SOCKET_CHANNEL.VALIDATE_TURN,
        (roomId) => {
            const game = games[roomId]
            const turn = game.turns[game.turns.length - 1]   
            
            turn.playersValidated++
            
            if (turn.playersValidated != 2) {
                
                return
            }
            turn.isComplete = true
            game.turns.push(initTurn(turn.id + 1, turn.player_ids))
            
            //turn was valid
            // const opponent_socket_id = getOpponentSocketId(socket.id, game)

            io.to(roomId).emit(
                GAME_ACTION_SOCKET_CHANNEL.TURN_VALIDATED
            )
        }
    )
}