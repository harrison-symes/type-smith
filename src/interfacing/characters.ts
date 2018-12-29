export enum CharacterClassList {
    WARRIOR = "Warrior",
    MAGE = "Mage",
    ASSASSIN = "Assassin",
    PALADIN = "Paladin",
    WITCH = "Witch"
}

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
}