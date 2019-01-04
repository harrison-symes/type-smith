import { Character, CharacterAbility } from "src/interfacing/characters";

export const calcDamage = (character: Character, opponent: Character, ability: CharacterAbility) => {
    const power = Math.round(
        (
            (character.power * ability.power)
            - opponent.defense
        ) * (
            (Math.random() / 2) + 0.75
        )
    )

    return power
}
