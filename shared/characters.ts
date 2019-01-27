import { GAME_ATTACKS, ATTACK_STACK_TYPES } from "./attacks";
import { ATTACK_TYPES } from "./types";
import { HelpBlock } from "react-bootstrap";

export enum CharacterClassList {
    WARRIOR = "Warrior",
    MAGE = "Mage",
    ASSASSIN = "Assassin",
    PALADIN = "Paladin",
    WITCH = "Witch",
    SNIPER = "Sniper",
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
    icon?: string;
    id: number;
    owner_id: number;
    characterClass: CharacterClassList;
    isActive: boolean;
    healthMax: number;
    health: number;
    energyMax: number;
    energy: number;
    defense: number;
    power: number;
    speed: number;
    abilities: Partial<CharacterAbility>[],
    isAlive: boolean;
    isTrapped?: boolean;
    ultimateCharge: number;
    ultimateChargeMax: number;
    isSpiked?: boolean;
}