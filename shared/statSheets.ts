import { CharacterClassList } from "./characters";

export interface StatSheet {
    healthStat: number;
    defenseStat: number;
    powerStat: number;
    speedStat: number;
}

export const warriorStatSheet: StatSheet = {
    healthStat: 3,
    defenseStat: 3,
    powerStat: 3,
    speedStat: 3
}
export const mageStatSheet: StatSheet = {
    healthStat: 2,
    defenseStat: 1,
    powerStat: 5,
    speedStat: 3
}
export const assassinStatSheet: StatSheet = {
    healthStat: 1,
    defenseStat: 2,
    powerStat: 3,
    speedStat: 5
}
export const paladinStatSheet: StatSheet = {
    healthStat: 5,
    defenseStat: 5,
    powerStat: 1,
    speedStat: 1
}
export const witchStatSheet: StatSheet = {
    healthStat: 4,
    defenseStat: 4,
    powerStat: 3,
    speedStat: 2
}
export const sniperStatSheet: StatSheet = {
    healthStat: 4,
    defenseStat: 1,
    powerStat: 5,
    speedStat: 2
}

export const statSheets = {
    [CharacterClassList.WARRIOR]: warriorStatSheet,
    [CharacterClassList.MAGE]: mageStatSheet,
    [CharacterClassList.ASSASSIN]: assassinStatSheet,
    [CharacterClassList.PALADIN]: paladinStatSheet,
    [CharacterClassList.SNIPER]: sniperStatSheet,
    [CharacterClassList.WITCH]: witchStatSheet,
}

