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
    defenseStat: 0,
    powerStat: 5,
    speedStat: 2
}
export const assassinStatSheet: StatSheet = {
    healthStat: 0,
    defenseStat: 2,
    powerStat: 4,
    speedStat: 5
}
export const paladinStatSheet: StatSheet = {
    healthStat: 5,
    defenseStat: 5,
    powerStat: 1,
    speedStat: 0
}
export const witchStatSheet: StatSheet = {
    healthStat: 5,
    defenseStat: 3,
    powerStat: 1,
    speedStat: 2
}
export const sniperStatSheet: StatSheet = {
    healthStat: 3,
    defenseStat: 1,
    powerStat: 4,
    speedStat: 4
}

export const statSheets = {
    [CharacterClassList.WARRIOR]: warriorStatSheet,
    [CharacterClassList.MAGE]: mageStatSheet,
    [CharacterClassList.ASSASSIN]: assassinStatSheet,
    [CharacterClassList.PALADIN]: paladinStatSheet,
    [CharacterClassList.SNIPER]: sniperStatSheet,
    [CharacterClassList.WITCH]: witchStatSheet,
}

