// Dados dos inimigos do jogo

export const enemies = [
  {
    id: "goblin",
    name: "Goblin 👺",
    description:
      "Uma criatura pequena e perversa que ataca viajantes na floresta.",
    level: 1,
    health: 50,
    maxHealth: 50,
    damage: 5,
    defense: 2,
    experience: 20,
    gold: 5,
    items: [
      {
        id: "goblin_dagger",
        name: "Adaga de Goblin 🗡️",
        type: "weapon",
        damage: 3,
        value: 5,
        chance: 0.3,
        description: "Uma adaga rústica usada por goblins.",
      },
    ],
    skills: [
      {
        id: "quick_stab",
        name: "Estocada Rápida",
        damage: 7,
        cooldown: 3,
      },
    ],
    emoji: "👺",
  },
  {
    id: "wolf",
    name: "Lobo Selvagem 🐺",
    description: "Um lobo grande e feroz que caça em bandos.",
    level: 2,
    health: 70,
    maxHealth: 70,
    damage: 8,
    defense: 1,
    experience: 30,
    gold: 0,
    items: [
      {
        id: "wolf_pelt",
        name: "Pelo de Lobo 🦊",
        type: "material",
        value: 10,
        chance: 0.7,
        description:
          "Um pelo macio que pode ser vendido ou usado para criar itens.",
      },
    ],
    skills: [
      {
        id: "bite",
        name: "Mordida",
        damage: 10,
        cooldown: 2,
      },
      {
        id: "howl",
        name: "Uivo",
        effect: "intimidate",
        cooldown: 5,
      },
    ],
    emoji: "🐺",
  },
  {
    id: "bandit",
    name: "Bandido 🏴‍☠️",
    description: "Um criminoso armado que rouba viajantes nas estradas.",
    level: 2,
    health: 70,
    maxHealth: 70,
    damage: 8,
    defense: 3,
    experience: 35,
    gold: 20,
    items: [
      {
        id: "short_sword",
        name: "Espada Curta ⚔️",
        type: "weapon",
        damage: 8,
        value: 15,
      },
      {
        id: "health_potion",
        name: "Poção de Cura 🧪",
        type: "consumable",
        effect: "heal",
        value: 30,
        amount: 20,
      },
    ],
    abilities: [
      {
        id: "slash",
        name: "Golpe de Espada",
        damage: 12,
        description: "Um golpe rápido com a espada.",
        cooldown: 3,
      },
      {
        id: "steal",
        name: "Roubar",
        damage: 5,
        description: "Tenta roubar ouro do alvo.",
        effect: "steal_gold",
        amount: 10,
        cooldown: 5,
      },
    ],
    emoji: "🏴‍☠️",
  },
  {
    id: "bandit_archer",
    name: "Arqueiro Bandido 🏹",
    description:
      "Um bandido especializado em ataques à distância com seu arco.",
    level: 2,
    health: 60,
    maxHealth: 60,
    damage: 12,
    defense: 3,
    experience: 50,
    gold: 25,
    items: [
      {
        id: "hunting_bow",
        name: "Arco de Caça 🏹",
        type: "weapon",
        damage: 10,
        value: 20,
      },
      {
        id: "health_potion",
        name: "Poção de Cura 🧪",
        type: "consumable",
        effect: "heal",
        value: 30,
        amount: 20,
      },
    ],
    abilities: [
      {
        id: "precise_shot",
        name: "Tiro Preciso",
        damage: 15,
        description: "Um tiro preciso que causa dano extra.",
        cooldown: 3,
      },
      {
        id: "quick_shot",
        name: "Tiro Rápido",
        damage: 8,
        description: "Dispara rapidamente várias flechas.",
        hits: 2,
        cooldown: 4,
      },
    ],
    emoji: "🏹",
  },
  {
    id: "esqueleto_guerreiro",
    name: "Esqueleto Guerreiro",
    description:
      "Um guerreiro esqueleto armado com uma espada enferrujada e um escudo quebrado.",
    health: 50,
    attack: 8,
    defense: 5,
    experience: 30,
    gold: 10,
    items: ["poção_de_cura"],
    abilities: ["golpe_forte", "defesa_total"],
    sprite: "skeleton_warrior",
    emoji: "☠️",
  },
  {
    id: "esqueleto_arqueiro",
    name: "Esqueleto Arqueiro",
    description:
      "Um esqueleto que porta um arco antigo e uma aljava com flechas. Seus olhos brilham com um fogo azulado.",
    health: 40,
    attack: 12,
    defense: 3,
    experience: 35,
    gold: 12,
    items: ["poção_de_mana"],
    abilities: ["tiro_triplo", "tiro_rápido"],
    sprite: "skeleton_archer",
    emoji: "🏹",
  },
  {
    id: "esqueleto_mago",
    name: "Esqueleto Mago",
    description:
      "Um esqueleto coberto por vestes rasgadas e que porta um cajado mágico. Uma aura de magia negra o cerca.",
    health: 35,
    attack: 15,
    defense: 2,
    experience: 40,
    gold: 15,
    items: ["grimório_antigo", "poção_de_mana"],
    abilities: ["bola_de_fogo", "raio_de_gelo", "drenar_vida"],
    sprite: "skeleton_mage",
    emoji: "🧙",
  },
];

// Função para obter um inimigo pelo ID
export const getEnemyById = (id) => {
  return enemies.find((enemy) => enemy.id === id);
};

// Função para obter inimigos por nível
export const getEnemiesByLevel = (level) => {
  return enemies.filter((enemy) => enemy.level === level);
};
