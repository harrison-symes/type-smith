import { calcDamage } from "./damageCalc";

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

const damageOpponentAction = (character, opponent, ability) => {
    const { power, isResist, isStrong } = calcDamage(character, opponent, ability)

    return {
        type: ATTACK_STACK_TYPES,
        power,
        isResist,
        isStrong
    }
}


export const healSelfAction = (target_id, power) => ({
    type: ATTACK_STACK_TYPES.HEAL_SELF,
    target_id,
    power
})

export const attackActionMapper = {
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT]: damageOpponentAction,
    [ATTACK_STACK_TYPES.HEAL_SELF]: healSelfAction,
}
