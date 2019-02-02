import { GAME_ATTACKS, ATTACK_STACK_TYPES } from "./attacks";
import * as React from "react"
import { ATTACK_TYPES } from "./types";
import { Character } from "./characters";

export default {
    [GAME_ATTACKS.ULTIMATE]: () => ({
        name: [GAME_ATTACKS.ULTIMATE],
        cost: 100,
        power: 1,
        description: "Attack the opponent for 100% of Character Power",
        isUltimate: false,
        type: ATTACK_TYPES.SWORDS,
        priority: 0,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
    [GAME_ATTACKS.DEMOLISH]: () => ({
        name: [GAME_ATTACKS.DEMOLISH],
        icon: "ra-swords-power",
        cost: 5,
        power: 1,
        description: "Damage each enemy team member for 100% of Character Power",
        isUltimate: true,
        type: ATTACK_TYPES.SWORDS,
        priority: 0,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_TEAM_DEMOLISH,
            ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE
        ]
    }),
    [GAME_ATTACKS.SLASH]: () => ({
        name: [GAME_ATTACKS.SLASH],
        icon: "ra-sword-brandish",
        cost: 1,
        power: 1,
        description: "Attack the opponent for 100% of Character Power and lower their defense by 1.",
        isUltimate: false,
        type: ATTACK_TYPES.SWORDS,
        priority: 0,
        defenseGain: -1,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT_WARRIOR,
            ATTACK_STACK_TYPES.LOWER_OPPONENT_DEFENSE,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
    [GAME_ATTACKS.RECKLESS_SLAM]: () => ({
        name: [GAME_ATTACKS.RECKLESS_SLAM],
        icon: "ra-earth-crack",
        cost: 3,
        power: 1.5,
        selfDamage: 0.5,
        description: "Attack the opponent for 150% of Power. Damage yourself for 50% of Power",
        isUltimate: false,
        type: ATTACK_TYPES.SWORDS,
        priority: 0,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT_WARRIOR,
            ATTACK_STACK_TYPES.DAMAGE_SELF,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
    [GAME_ATTACKS.TANK_UP]: () => ({
        name: [GAME_ATTACKS.TANK_UP],
        icon: "ra-armor-upgrade",
        cost: 2,
        power: 0,
        description: "Gain 2 Defense and 10 Max Health",
        isUltimate: false,
        healthGain: 10,
        defenseGain: 2,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.GAIN_DEFENSE,
            ATTACK_STACK_TYPES.INCREASE_MAX_HEALTH,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    //assassin
    [GAME_ATTACKS.ASSASSINATE]: () => ({
        name: [GAME_ATTACKS.ASSASSINATE],
        icon: "ra-split-body",
        cost: 5,
        power: 4,
        description: "Attack the opponent for 400% of Character Power.",
        isUltimate: true,
        type: ATTACK_TYPES.DAGGERS,
        priority: 0,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE
        ]
    }),
    [GAME_ATTACKS.ACCELERATE]: () => ({
        name: [GAME_ATTACKS.ACCELERATE],
        icon: "ra-running-ninja",
        cost: 3,
        power: 0,
        description: "Gain 1 Speed and 3 Power",
        isUltimate: false,
        speedGain: 1,
        powerGain: 3,
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
        icon: "ra-bottled-bolt",
        cost: 1,
        power: 0,
        description: "Heal for 10 and gain 3 Energy",
        isUltimate: false,
        isStatic: true,
        healAmount: 10,
        energyGain: 3,
        type: ATTACK_TYPES.STATUS,
        priority: 0,
        stack: [
            ATTACK_STACK_TYPES.HEAL_SELF,
            ATTACK_STACK_TYPES.GAIN_ENERGY
        ]
    }),
    
    [GAME_ATTACKS.BACKSTAB]: () => ({
        name: [GAME_ATTACKS.BACKSTAB],
        icon: "ra-bouncing-sword",
        cost: 2,
        power: 1,
        description: "Attack the opponent for 100% Power. Power is doubled for targets below 30% health. +2 Priority",
        isUltimate: false,
        priority: 2,
        type: ATTACK_TYPES.DAGGERS,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT_BACKSTAB,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.METEOR]: () => ({
        name: [GAME_ATTACKS.METEOR],
        icon: "ra-burning-meteor",
        cost: 5,
        power: 2.5,
        teamPower: 0.5,
        description: "Damage the opponent for 300% Power, and all other enemy team members for 50% Player Power",
        isUltimate: true,
        priority: 0,
        type: ATTACK_TYPES.FIRE,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.DAMAGE_TEAM_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE
        ]
    }),

    [GAME_ATTACKS.FIREBALL]: () => ({
        name: [GAME_ATTACKS.FIREBALL],
        icon: "ra-fire-tail",
        cost: 2,
        power: 1.2,
        description: "Damage the opponent for 120% Power. -2 Priority",
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
        icon: "ra-burning-passion",
        cost: 3,
        power: 5,
        description: "Deal 5 damage to the opponent, ignoring defense. Gain 3 Power",
        isUltimate: false,
        priority: 0,
        powerGain: 3,
        isStatic: true,
        type: ATTACK_TYPES.FIRE,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.GAIN_POWER,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.FROST_ARMOUR]: () => ({
        name: [GAME_ATTACKS.FROST_ARMOUR],
        icon: "ra-scale-mail",
        cost: 2,
        power: 0,
        description: "Gain 3 Defense, but lose 1 Speed",
        isUltimate: false,
        priority: 0,
        defenseGain: 3,
        speedGain: -1,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.GAIN_DEFENSE,
            ATTACK_STACK_TYPES.GAIN_SPEED,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.WITCHING_HOUR]: () => ({
        name: [GAME_ATTACKS.WITCHING_HOUR],
        icon: "ra-witch-flight",
        cost: 5,
        power: 0,
    description: "Lower the Power, Energy, Defense and Speed of each member of your opponent's team by 1. Heal yourself to full",
        isUltimate: true,
        priority: 0,
        statChange: -1,
        isStatic: true,
        healAmount: 1000,
        type: ATTACK_TYPES.DEATH,
        stack: [
            ATTACK_STACK_TYPES.HEAL_SELF,
            ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_ALL_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE,
            ATTACK_STACK_TYPES.WITCH_PASSIVE
        ]
    }),
    [GAME_ATTACKS.CURSE]: () => ({
        name: [GAME_ATTACKS.CURSE],
        icon: "ra-cursed-star",
        cost: 2,
        power: 0,
        description: "Lower your opponent's Power, Energy, Defense by 3 and Speed by 1. Lose 10 health.",
        isUltimate: false,
        priority: 0,
        powerGain: -3,
        defenseGain: -3,
        energyGain: -3,
        speedGain: -1,
        isStatic: true,
        damageAmount: 10,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_SELF,
            ATTACK_STACK_TYPES.LOWER_OPPONENT_DEFENSE,
            ATTACK_STACK_TYPES.LOWER_OPPONENT_POWER,
            ATTACK_STACK_TYPES.LOWER_OPPONENT_ENERGY,
            ATTACK_STACK_TYPES.LOWER_OPPONENT_SPEED,
            ATTACK_STACK_TYPES.SPEND_ENERGY,
            ATTACK_STACK_TYPES.WITCH_PASSIVE
        ]
    }),

    //note entrap doesnt prevent switch on same turn as cast
    [GAME_ATTACKS.ENTRAP]: () => ({
        name: [GAME_ATTACKS.ENTRAP],
        icon: "ra-quicksand",
        cost: 3,
        power: 0,
        description: "Trap your opponent, preventing them from switching until they have no other choice",
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.TRAP_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY,
            ATTACK_STACK_TYPES.WITCH_PASSIVE
        ]
    }),

    [GAME_ATTACKS.BLOOD_MOON]: () => ({
        name: [GAME_ATTACKS.BLOOD_MOON],
        icon: "ra-evil-moon",
        cost: 1,
        power: 1,
        description: "Attack your opponent for 100% of OPPONENT's Power.",
        isStatic: true,
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.DEATH,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT_BLOOD_MOON,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.SANCTUARY]: () => ({
        name: [GAME_ATTACKS.SANCTUARY],
        icon: "ra-guarded-tower",
        cost: 5,
        power: 0,
        description: "Heal your team for 100% of Power, gain 5 Defense. +6 Priority",
        isUltimate: true,
        priority: 6,
        defenseGain: 5,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.HEAL_TEAM_SELF,
            ATTACK_STACK_TYPES.GAIN_DEFENSE,
            ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE
        ]
    }),

    [GAME_ATTACKS.HOLY_RADIANCE]: () => ({
        name: [GAME_ATTACKS.HOLY_RADIANCE],
        icon: "ra-icarus",
        cost: 2,
        power: 0,
        healAmount: 5,
        description: "Restore 5 Health to your each member of your team",
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
        icon: "ra-thor-hammer",
        cost: 1,
        power: 1,
        description: "Attack the opponent for 100% of Power, then heal yourself for 5",
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
        icon: "ra-rally-the-troops",
        cost: 4,
        power: 0.5,
        defenseGain: 1,
        powerGain: 1,
        description: "Increase the Defense and Power of your team by 1",
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_DEFENSE,
            ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_POWER,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.RAPID_FIRE]: () => ({
        name: [GAME_ATTACKS.RAPID_FIRE],
        icon: "ra-reticule",
        cost: 5,
        power: 1,
        altPower: 0.3,
        defenseGain: 1,
        powerGain: 1,
        energyGain: -100,
        description: "Attack for 100% of Power. Consume all remaining energy and deal 30% more damage for each point of energy consumed",
        isUltimate: true,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT_RAPID_FIRE,
            ATTACK_STACK_TYPES.GAIN_ENERGY,
            ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE
        ]
    }),
    [GAME_ATTACKS.PIERCING_SHOT]: () => ({
        name: [GAME_ATTACKS.PIERCING_SHOT],
        icon: "ra-supersonic-bullet",
        cost: 2,
        power: 1,
        description: "Attack for 100% of power, ignoring defense",
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT_IGNORE_ARMOUR,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
    [GAME_ATTACKS.RELOAD]: () => ({
        name: [GAME_ATTACKS.RELOAD],
        icon: "ra-ammo-box",
        cost: 1,
        power: 0,
        energyGain: 3,
        ultimateGain: 1,
        description: "Gain 3 Energy and 1 Ultimate Charge",
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.GAIN_ENERGY,
            ATTACK_STACK_TYPES.GAIN_ULTIMATE_CHARGE,
        ]
    }),
    [GAME_ATTACKS.SPIKE_TRAP]: () => ({
        name: [GAME_ATTACKS.SPIKE_TRAP],
        icon: "ra-caltrops",
        cost: 1,
        power: 0,
        description: "Spike trap the opponent, causing them to take 10 damage upon switching out.",
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.APPLY_SPIKE_TRAP_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.DEAD_RISE]: () => ({
        name: [GAME_ATTACKS.DEAD_RISE],
        icon: "ra-raise-zombie",
        cost: 5,
        power: 1,
        description: "Return all dead teamates to life with 10 health",
        isUltimate: true,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.DEAD_RISE,
            ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE
        ]
    }),
    [GAME_ATTACKS.PLAGUE]: () => ({
        name: [GAME_ATTACKS.PLAGUE],
        icon: "ra-vomiting",
        cost: 2,
        power: 1,
        description: "Plague the opponent, causing them to take 5 Damage any time that they use an ability",
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.APPLY_PLAGUE_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
    [GAME_ATTACKS.DEATH_TOUCH]: () => ({
        name: [GAME_ATTACKS.DEATH_TOUCH],
        icon: "ra-skeletal-hand",
        cost: 1,
        power: 0,
        energyGain: 3,
        ultimateGain: 1,
        description: "Attack the opponent for 100% of Power. Deal 5 more more damage if the target is afflicted with Plague.",
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT_DEATH_TOUCH,
            ATTACK_STACK_TYPES.SPEND_ENERGY,
        ]
    }),
    [GAME_ATTACKS.BONE_SHIELD]: () => ({
        name: [GAME_ATTACKS.BONE_SHIELD],
        icon: "ra-crossed-bones",
        cost: 5,
        power: 0,
        description: "The Necromancer is immune to any attack this turn. +20 Priority",
        isUltimate: false,
        priority: 20,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.IMMUNE_FOR_TURN,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),

    [GAME_ATTACKS.COMBO_BREAKER]: () => ({
        name: [GAME_ATTACKS.COMBO_BREAKER],
        icon: "ra-armor-punch",
        cost: 1,
        power: 1,
        altPower: 0.5,
        description: "Consume all of your Ultimate Charges.Attack the opponent for 100 % of Power, plus 50% for each Charge consumed.",
        isUltimate: true,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT_COMBO_BREAKER,
            ATTACK_STACK_TYPES.SPEND_ALL_ULTIMATE_CHARGE
        ]
    }),
    [GAME_ATTACKS.THROAT_PUNCH]: () => ({
        name: [GAME_ATTACKS.THROAT_PUNCH],
        icon: "ra-punch",
        cost: 2,
        power: 0.5,
        description: "Attack the opponent for 50% of Power, if this attacks first, your opponent's attack is interrupted.",
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
    [GAME_ATTACKS.CATCH]: () => ({
        name: [GAME_ATTACKS.CATCH],
        icon: "ra-grab",
        cost: 1,
        power: 0.5,
        energyGain: 3,
        ultimateGain: 1,
        description: "Attack the opponent for 50% of Power. If your opponent was trying to switch out, prevent it and deal triple the initial damage.",
        isUltimate: false,
        priority: 0,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT_DEATH_TOUCH,
            ATTACK_STACK_TYPES.SPEND_ENERGY,
        ]
    }),
    [GAME_ATTACKS.SMACKDOWN]: () => ({
        name: [GAME_ATTACKS.SMACKDOWN],
        icon: "ra-back-pain",
        cost: 3,
        power: 0.5,
        description: "Attack the opponent for 50% of Power. The opponent loses 2 energy",
        isUltimate: false,
        energyGain: -2,
        type: ATTACK_TYPES.STATUS,
        stack: [
            ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
            ATTACK_STACK_TYPES.LOWER_OPPONENT_ENERGY,
            ATTACK_STACK_TYPES.SPEND_ENERGY
        ]
    }),
}