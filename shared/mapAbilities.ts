import { GAME_ATTACKS, ATTACK_STACK_TYPES } from "./attacks";
import * as React from "react"
import { ATTACK_TYPES } from "./types";
import { Character } from "../src/interfacing/characters";

export default {
    [GAME_ATTACKS.SLASH]: () => ({
        name: [GAME_ATTACKS.SLASH],
        cost: 1,
        power: 1,
        descriptiom: "Attack the opponent for 100% of Character Power",
        isUltimate: false,
        type: ATTACK_TYPES.SWORDS,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
    [GAME_ATTACKS.ACCELERATE]: () => ({
        name: [GAME_ATTACKS.ACCELERATE],
        cost: 1,
        power: 0,
        descriptiom: "Gain 1 Speed and 1 Power",
        isUltimate: false,
        speedGain: 1,
        powerGain: 1,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.GAIN_SPEED,
            ATTACK_STACK_TYPES.GAIN_POWER,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
    [GAME_ATTACKS.RECUPERATE]: () => ({
        name: [GAME_ATTACKS.RECUPERATE],
        cost: 0,
        power: 0,
        descriptiom: "Heal for 5 and gain 2 Energy",
        isUltimate: false,
        isStatic: true,
        healAmount: 5,
        energyGain: 2,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.HEAL_SELF,
            ATTACK_STACK_TYPES.GAIN_ENERGY
        ]
    }),
    [GAME_ATTACKS.TANK_UP]: () => ({
        name: [GAME_ATTACKS.TANK_UP],
        cost: 1,
        power: 0,
        descriptiom: "Gain X Defense and X Max Health",
        isUltimate: false,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.GAIN_DEFENSE,
            ATTACK_STACK_TYPES.INCREASE_MAX_HEALTH,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
}