import { calcDamage } from "./damageCalc";
import { Character, CharacterAbility } from "src/interfacing/characters";
import { GAME_TYPES } from "../src/components/GameScreen/game.interface";

export enum GAME_ATTACKS {
    SWITCH = "Switch",
    ULTIMATE = "ULTIMATE",

    SLASH = "Slash",
    RECKLESS_SLAM = "Reckless Slam",
    TANK_UP = "Tank Up!",

    BACKSTAB = "Backstab",
    RECUPERATE = "Recuperate",
    ACCELERATE = "Accelerate",

    FIREBALL = "Fireball",
    MOLTEN_CORE = "Molten Core",
    FROST_ARMOUR = "Frost Armour",
}

export enum ATTACK_STACK_TYPES {
    SWITCH = "SWITCH",
    SPEND_ENERGY = "SPEND_ENERGY",
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
}

export interface GameTurnAction {
    character: Character,
    opponent: Character,
    ability: CharacterAbility
}

export interface AttackAction {
    type: GAME_TYPES | ATTACK_STACK_TYPES;
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

export const damageOpponentAction = (character, opponent, ability) => {
    const { power, isResist, isStrong } = calcDamage(character, opponent, ability)

    return {
        type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
        attacker: character,
        target: opponent,
        power,
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
            ? ability.healthAmount
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

export const attackActionMapper = {
    [ATTACK_STACK_TYPES.SWITCH]: switchCharacterAction,
    [ATTACK_STACK_TYPES.SPEND_ENERGY]: spendEnergyAction,
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
}
