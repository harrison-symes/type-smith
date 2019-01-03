import { calcDamage } from "./damageCalc";
import { Character, CharacterAbility } from "src/interfacing/characters";
import { GAME_TYPES } from "../src/components/GameScreen/game.interface";

export enum GAME_ATTACKS {
    SWITCH = "Switch",
    ULTIMATE = "ULTIMATE",

    DEMOLISH = "Demolish",
    SLASH = "Slash",
    RECKLESS_SLAM = "Reckless Slam",
    TANK_UP = "Tank Up!",

    ASSASSINATE = "Assassinate",
    BACKSTAB = "Backstab",
    RECUPERATE = "Recuperate",
    ACCELERATE = "Accelerate",

    METEOR = "Meteor!",
    FIREBALL = "Fireball",
    MOLTEN_CORE = "Molten Core",
    FROST_ARMOUR = "Frost Armour",

    WITCHING_HOUR = "Witching Hour",
    CURSE = "Curse",
    ENTRAP = "Entrap",
    BLOOD_MOON = "Blood Moon",

    SANCTUARY = "Sanctuary",
    HOLY_RADIANCE = "Holy Radiance",
    BLESSED_HAMMER = "Blessed Hammer",
    INSPIRE = "Inspire",
}

export enum REDUCER_ATTACK_TYPES {
    SWITCH = "SWITCH",
    SPEND_ENERGY = "SPEND_ENERGY",
    SPEND_ULTIMATE_CHARGE = "SPEND_ULTIMATE_CHARGE",
    DAMAGE_OPPONENT = "DAMAGE_OPPONENT",
    DAMAGE_SELF = "DAMAGE_SELF",
    HEAL_SELF = "HEAL_SELF",
    HEAL_OPPONENT = "HEAL_OPPONENT",
    GAIN_HEALTH = "GAIN_HEALTH",
    GAIN_POWER = "GAIN_POWER",
    GAIN_DEFENSE = "GAIN_DEFENSE",
    GAIN_ENERGY = "GAIN_ENERGY",
    GAIN_SPEED = "GAIN_SPEED",
    INCREASE_MAX_HEALTH = "INCREASE_MAX_HEALTH",
    INCREASE_MAX_ENERGY = "INCREASE_MAX_ENERGY",
    CHANGE_ALL_STATS = "CHANGE_ALL_STATS",
    TRAP_TARGET = "TRAP_TARGET",
    HEAL_TEAM = "HEAL_TEAM",
    DAMAGE_TEAM = "DAMAGE_TEAM",
    CHANGE_TEAM_STAT = "CHANGE_TEAM_STAT",
    CHANGE_TEAM_STATS_ALL = "CHANGE_TEAM_STATS_ALL",
}

export enum ABILITY_ATTACK_STACK_TYPES {
    DAMAGE_OPPONENT_BLOOD_MOON = "DAMAGE_OPPONENT_BLOOD_MOON",

    TRAP_OPPONENT = "TRAP_OPPONENT",
    TRAP_SELF = "TRAP_SELF",

    CHANGE_ALL_STATS_SELF = "CHANGE_ALL_STATS_SELF",
    CHANGE_ALL_STATS_OPPONENT = "CHANGE_ALL_STATS_OPPONENT",

    LOWER_OPPONENT_MAX_HEALTH = "LOWER_OPPONENT_MAX_HEALTH",
    LOWER_OPPONENT_POWER = "LOWER_OPPONENT_POWER",
    LOWER_OPPONENT_DEFENSE = "LOWER_OPPONENT_DEFENSE",
    LOWER_OPPONENT_ENERGY = "LOWER_OPPONENT_ENERGY",
    LOWER_OPPONENT_MAX_ENERGY = "LOWER_OPPONENT_MAX_ENERGY",
    LOWER_OPPONENT_SPEED = "LOWER_OPPONENT_SPEED",

    HEAL_TEAM_SELF = "HEAL_TEAM_SELF",
    HEAL_TEAM_OPPONENT = "HEAL_TEAM_OPPONENT",

    DAMAGE_TEAM_SELF = "DAMAGE_TEAM_SELF",
    DAMAGE_TEAM_OPPONENT = "DAMAGE_TEAM_OPPONENT",

    CHANGE_TEAM_STATS_POWER = "CHANGE_TEAM_STATS_POWER",
    CHANGE_TEAM_STATS_DEFENSE = "CHANGE_TEAM_STATS_DEFENSE",
    CHANGE_TEAM_STATS_ALL_OPPONENT = "CHANGE_TEAM_STATS_ALL_OPPONENT",
}

export type ATTACK_STACK_TYPES_TYPE = REDUCER_ATTACK_TYPES | ABILITY_ATTACK_STACK_TYPES

export const ATTACK_STACK_TYPES = {
    ...REDUCER_ATTACK_TYPES, 
    ...ABILITY_ATTACK_STACK_TYPES
} 

export interface GameTurnAction {
    character: Character,
    opponent: Character,
    ability: CharacterAbility
}

export interface AttackAction {
    type: GAME_TYPES | ATTACK_STACK_TYPES_TYPE;
    attacker?: Character;
    target?: Character;
    power: number;
    isResist: boolean;
    isStrong: boolean;
}

export const spendEnergyAction = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.SPEND_ENERGY,
    energyLoss: ability.cost,
    target: character
})
export const spendUltimateCharge = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE,
    ultimateChargeLoss: ability.cost,
    target: character
})

