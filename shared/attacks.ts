import { calcDamage } from "./damageCalc";
import { Character, CharacterAbility } from "./characters";
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

    RAPID_FIRE = "Rapid Fire",
    PIERCING_SHOT = "Peircing Shot",
    RELOAD = "Reload",
    SPIKE_TRAP = "Spike Trap",

    DEAD_RISE = "Dead Rise",
    PLAGUE = "Plague",
    DEATH_TOUCH = "Death Touch",
    BONE_SHIELD = "Bone Shield",

    COMBO_BREAKER = "Combo Breaker",
    THROAT_PUNCH = "Throat Punch",
    CATCH = "Catch",
    SMACKDOWN = "Smackdown"
}

export enum REDUCER_ATTACK_TYPES {
    USE_ATTACK = "USE_ATTACK",
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
    GAIN_ULTIMATE_CHARGE = "GAIN_ULTIMATE_CHARGE",
    APPLY_SPIKE_TRAP = "APPLY_SPIKE_TRAP",
    ACTIVATE_SPIKE_TRAP = "ACTIVATE_SPIKE_TRAP",
    WITCH_PASSIVE = "WITCH_PASSIVE",
    IMMUNE_FOR_TURN = "IMMUNE_FOR_TURN",
    DEAD_RISE = "DEAD_RISE",
}

export enum ABILITY_ATTACK_STACK_TYPES {
    DAMAGE_OPPONENT_BLOOD_MOON = "DAMAGE_OPPONENT_BLOOD_MOON",
    DAMAGE_OPPONENT_RAPID_FIRE = "DAMAGE_OPPONENT_RAPID_FIRE",
    DAMAGE_OPPONENT_IGNORE_ARMOUR = "DAMAGE_OPPONENT_IGNORE_ARMOUR",
    DAMAGE_OPPONENT_BACKSTAB = "DAMAGE_OPPONENT_BACKSTAB",
    DAMAGE_OPPONENT_WARRIOR = "DAMAGE_OPPONENT_WARRIOR",
    DAMAGE_TEAM_DEMOLISH = "DAMAGE_TEAM_DEMOLISH",
    DAMAGE_OPPONENT_DEATH_TOUCH = "DAMAGE_OPPONENT_DEATH_TOUCH",
    DAMAGE_OPPONENT_COMBO_BREAKER = "DAMAGE_OPPONENT_COMBO_BREAKER",

    SPEND_ALL_ULTIMATE_CHARGE = "SPEND_ALL_ULTIMATE_CHARGE",

    APPLY_PLAGUE_OPPONENT = "APPLY_PLAGUE_OPPONENT",
    TAKE_PLAGUE_DAMAGE = "TAKE_PLAGUE_DAMAGE",

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

