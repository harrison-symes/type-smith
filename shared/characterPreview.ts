import { Character, CharacterClassList, CharacterAbility } from "../src/interfacing/characters";
import { GAME_ATTACKS } from "./attacks";

enum Roles {
    OFFENSE = "Offense",
    DEFENSE = "Support",
    HEALING = "Heaing",
    UTILITY = "Utility",
    DISRUPTION = "Disruption"
}

interface CharacterPreview extends Partial<Character> {
    passive: string;
    description: {
        usage: string;
        strengths: string;
        weaknesses: string;
    };
    usage: string;
    roles: Roles[];
}

export const characterPreviews: CharacterPreview[] = [
    {
        characterClass: CharacterClassList.WARRIOR,
        icon: "ra-swords-power",
        passive: "The Warrior's attacks have their power increased by 1% for each point of health the Warrior is missing",
        usage: "",
        description: {
            usage: "A Brutal attacker. The Warrior can efficiently deal heavy amounts of damage to opponents.",
            strengths: "",
            weaknesses: ""
        },
        roles: [],
        abilities: [
            { name: GAME_ATTACKS.DEMOLISH },
            { name: GAME_ATTACKS.SLASH },
            { name: GAME_ATTACKS.RECKLESS_SLAM },
            { name: GAME_ATTACKS.TANK_UP }
        ]
    },
    {
        icon: "ra-wizard-face",
        passive: "The Mage gains +1 Power at the end of each turn while Active.",
        usage: "",
        description: {
            usage: "Strong power but weak defenses. The Mage can boost their power to deal devastating attacks.",
            strengths: "",
            weaknesses: ""
        },
        roles: [],
        characterClass: CharacterClassList.MAGE,
        abilities: [
            { name: GAME_ATTACKS.METEOR },
            { name: GAME_ATTACKS.FIREBALL },
            { name: GAME_ATTACKS.MOLTEN_CORE },
            { name: GAME_ATTACKS.FROST_ARMOUR },
        ]
    },
    {
        characterClass: CharacterClassList.ASSASSIN,
        passive: "The Assassin has +6 Priority when switching",
        usage: "",
        description: {
            usage: "Fast and fragile. The Assassin can get off some quick attacks to finish weakened enemies, or power up to run away with the game.",
            strengths: "",
            weaknesses: ""
        },
        roles: [],
        icon: "ra-cowled",
        abilities: [
            { name: GAME_ATTACKS.ASSASSINATE },
            { name: GAME_ATTACKS.BACKSTAB },
            { name: GAME_ATTACKS.RECUPERATE },
            { name: GAME_ATTACKS.ACCELERATE }
        ]
    },
    {
        characterClass: CharacterClassList.PALADIN,
        passive: "The Paladin restores 1 Health to themselves at the end of each turn while Active.",
        usage: "",
        description: {
            usage: "Slow and Sturdy. The Paladin can heal and buff their teamates, but deals little damage themselves.",
            strengths: "",
            weaknesses: ""
        },
        roles: [],
        icon: "ra-elf-helmet",
        abilities: [
            { name: GAME_ATTACKS.SANCTUARY },
            { name: GAME_ATTACKS.BLESSED_HAMMER },
            { name: GAME_ATTACKS.HOLY_RADIANCE },
            { name: GAME_ATTACKS.INSPIRE },
        ]
    },
    {
        characterClass: CharacterClassList.WITCH,
        passive: "All of the Witch's attacks also lower the opponent's Defense by 1",
        usage: "",
        description: {
            usage: "Nasty and tricky. The Witch can lower opponent's stats, prevent switching, and turn their enemies own power against them",
            strengths: "",
            weaknesses: ""
        },
        roles: [],
        icon: "ra-cauldron",
        abilities: [
            { name: GAME_ATTACKS.WITCHING_HOUR },
            { name: GAME_ATTACKS.BLOOD_MOON },
            { name: GAME_ATTACKS.CURSE },
            { name: GAME_ATTACKS.ENTRAP },
        ]
    },
    {
        characterClass: CharacterClassList.SNIPER,
        icon: "ra-eye-target",
        passive: "The Sniper gains +1 bonus Energy at the end of each turn, no matter where they are.",
        usage: "",
        description: {
            usage: "The Sniper can shoot through opponent's defense, build up to their ultimate quickly, which is a devastating attack in itself. They can also spike trap opponents, causing them to take damage when switching out.",
            strengths: "",
            weaknesses: ""
        },
        roles: [],
        abilities: [
            { name: GAME_ATTACKS.RAPID_FIRE },
            { name: GAME_ATTACKS.PIERCING_SHOT },
            { name: GAME_ATTACKS.RELOAD },
            { name: GAME_ATTACKS.SPIKE_TRAP },
        ]
    },
]

export const classDescriptions = {
    [CharacterClassList.ASSASSIN]: "Fast and fragile. The Assassin can get off some quick attacks to finish weakened enemies, or power up to run away with the game.",
    [CharacterClassList.PALADIN]: "Slow and Sturdy. The Paladin can heal and buff their teamates, but deals little damage themselves.",
    [CharacterClassList.WITCH]: "Nasty and tricky. The Witch can lower opponent's stats, prevent switching, and turn their enemies own power against them",
    [CharacterClassList.SNIPER]: "The Sniper can shoot through opponent's defense, build up to their ultimate quickly, which is a devastating attack in itself. They can also spike trap opponents, causing them to take damage when switching out."
}