import { StatSheet, statSheets } from "./statSheets";
import { CharacterClassList, Character } from "../../src/interfacing/characters";
import mapAbilities from "../../shared/mapAbilities";

export const calcHealth = (healthStat : number) => 30 + (10 * healthStat)
export const calcEnergy = (energyStat : number) => 10 + (2*energyStat)
export const calcDefense = (defenseStat : number) => 2 + defenseStat
export const calcPower = (powerStat : number) => 10 + powerStat
export const calcSpeed = (speedStat : number) => speedStat

let id = 1

export const createClassFromStatSheet = (owner_id, character) : Character => {
    const {characterClass, isActive} = character
    const statSheet = statSheets[characterClass]
    const abilities = character.abilities.map(ability => mapAbilities[ability.name]())
    console.log({
        character,
        abilities
    })
    return {
        characterClass,
        isActive,
        id: ++id,
        owner_id,
        health: calcHealth(statSheet.healthStat),
        healthMax: calcHealth(statSheet.healthStat),
        energy: calcEnergy(statSheet.energyStat),
        energyMax: calcEnergy(statSheet.energyStat),
        defense: calcDefense(statSheet.defenseStat),
        power: calcPower(statSheet.powerStat),
        speed: calcSpeed(statSheet.speedStat),
        abilities,
    }
}

export default (owner_id, character: Partial<Character>) : Character => {
    return createClassFromStatSheet(owner_id, character)
} 