    APPLY_SPIKE_TRAP_OPPONENT = "APPLY_SPIKE_TRAP_OPPONENT",
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

export const spendEnergyAction = (character, _opponent, ability) => ({
    type: ATTACK_STACK_TYPES.SPEND_ENERGY,
    energyLoss: ability.cost,
    target: character
})
export const spendUltimateCharge = (character, _opponent, ability) => ({
    type: ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE,
    ultimateChargeLoss: ability.cost,
    target: character
})
export const spendALLUltimateCharge = (character : Character, _opponent, ability) => ({
    type: ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE,
    ultimateChargeLoss: character.ultimateCharge,
    target: character
})

export const damageOpponentAction = (character, opponent, ability) => {
    const power = calcDamage(character, opponent, ability)

    return {
        type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
        attacker: character,
        target: opponent,
        power: ability.isStatic
            ? ability.power
            : power
        ,
    }
}

// DAMAGE_SELF = "DAMAGE_SELF",
export const damageSelfAction = (character, _opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.DAMAGE_SELF,
        power: ability.isStatic
            ? ability.damageAmount
            : ability.selfDamage * character.power,
        target: character
    }
}
// HEAL_SELF = "HEAL_SELF",
export const healSelfAction = (character, _opponent, ability) => {
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
export const gainPowerAction = (character, _opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.GAIN_POWER,
        powerGain: ability.powerGain,
        target: character
    }
}
// GAIN_DEFENSE = "GAIN_DEFENSE",
export const gainDefenseAction = (character, _opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.GAIN_DEFENSE,
        defenseGain: ability.defenseGain,
        target: character
    }
}
// GAIN_ENERGY = "GAIN_ENERGY",
export const gainEnergyAction = (character, _opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.GAIN_ENERGY,
        energyGain: ability.energyGain,
        target: character
    }
}
export const gainUltimateCharge = (character, _opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.GAIN_ULTIMATE_CHARGE,
        ultimateGain: ability.ultimateGain,
        target: character
    }
}
// GAIN_SPEED = "GAIN_SPEED",
export const gainSpeedAction = (character, _opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.GAIN_SPEED,
        speedGain: ability.speedGain,
        target: character
    }
}
// INCREASE_MAX_HEALTH = "INCREASE_MAX_HEALTH",
export const increaseMaxHealth = (character, _opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.INCREASE_MAX_HEALTH,
        target: character,
        healthGain: ability.healthGain
    }
}
// INCREASE_MAX_ENERGY = "INCREASE_MAX_ENERGY",
export const increaseMaxEnergy = (character, _opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.INCREASE_MAX_ENERGY,
        target: character,
        ability
    }
}

export const switchCharacterAction = (character, _opponent, ability) => {
    return {
        type: ATTACK_STACK_TYPES.SWITCH,
        character,
        targetCharacter: ability.targetCharacter
    }
}

export const changeStatsOpponent = (_character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.CHANGE_ALL_STATS,
    target: opponent,
    statChange: ability.statChange
})

export const changeStatsSelf = (character, _opponent, ability) => ({
    type: ATTACK_STACK_TYPES.CHANGE_ALL_STATS,
    target: character,
    statChange: ability.statChange
})

export const trapOpponent = (_character, opponent, _ability) => ({
    type: ATTACK_STACK_TYPES.TRAP_TARGET,
    target: opponent
})

export const damageOpponentBloodMoon = (_character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
    target: opponent,
    power: calcDamage(opponent, opponent, ability)
})

export const damageOpponentRapidFire = (character, opponent, ability) => {
    const power = (ability.power + (ability.altPower * character.energy)) * character.power
    return {
        type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
        target: opponent,
        power
    }
}
export const damageOpponentComboBreaker = (character, opponent, ability) => {
    const power = (ability.power + (ability.altPower * character.ultimateCharge)) * character.power
    return {
        type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
        target: opponent,
        power
    }
}

export const damageOpponentBackstab = (character, opponent, ability) => {
    const subCharacter = {...character}
    if (opponent.health / opponent.healthMax <= 0.3) {
        subCharacter.power = subCharacter.power * 2
    }
    const power = calcDamage(subCharacter, opponent, ability)

    return {
        type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
        target: opponent,
        power
    }
}
export const damageOpponentWarrior = (character, opponent, ability) => {
    const missingHealth = character.healthMax - character.health
    const subAbility = {...ability}

    subAbility.power *= (1 + (missingHealth / 100))
    const power = calcDamage(character, opponent, subAbility)
    return {
        type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
        target: opponent,
        power
    }
}

export const damageOpponentIgnoreArmour = (character, opponent, ability) => {
    const subOpponent = {
        ...opponent,
        defense: 0
    }
    
    return {
        type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
        target: opponent,
        power: calcDamage(character, subOpponent, ability)

    }
}

export const deathTouch = (character, opponent, ability) => {
    let power = calcDamage(character, opponent, ability)
    if (opponent.isPlagued) {
        power += 5
    }
    return {
        type: ATTACK_STACK_TYPES.DAMAGE_OPPONENT,
        target: opponent,
        power
    }
}