export const damageOpponentAction = (character, opponent, ability) => {
    const { power, isResist, isStrong } = calcDamage(character, opponent, ability)

    return {
        type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
        attacker: character,
        target: opponent,
        power: ability.isStatic
            ? ability.power
            : power
        ,
        isResist,
        isStrong
    }
}

// DAMAGE_SELF = "DAMAGE_SELF",
export const damageSelfAction = (character, opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.DAMAGE_SELF,
        power: ability.isStatic
            ? ability.damageAmount
            : ability.selfDamage * character.power,
        target: character
    }
}
// HEAL_SELF = "HEAL_SELF",
export const healSelfAction = (character, opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.HEAL_SELF,
        power: ability.isStatic
            ? ability.healAmount
            : ability.power * character.power,
        target: character
    }
}
// HEAL_OPPONENT = "HEAL_OPPONENT",
export const healOpponentAction = (character, opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.HEAL_OPPONENT,
        power: ability.isStatic
            ? ability.healthAmount
            : ability.power * character.power,
        target: opponent
    }
}
// GAIN_POWER = "GAIN_POWER",
export const gainPowerAction = (character, opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.GAIN_POWER,
        powerGain: ability.powerGain,
        target: character
    }
}
// GAIN_DEFENSE = "GAIN_DEFENSE",
export const gainDefenseAction = (character, opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.GAIN_DEFENSE,
        defenseGain: ability.defenseGain,
        target: character
    }
}
// GAIN_ENERGY = "GAIN_ENERGY",
export const gainEnergyAction = (character, opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.GAIN_ENERGY,
        energyGain: ability.energyGain,
        target: character
    }
}
// GAIN_SPEED = "GAIN_SPEED",
export const gainSpeedAction = (character, opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.GAIN_SPEED,
        speedGain: ability.speedGain,
        target: character
    }
}
// INCREASE_MAX_HEALTH = "INCREASE_MAX_HEALTH",
export const increaseMaxHealth = (character, opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.INCREASE_MAX_HEALTH,
        target: character,
        healthGain: ability.healthGain
    }
}
// INCREASE_MAX_ENERGY = "INCREASE_MAX_ENERGY",
export const increaseMaxEnergy = (character, opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.INCREASE_MAX_ENERGY,
        target: character,
        ability
    }
}

export const switchCharacterAction = (character, opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.SWITCH,
        character,
        targetCharacter: ability.targetCharacter
    }
}

export const changeStatsOpponent = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.CHANGE_ALL_STATS,
    target: opponent,
    statChange: ability.statChange
})

export const changeStatsSelf = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.CHANGE_ALL_STATS,
    target: character,
    statChange: ability.statChange
})

export const trapOpponent = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.TRAP_TARGET,
    target: opponent
})

export const damageOpponentBloodMoon = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
    target: opponent,
    power: opponent.power
})

export const healTeamSelf = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.HEAL_TEAM,
    owner_id: character.owner_id,
    power: ability.isStatic 
        ? ability.healAmount 
        : ability.power * character.power
})

export const damageTeamOpponent = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.DAMAGE_TEAM,
    owner_id: character.opponent_id,
    power: ability.isStatic 
        ? ability.damageAmount 
        : (ability.teamPower || ability.power) * character.power
})

export const changeTeamStatsPower = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.CHANGE_TEAM_STAT,
    stat: "power",
    statChange: ability.powerGain,
    owner_id: character.owner_id
})

export const changeTeamStatsDefense = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.CHANGE_TEAM_STAT,
    stat: "defense",
    statChange: ability.defenseGain,
    owner_id: character.owner_id
})

export const changeTeamStatsAllOpponent = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_ALL,
    statChange: ability.statChange,
    owner_id: opponent.owner_id
})

export const attackActionMapper = {
    [ATTACK_STACK_TYPES.SWITCH]: switchCharacterAction,
    [ATTACK_STACK_TYPES.SPEND_ENERGY]: spendEnergyAction,
    [ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE]: spendUltimateCharge,
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT]: damageOpponentAction,
    [ATTACK_STACK_TYPES.DAMAGE_SELF]: damageSelfAction,
    [ATTACK_STACK_TYPES.HEAL_SELF]: healSelfAction,
    [ATTACK_STACK_TYPES.HEAL_OPPONENT]: healOpponentAction,
    [ATTACK_STACK_TYPES.GAIN_DEFENSE]: gainDefenseAction,
    [ATTACK_STACK_TYPES.GAIN_POWER]: gainPowerAction,
    [ATTACK_STACK_TYPES.GAIN_SPEED]: gainSpeedAction,
    [ATTACK_STACK_TYPES.GAIN_ENERGY]: gainEnergyAction,
    [ATTACK_STACK_TYPES.INCREASE_MAX_HEALTH]: increaseMaxHealth,
    [ATTACK_STACK_TYPES.INCREASE_MAX_ENERGY]: increaseMaxEnergy,
    [ATTACK_STACK_TYPES.CHANGE_ALL_STATS_OPPONENT]: changeStatsOpponent,
    [ATTACK_STACK_TYPES.CHANGE_ALL_STATS_SELF]: changeStatsSelf,
    [ATTACK_STACK_TYPES.TRAP_OPPONENT]: trapOpponent,
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT_BLOOD_MOON]: damageOpponentBloodMoon,
    [ATTACK_STACK_TYPES.HEAL_TEAM_SELF]: healTeamSelf,
    [ATTACK_STACK_TYPES.DAMAGE_TEAM_OPPONENT]: damageTeamOpponent,
    [ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_POWER]: changeTeamStatsPower,
    [ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_DEFENSE]: changeTeamStatsDefense,
    [ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_ALL_OPPONENT]: changeTeamStatsAllOpponent,

}
