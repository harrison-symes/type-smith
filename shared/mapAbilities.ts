import { GAME_ATTACKS } from "./attacks";
import * as React from "react"
import { ATTACK_TYPES } from "./types";


export default {
    [GAME_ATTACKS.SLASH]: () => ({
        name: [GAME_ATTACKS.SLASH],
        cost: 1,
        power: 0.5,
        descriptiom: "Attack the opponent for 50% of Character Power",
        isUltimate: false,
        type: ATTACK_TYPES.SWORDS
    }),
    [GAME_ATTACKS.ACCELERATE]: () => ({
        name: [GAME_ATTACKS.ACCELERATE],
        cost: 1,
        power: 0,
        descriptiom: "Gain X Speed and X Attack",
        isUltimate: false,
        type: ATTACK_TYPES.STATUS
    }),
    [GAME_ATTACKS.RECUPERATE]: () => ({
        name: [GAME_ATTACKS.RECUPERATE],
        cost: 0,
        power: 0,
        descriptiom: "Heal for X and gain X Energy",
        isUltimate: false,
        type: ATTACK_TYPES.STATUS
    }),
    [GAME_ATTACKS.TANK_UP]: () => ({
        name: [GAME_ATTACKS.TANK_UP],
        cost: 1,
        power: 0,
        descriptiom: "Gain X Armor and X Health",
        isUltimate: false,
        type: ATTACK_TYPES.STATUS
    }),
}