export const healTeamSelf = (character, _opponent, ability) => ({
    type: ATTACK_STACK_TYPES.HEAL_TEAM,
    owner_id: character.owner_id,
    power: ability.isStatic 
        ? ability.healAmount 
        : ability.power * character.power
})

export const damageTeamOpponent = (character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.DAMAGE_TEAM,
    owner_id: opponent.owner_id,
    power: ability.isStatic 
        ? ability.damageAmount 
        : ability.teamPower 
            ? ability.teamPower * character.power
            : ability.power * character.power
})

export const damageTeamDemolish = (character, opponent, ability) => {
    const missingHealth = character.healthMax - character.health
    const subAbility = { ...ability }

    subAbility.power *= (1 + (missingHealth / 100))
    const power = subAbility.power
    return {
        type: ATTACK_STACK_TYPES.DAMAGE_TEAM,
        owner_id: opponent.owner_id,
        power
    }
}

export const changeTeamStatsPower = (character, _opponent, ability) => ({
    type: ATTACK_STACK_TYPES.CHANGE_TEAM_STAT,
    stat: "power",
    statChange: ability.powerGain,
    owner_id: character.owner_id
})

export const changeTeamStatsDefense = (character, _opponent, ability) => ({
    type: ATTACK_STACK_TYPES.CHANGE_TEAM_STAT,
    stat: "defense",
    statChange: ability.defenseGain,
    owner_id: character.owner_id
})

export const changeTeamStatsAllOpponent = (_character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_ALL,
    statChange: ability.statChange,
    owner_id: opponent.owner_id
})

export const lowerOpponentPower = (_character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.GAIN_POWER,
    target: opponent,
    powerGain: ability.powerGain

})
export const lowerOpponentDefense = (_character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.GAIN_DEFENSE,
    target: opponent,
    defenseGain: ability.defenseGain
})

export const lowerOpponentEnergy = (_character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.GAIN_ENERGY,
    target: opponent,
    energyGain: ability.energyGain
})

export const lowerOpponentSpeed = (_character, opponent, ability) => ({
    type: ATTACK_STACK_TYPES.GAIN_SPEED,
    target: opponent,
    speedGain: ability.speedGain
})
export const applySpikeTrapOpponent = (_character, opponent, _ability) => ({
    type: ATTACK_STACK_TYPES.APPLY_SPIKE_TRAP,
    target: opponent
})
export const activateSpikeTrap = (character, _opponent, _ability) => ({
    type: ATTACK_STACK_TYPES.ACTIVATE_SPIKE_TRAP,
    target: character
})
export const witchPassive = (_character, opponent, _ability) => ({
    type: ATTACK_STACK_TYPES.GAIN_DEFENSE,
    target: opponent,
    defenseGain: -1,
})

export const useAttack = (character, _opponent, ability) => ({
    type: ATTACK_STACK_TYPES.USE_ATTACK,
    abilityName: ability.name,
    characterName: character.characterClass,
    ability
})

export const deadRise = (character, _opponent, _ability) => ({
    type: ATTACK_STACK_TYPES.DEAD_RISE,
    owner_id: character.owner_id,
})

export const plagueOpponent = (_character, opponent, _ability) => ({
    type: ATTACK_STACK_TYPES.APPLY_PLAGUE_OPPONENT,
    target: opponent
})

export const immuneTurn = (character, _opponent, _ability) => ({
    type: ATTACK_STACK_TYPES.IMMUNE_FOR_TURN,
    target: character,
})
export const takePlagueDamage = (character, _opponent, _ability) => ({
    type: ATTACK_STACK_TYPES.TAKE_PLAGUE_DAMAGE,
    target: character,
})


