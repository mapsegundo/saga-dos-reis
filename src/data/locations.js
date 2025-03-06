// Definição das localizações do jogo
export const locations = [
  // Localizações da Fase 1 - Vila de Ravenwood
  {
    id: "village_square",
    name: "Vila de Ravenwood 🏛️",
    description:
      "Uma pequena vila pacífica nos confins do reino. Possui algumas casas, uma taverna e a cabana do Mestre Thorne. O centro da vila tem uma fonte de pedra e bancos onde os moradores costumam se reunir para conversar.",
    image: "village_square",
    emoji: "🏛️",
    npcs: ["mestre_thorne", "comerciante_gorn", "historiador_anzu"],
    enemies: [],
    items: [],
    connectedLocations: [],
  },
  {
    id: "village_tavern",
    name: "Taverna do Javali Dourado 🍺",
    description:
      "Uma taverna aconchegante com mesas de madeira e um balcão bem polido. O cheiro de cerveja e comida preenche o ar.",
    image: "village_tavern",
    emoji: "🍺",
    npcs: ["estalajadeiro_bram"],
    enemies: [],
    items: [],
    connectedLocations: [{ id: "village_square", name: "Praça da Vila 🏛️" }],
  },
  {
    id: "village_outskirts",
    name: "Arredores da Vila 🌄",
    description:
      "Uma cena devastadora se desenrola diante de seus olhos. Casas em chamas, moradores correndo desesperados enquanto bandidos saqueiam o que resta. Gritos de socorro ecoam pelo ar. A situação é crítica e exige ação imediata.",
    image: "village_outskirts",
    emoji: "🔥",
    npcs: [],
    enemies: ["bandit", "bandit_archer"],
    items: ["herbs"],
    connectedLocations: [{ id: "village_square", name: "Praça da Vila 🏛️" }],
  },
  {
    id: "forest",
    name: "Floresta de Ravenwood 🌲",
    description:
      "Uma densa floresta que cerca a vila. Árvores altas bloqueiam parte da luz do sol, criando um ambiente sombrio.",
    image: "forest",
    emoji: "🌲",
    npcs: [],
    enemies: ["bandit", "bandit_archer", "wolf"],
    items: ["herbs", "mushrooms"],
    connectedLocations: [
      { id: "village_outskirts", name: "Arredores da Vila 🌄" },
      { id: "ruins", name: "Ruínas Antigas 🏚️" },
    ],
  },
  {
    id: "ruins",
    name: "Ruínas Antigas 🏚️",
    description:
      "Ruínas de uma antiga civilização, agora tomadas pela vegetação. Colunas quebradas e estátuas desgastadas decoram o local.",
    image: "ruins",
    npcs: [],
    enemies: ["skeleton", "bandit"],
    items: ["ancient_amulet", "gold_coins"],
    boss: "garrick",
    connectedLocations: [
      { id: "village_outskirts", name: "Arredores da Vila 🌄" },
      { id: "forest", name: "Floresta de Ravenwood 🌲" },
    ],
  },
  {
    id: "ruinas_antigas",
    name: "Ruínas Antigas",
    description:
      "Ruínas antigas e perigosas a leste da vila. Escombros e colunas quebradas indicam que este local já foi grandioso, mas agora está abandonado e tomado por perigos. O eco de passos e sons misteriosos podem ser ouvidos.",
    emoji: "🏚️",
    npcs: [],
    enemies: ["esqueleto_guerreiro", "esqueleto_arqueiro", "esqueleto_mago"],
    items: ["amuleto_antigo", "poção_de_cura"],
    connectedLocations: [
      {
        id: "village_square",
        name: "Praça da Vila",
      },
    ],
  },

  // Localizações da Fase 2 - Capital de Elbion
  {
    id: "capital_gates",
    name: "Portões da Capital",
    description:
      "Os imponentes portões da capital de Elbion, guardados por soldados de aparência severa.",
    image: "capital_gates",
    npcs: ["gate_guard"],
    enemies: [],
    items: [],
    connectedLocations: [
      { id: "market_district", name: "Distrito do Mercado" },
    ],
  },
  {
    id: "market_district",
    name: "Distrito do Mercado",
    description:
      "Um lugar movimentado cheio de comerciantes, artesãos e cidadãos comuns. O coração econômico da cidade.",
    image: "market_district",
    npcs: ["merchant", "craftsman", "beggar"],
    enemies: [],
    items: [],
    shops: ["weapon_shop", "armor_shop", "potion_shop"],
    connectedLocations: [
      { id: "capital_gates", name: "Portões da Capital" },
      { id: "noble_district", name: "Distrito Nobre" },
      { id: "undercity", name: "Cidade Baixa" },
      { id: "dragon_tavern", name: "Taverna do Dragão Dourado" },
    ],
  },
  {
    id: "dragon_tavern",
    name: "Taverna do Dragão Dourado",
    description:
      "Uma taverna popular na capital, frequentada por aventureiros, mercenários e nobres disfarçados.",
    image: "tavern",
    npcs: ["taverneiro"],
    enemies: [],
    items: [],
    connectedLocations: [
      { id: "market_district", name: "Distrito do Mercado" },
    ],
  },
  {
    id: "noble_district",
    name: "Distrito Nobre",
    description:
      "Onde os ricos e poderosos vivem. Mansões elegantes e jardins bem cuidados contrastam com o resto da cidade.",
    image: "noble_district",
    npcs: ["noble", "guard_captain"],
    enemies: ["city_guard"],
    items: [],
    connectedLocations: [
      { id: "market_district", name: "Distrito do Mercado" },
      { id: "palace", name: "Palácio Real" },
    ],
  },
  {
    id: "palace",
    name: "Palácio Real",
    description:
      "O majestoso palácio do rei de Elbion, agora praticamente abandonado após o desaparecimento da família real.",
    image: "palace",
    npcs: ["royal_advisor"],
    enemies: ["city_guard"],
    items: ["royal_document"],
    connectedLocations: [{ id: "noble_district", name: "Distrito Nobre" }],
  },
  {
    id: "undercity",
    name: "Cidade Baixa",
    description:
      "Os bairros pobres da capital, onde a criminalidade é alta e a guarda raramente aparece.",
    image: "undercity",
    npcs: ["thief", "informant", "rebel"],
    enemies: ["thug", "assassin"],
    items: [],
    connectedLocations: [
      { id: "market_district", name: "Distrito do Mercado" },
      { id: "the_pit", name: "O Poço" },
    ],
  },
  {
    id: "the_pit",
    name: "O Poço",
    description:
      "Uma arena de combate clandestina onde lutadores se enfrentam por dinheiro e glória.",
    image: "the_pit",
    npcs: ["pit_master"],
    enemies: ["pit_fighter"],
    items: [],
    boss: "black_knight",
    connectedLocations: [{ id: "undercity", name: "Cidade Baixa" }],
  },

  // Localizações da Fase 3 - Guerra contra a Ordem das Sombras
  {
    id: "war_council",
    name: "Conselho de Guerra",
    description:
      "Uma sala secreta na capital onde os líderes da resistência se reúnem para planejar.",
    image: "war_council",
    npcs: ["resistance_leader", "military_advisor", "spy_master"],
    enemies: [],
    items: ["war_map"],
    connectedLocations: [
      { id: "market_district", name: "Distrito do Mercado" },
      { id: "northern_villages", name: "Vilas do Norte" },
      { id: "eastern_mountains", name: "Montanhas do Leste" },
      { id: "western_forests", name: "Florestas do Oeste" },
    ],
  },
  {
    id: "northern_villages",
    name: "Vilas do Norte",
    description:
      "Pequenas comunidades no norte do reino, algumas já sob ataque da Ordem das Sombras.",
    image: "northern_villages",
    npcs: ["village_elder", "militia_captain", "refugee"],
    enemies: ["shadow_soldier", "shadow_scout"],
    items: ["supplies"],
    connectedLocations: [
      { id: "war_council", name: "Conselho de Guerra" },
      { id: "shadow_encampment", name: "Acampamento das Sombras" },
    ],
  },
  {
    id: "eastern_mountains",
    name: "Montanhas do Leste",
    description:
      "Território dos anões, que possuem as melhores forjas e guerreiros resistentes.",
    image: "eastern_mountains",
    npcs: ["dwarf_king", "master_smith", "dwarf_warrior"],
    enemies: ["mountain_troll", "shadow_infiltrator"],
    items: ["dwarven_weapon"],
    connectedLocations: [
      { id: "war_council", name: "Conselho de Guerra" },
      { id: "shadow_encampment", name: "Acampamento das Sombras" },
    ],
  },
  {
    id: "western_forests",
    name: "Florestas do Oeste",
    description:
      "Lar dos elfos, arqueiros habilidosos e magos poderosos que vivem em harmonia com a natureza.",
    image: "western_forests",
    npcs: ["elf_queen", "archdruid", "elf_scout"],
    enemies: ["corrupted_treant", "shadow_beast"],
    items: ["elven_bow"],
    connectedLocations: [
      { id: "war_council", name: "Conselho de Guerra" },
      { id: "shadow_encampment", name: "Acampamento das Sombras" },
    ],
  },
  {
    id: "shadow_encampment",
    name: "Acampamento das Sombras",
    description:
      "Um grande acampamento militar onde a Ordem das Sombras reúne suas forças.",
    image: "shadow_encampment",
    npcs: ["captured_spy"],
    enemies: ["shadow_soldier", "shadow_mage", "shadow_beast"],
    items: ["battle_plans"],
    connectedLocations: [
      { id: "northern_villages", name: "Vilas do Norte" },
      { id: "eastern_mountains", name: "Montanhas do Leste" },
      { id: "western_forests", name: "Florestas do Oeste" },
      { id: "shadow_fortress", name: "Fortaleza Sombria" },
    ],
  },
  {
    id: "shadow_fortress",
    name: "Fortaleza Sombria",
    description:
      "A base principal da Ordem das Sombras, uma fortaleza imponente e sinistra.",
    image: "shadow_fortress",
    npcs: [],
    enemies: ["shadow_elite", "shadow_mage", "shadow_beast"],
    items: [],
    boss: "shadow_general",
    connectedLocations: [
      { id: "shadow_encampment", name: "Acampamento das Sombras" },
      { id: "throne_room", name: "Sala do Trono" },
    ],
  },
  {
    id: "throne_room",
    name: "Sala do Trono",
    description:
      "O coração da Fortaleza Sombria, onde o General Sombrio planeja a conquista total de Elbion.",
    image: "throne_room",
    npcs: [],
    enemies: [],
    items: ["royal_crown"],
    boss: "shadow_general",
    connectedLocations: [{ id: "shadow_fortress", name: "Fortaleza Sombria" }],
  },
];
