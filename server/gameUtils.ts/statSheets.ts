import { CharacterClassList } from "../../src/interfacing/characters";

export interface StatSheet {
    healthStat: number;
    energyStat: number;
    defenseStat: number;
    powerStat: number;
    speedStat: number;
}

export const warriorStatSheet: StatSheet = {
    healthStat: 3,
    energyStat: 3,
    defenseStat: 3,
    powerStat: 3,
    speedStat: 3
}
export const mageStatSheet: StatSheet = {
    healthStat: 2,
    energyStat: 4,
    defenseStat: 1,
    powerStat: 5,
    speedStat: 3
}
export const assassinStatSheet: StatSheet = {
    healthStat: 1,
    energyStat: 4,
    defenseStat: 2,
    powerStat: 3,
    speedStat: 5
}
export const paladinStatSheet: StatSheet = {
    healthStat: 5,
    energyStat: 2,
    defenseStat: 4,
    powerStat: 2,
    speedStat: 2
}
export const witchStatSheet: StatSheet = {
    healthStat: 5,
    energyStat: 1,
    defenseStat: 5,
    powerStat: 0,
    speedStat: 4
}

export const statSheets = {
    [CharacterClassList.WARRIOR]: warriorStatSheet,
    [CharacterClassList.MAGE]: mageStatSheet,
    [CharacterClassList.ASSASSIN]: assassinStatSheet,
    [CharacterClassList.PALADIN]: paladinStatSheet,
    [CharacterClassList.WITCH]: witchStatSheet,
}