export const attackActionMapper = {
    [ATTACK_STACK_TYPES.USE_ATTACK]: useAttack,
    [ATTACK_STACK_TYPES.SWITCH]: switchCharacterAction,
    [ATTACK_STACK_TYPES.SPEND_ENERGY]: spendEnergyAction,
    [ATTACK_STACK_TYPES.SPEND_ULTIMATE_CHARGE]: spendUltimateCharge,
    [ATTACK_STACK_TYPES.SPEND_ALL_ULTIMATE_CHARGE]: spendALLUltimateCharge,
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT]: damageOpponentAction,
    [ATTACK_STACK_TYPES.DAMAGE_SELF]: damageSelfAction,
    [ATTACK_STACK_TYPES.HEAL_SELF]: healSelfAction,
    [ATTACK_STACK_TYPES.HEAL_OPPONENT]: healOpponentAction,
    [ATTACK_STACK_TYPES.GAIN_DEFENSE]: gainDefenseAction,
    [ATTACK_STACK_TYPES.GAIN_POWER]: gainPowerAction,
    [ATTACK_STACK_TYPES.GAIN_SPEED]: gainSpeedAction,
    [ATTACK_STACK_TYPES.GAIN_ENERGY]: gainEnergyAction,
    [ATTACK_STACK_TYPES.GAIN_ULTIMATE_CHARGE]: gainUltimateCharge,
    [ATTACK_STACK_TYPES.INCREASE_MAX_HEALTH]: increaseMaxHealth,
    [ATTACK_STACK_TYPES.INCREASE_MAX_ENERGY]: increaseMaxEnergy,
    [ATTACK_STACK_TYPES.CHANGE_ALL_STATS_OPPONENT]: changeStatsOpponent,
    [ATTACK_STACK_TYPES.CHANGE_ALL_STATS_SELF]: changeStatsSelf,
    [ATTACK_STACK_TYPES.TRAP_OPPONENT]: trapOpponent,
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT_BLOOD_MOON]: damageOpponentBloodMoon,
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT_IGNORE_ARMOUR]: damageOpponentIgnoreArmour,
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT_RAPID_FIRE]: damageOpponentRapidFire,
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT_BACKSTAB]: damageOpponentBackstab,
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT_WARRIOR]: damageOpponentWarrior,
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT_COMBO_BREAKER]: damageOpponentComboBreaker,
    [ATTACK_STACK_TYPES.DAMAGE_TEAM_DEMOLISH]: damageTeamDemolish,
    [ATTACK_STACK_TYPES.HEAL_TEAM_SELF]: healTeamSelf,
    [ATTACK_STACK_TYPES.DAMAGE_TEAM_OPPONENT]: damageTeamOpponent,
    [ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_POWER]: changeTeamStatsPower,
    [ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_DEFENSE]: changeTeamStatsDefense,
    [ATTACK_STACK_TYPES.CHANGE_TEAM_STATS_ALL_OPPONENT]: changeTeamStatsAllOpponent,
    [ATTACK_STACK_TYPES.LOWER_OPPONENT_POWER]: lowerOpponentPower,
    [ATTACK_STACK_TYPES.LOWER_OPPONENT_DEFENSE]: lowerOpponentDefense,
    [ATTACK_STACK_TYPES.LOWER_OPPONENT_ENERGY]: lowerOpponentEnergy,
    [ATTACK_STACK_TYPES.LOWER_OPPONENT_SPEED]: lowerOpponentSpeed,
    [ATTACK_STACK_TYPES.APPLY_SPIKE_TRAP_OPPONENT]: applySpikeTrapOpponent,
    [ATTACK_STACK_TYPES.ACTIVATE_SPIKE_TRAP]: activateSpikeTrap,
    [ATTACK_STACK_TYPES.WITCH_PASSIVE]: witchPassive,
    [ATTACK_STACK_TYPES.DEAD_RISE]: deadRise,
    [ATTACK_STACK_TYPES.APPLY_PLAGUE_OPPONENT]: plagueOpponent,
    [ATTACK_STACK_TYPES.TAKE_PLAGUE_DAMAGE]: takePlagueDamage,
    [ATTACK_STACK_TYPES.DAMAGE_OPPONENT_DEATH_TOUCH]: deathTouch,
    [ATTACK_STACK_TYPES.IMMUNE_FOR_TURN]: immuneTurn,
}