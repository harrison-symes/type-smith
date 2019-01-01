import { GAME_ATTACKS, ATTACK_STACK_TYPES } from "./attacks";
import * as React from "react"
import { ATTACK_TYPES } from "./types";
import { Character } from "../src/interfacing/characters";

export default {
    [GAME_ATTACKS.ULTIMATE]: () => ({
        name: [GAME_ATTACKS.ULTIMATE],
        cost: 100,
        power: 1,
        descriptiom: "Attack the opponent for 100% of Character Power",
        isUltimate: false,
        type: ATTACK_TYPES.SWORDS,
        priority: 0,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
    [GAME_ATTACKS.SLASH]: () => ({
        name: [GAME_ATTACKS.SLASH],
        cost: 1,
        power: 1,
        descriptiom: "Attack the opponent for 100% of Character Power",
        isUltimate: false,
        type: ATTACK_TYPES.SWORDS,
        priority: 0,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
    [GAME_ATTACKS.RECKLESS_SLAM]: () => ({
        name: [GAME_ATTACKS.RECKLESS_SLAM],
        cost: 2,
        power: 2,
        selfDamage: 0.5,
        descriptiom: "Attack the opponent for 200% of Power. Damage yourself for 50% of Power",
        isUltimate: false,
        type: ATTACK_TYPES.SWORDS,
        priority: 0,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.DAMAGE_SELF,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
    [GAME_ATTACKS.TANK_UP]: () => ({
        name: [GAME_ATTACKS.TANK_UP],
        cost: 1,
        power: 0,
        descriptiom: "Gain 1 Defense and 5 Max Health",
        isUltimate: false,
        healthGain: 5,
        defenseGain: 1,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.GAIN_DEFENSE,
            ATTACK_STACK_TYPES.INCREASE_MAX_HEALTH,
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
        priority: 0,
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
        priority: 0,
        stack: [
            ATTACK_STACK_TYPES.HEAL_SELF,
            ATTACK_STACK_TYPES.GAIN_ENERGY
        ]
    }),
    
    [GAME_ATTACKS.BACKSTAB]: () => ({
        name: [GAME_ATTACKS.BACKSTAB],
        cost: 3,
        power: 1,
        descriptiom: "Damage the opponent for 100% Power. +2 Priority",
        isUltimate: false,
        priority: 2,
        type: ATTACK_TYPES.DAGGERS,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.FIREBALL]: () => ({
        name: [GAME_ATTACKS.FIREBALL],
        cost: 2,
        power: 1,
        descriptiom: "Damage the opponent for 100% Power. -2 Priority",
        isUltimate: false,
        priority: -2,
        type: ATTACK_TYPES.FIRE,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.MOLTEN_CORE]: () => ({
        name: [GAME_ATTACKS.MOLTEN_CORE],
        cost: 2,
        power: 1,
        descriptiom: "Gain 5 Power and 1 Speed",
        isUltimate: false,
        priority: 0,
        powerGain: 5,
        speedGain: 1,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.GAIN_POWER,
            ATTACK_STACK_TYPES.GAIN_SPEED,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.FROST_ARMOUR]: () => ({
        name: [GAME_ATTACKS.FROST_ARMOUR],
        cost: 2,
        power: 0,
        descriptiom: "Gain 10 Defense, but lose 1 Speed",
        isUltimate: false,
        priority: 0,
        defenseGain: 10,
        speedGain: -1,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.GAIN_DEFENSE,
            ATTACK_STACK_TYPES.GAIN_SPEED,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.CURSE]: () => ({
        name: [GAME_ATTACKS.CURSE],
        cost: 1,
        power: 0,
        descriptiom: "Lower all stats of you and your opponent by 1",
        isUltimate: false,
        priority: 0,
        statChange: -1,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.CHANGE_ALL_STATS_SELF,
            ATTACK_STACK_TYPES.CHANGE_ALL_STATS_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.ENTRAP]: () => ({
        name: [GAME_ATTACKS.ENTRAP],
        cost: 3,
        power: 0,
        descriptiom: "Trap your opponent, preventing them from switching",
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.TRAP_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.BLOOD_MOON]: () => ({
        name: [GAME_ATTACKS.BLOOD_MOON],
        cost: 2,
        power: 0,
        descriptiom: "Damage your opponent for 100% of OPPONENT's Power, ignoring defense",
        isStatic: true,
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.DEATH,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT_BLOOD_MOON,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.HOLY_RADIANCE]: () => ({
        name: [GAME_ATTACKS.HOLY_RADIANCE],
        cost: 2,
        power: 0,
        healAmount: 5,
        descriptiom: "Restore 5 Health to your entire team",
        isStatic: true,
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.HEAL_TEAM_SELF,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.BLESSED_HAMMER]: () => ({
        name: [GAME_ATTACKS.BLESSED_HAMMER],
        cost: 1,
        power: 0.5,
        descriptiom: "Damage opponent for 50% of Power, then heal yourself for 5",
        isStatic: true,
        healAmount: 5,
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.HOLY,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.HEAL_SELF,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.INSPIRE]: () => ({
        name: [GAME_ATTACKS.INSPIRE],
        cost: 2,
        power: 0.5,
        defenseGain: 1,
        powerGain: 1,
        descriptiom: "Increase the Defense and Power of your team by 1",
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_DEFENSE,
            ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_POWER,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),


}