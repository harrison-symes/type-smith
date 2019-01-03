import { GAME_ATTACKS, ATTACK_STACK_TYPES } from "../../shared/attacks";
import { ATTACK_TYPES } from "../../shared/types";

export enum CharacterClassList {
    WARRIOR = "Warrior",
    MAGE = "Mage",
    ASSASSIN = "Assassin",
    PALADIN = "Paladin",
    WITCH = "Witch"
}

export interface CharacterAbility {
    name: string | GAME_ATTACKS;
    icon: string;
    description: string;
    cost: number;
    power: number;
    isUltimate: boolean;
    type: ATTACK_TYPES,
    stack: string[],
    powerGain?: number;
    energyGain?: number;
    defenseGain?: number;
    healthGain?: number;
    speedGain?: number;
    priority: number
}

// export interface PreGameCharacter {
//     characterClass: CharacterClassList;
//     abilities: string[]
// }

export interface Character {
    id: number;
    owner_id: number;
    characterClass: CharacterClassList;
    isActive?: boolean;
    healthMax: number;
    health: number;
    energyMax: number;
    energy: number;
    defense: number;
    power: number;
    speed: number;
    abilities: CharacterAbility[],
    isAlive: boolean;
    isTrapped?: boolean;
    ultimateCharge: number;
    ultimateChargeMax: number;
}