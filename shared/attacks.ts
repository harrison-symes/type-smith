import { calcDamage } from "./damageCalc";
import { Character, CharacterAbility } from "src/interfacing/characters";

export enum GAME_ATTACKS {
    SLASH = "Slash",
    RECUPERATE = "Recuperate",
    ACCELERATE = "Accelerate",
    TANK_UP = "Tank Up!"
}

export enum ATTACK_STACK_TYPES {
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


export const damageOpponentAction = (character, opponent, ability) => {
    const { power, isResist, isStrong } = calcDamage(character, opponent, ability)

    return {
        type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
        attacker: character.name,
        target: opponent,
        power,
        isResist,
        isStrong
    }
}


export const healSelfAction = (target, power) => ({
    type: ATTACK_STACK_TYPES.HEAL_SELF,
    target,
    power
})

export const attackActionMapper = {
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT]: damageOpponentAction,
    [ATTACK_STACK_TYPES.HEAL_SELF]: healSelfAction,
}
