import { StatSheet, statSheets } from "./statSheets";
import { CharacterClassList, Character } from "../../src/interfacing/characters";

export const calcHealth = (healthStat : number) => 30 + (10 * healthStat)
export const calcEnergy = (energyStat : number) => 10 + (2*energyStat)
export const calcDefense = (defenseStat : number) => 2 + defenseStat
export const calcPower = (powerStat : number) => 10 + powerStat
export const calcSpeed = (speedStat : number) => speedStat

export const createClassFromStatSheet = (characterClass : CharacterClassList, isActive: boolean, statSheet : StatSheet) : Character => ({
    characterClass,
    isActive,
    health: calcHealth(statSheet.healthStat),
    healthMax: calcHealth(statSheet.healthStat),
    energy: calcEnergy(statSheet.energyStat),
    energyMax: calcEnergy(statSheet.energyStat),
    defense: calcDefense(statSheet.defenseStat),
    power: calcPower(statSheet.powerStat),
    speed: calcSpeed(statSheet.speedStat)
})

export default ({characterClass, isActive}: Partial<Character>) : Character => {
    return createClassFromStatSheet(characterClass, isActive, statSheets[characterClass])
} 