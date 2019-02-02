import { Character, CharacterClassList, CharacterAbility } from "./characters";
import { GAME_ATTACKS } from "./attacks";

enum Roles {
    OFFENSE = "Offense",
    DEFENSE = "Support",
    HEALING = "Heaing",
    UTILITY = "Utility",
    DISRUPTION = "Disruption"
}

export interface CharacterPreview extends Partial<Character> {
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
            usage: "Deal some strong hits to weaken your opponent's team. You could 1v1 an opponent, but the best use is to get sizeable damage across several opponents, and having another character come through to finish off the job. It can be a good strategy to boost your Max Health, Power and Defense against more defensive teams, rather than going all in for not much benefit.",
            strengths: "The Warrior is great at dealing large chunks of damage, and punishing opponents for letting the Warrior reach lower health pools without dying.",
            weaknesses: "Sturdy opponents that can defend or heal through the Warriors attacks, as the warrior WILL die eventually."
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
            usage: "The Mage can boost their own attack quite efficiently, and will often land 2 kills in a game. It's best to only boost your stats against non-aggressive opponents, as the Mage is quite vulnerable. You may forfeit your own speed to gain defense, but defense isn't as useful when you have a low health pool to begin with.",
            strengths: "Gaining high Power very quickly, allowing the Mage to run away with the game. The Mage can deal large damage to any opponent, and can often raise their Power higher than the opponent can heal / raise defense.",
            weaknesses: "The Mage is weak to aggressive opponents, as the Mage's main source of damage will often attack last, and the Mage has very low Health and Defense."
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
            usage: "The Assassin is best kept in the back, only coming out to get quick kills on weakened opponents before they can heal / retreat. Boosting your Power and Speed will pay off well if you can pull it off safely, so be sure to only set up when against a non-aggressive opponent.",
            strengths: "Can outrun most opponents with a high speed stat and priority on their main damaging attack. The Assassin can retreat before most attacks will hit them if played well.",
            weaknesses: "Very fragile. The Assassin often can't hold their own"
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
    {
        characterClass: CharacterClassList.NECROMANCER,
        icon: "ra-fomorian",
        passive: "Gain +1 Power at the end of turn for each dead teamate",
        usage: "",
        description: {
            usage: "",
            strengths: "",
            weaknesses: ""
        },
        roles: [],
        abilities: [
            { name: GAME_ATTACKS.DEAD_RISE },
            { name: GAME_ATTACKS.PLAGUE },
            { name: GAME_ATTACKS.DEATH_TOUCH },
            { name: GAME_ATTACKS.BONE_SHIELD },
        ]
    },
    {
        characterClass: CharacterClassList.BRAWLER,
        icon: "ra-punch-blast",
        passive: "The Brawler's will always win a speed tie.",
        usage: "",
        description: {
            usage: "",
            strengths: "",
            weaknesses: ""
        },
        roles: [],
        abilities: [
            { name: GAME_ATTACKS.COMBO_BREAKER },
            { name: GAME_ATTACKS.THROAT_PUNCH },
            { name: GAME_ATTACKS.CATCH },
            { name: GAME_ATTACKS.SMACKDOWN },
        ]
    },
]