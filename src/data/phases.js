export const phases = [
  {
    id: "phase1",
    name: "O Chamado do Destino",
    description:
      "Você começa como um jovem aventureiro em uma vila esquecida. Seu mestre, um sábio andarilho, prevê um futuro grandioso para você. Mas antes de seguir sua jornada, você deve provar seu valor.",
    introduction:
      "Bem-vindo à vila de Ravenwood, um lugar pacífico nos confins do reino de Elbion. Você cresceu aqui, treinando sob a tutela do velho Mestre Thorne, um sábio andarilho que viu em você o potencial para grandes feitos. Hoje, ele tem uma notícia importante para você...",
    startLocation: "village",
    missions: [
      {
        id: "mission1_1",
        name: "A Profecia 📜",
        description: "Converse com o Mestre Thorne para descobrir seu destino.",
        objective: "Falar com Mestre Thorne na cabana no centro da vila.",
        reward: "Informação sobre seu destino e 50 de experiência.",
        completed: false,
      },
      {
        id: "mission1_2",
        name: "Defesa da Vila 🛡️",
        description:
          "Bandidos estão atacando a vila! Defenda os moradores e derrote o líder dos bandidos.",
        objective: "Derrotar 5 bandidos e o líder Garrick.",
        reward:
          "Espada/Arco/Cajado de Iniciado (dependendo da classe) e 100 de experiência.",
        completed: false,
      },
      {
        id: "mission1_3",
        name: "A Relíquia Antiga 🏺",
        description:
          "Mestre Thorne acredita que uma relíquia antiga está escondida nas ruínas próximas à vila. Encontre-a para provar seu valor.",
        objective: "Explorar as ruínas e encontrar o Amuleto de Elbion.",
        reward:
          "Amuleto de Elbion (acessório que aumenta atributos), 150 de experiência e passagem para a capital.",
        completed: false,
      },
    ],
    enemies: [
      {
        id: "bandit",
        name: "Bandido 🗡️",
        health: 30,
        damage: 5,
        experience: 20,
        gold: 5,
        loot: ["health_potion", "rusty_dagger"],
        emoji: "🗡️",
      },
      {
        id: "bandit_archer",
        name: "Bandido Arqueiro 🏹",
        health: 25,
        damage: 7,
        experience: 25,
        gold: 7,
        loot: ["health_potion", "arrows"],
        emoji: "🏹",
      },
      {
        id: "wolf",
        name: "Lobo 🐺",
        health: 20,
        damage: 6,
        experience: 15,
        gold: 0,
        loot: ["wolf_pelt"],
        emoji: "🐺",
      },
      {
        id: "skeleton",
        name: "Esqueleto 💀",
        health: 35,
        damage: 8,
        experience: 30,
        gold: 10,
        loot: ["bone_dust", "rusty_sword"],
        emoji: "💀",
      },
      {
        id: "garrick",
        name: "Garrick, Líder dos Bandidos 👹",
        health: 80,
        damage: 12,
        experience: 100,
        gold: 50,
        loot: ["garrick_sword", "bandit_map", "health_potion"],
        isBoss: true,
        emoji: "👹",
      },
    ],
    locations: [
      {
        id: "village",
        name: "Vila de Ravenwood",
        description:
          "Uma pequena vila pacífica nos confins do reino. Possui algumas casas, uma taverna e a cabana do Mestre Thorne.",
        npcs: ["mestre_thorne", "comerciante_gorn", "estalajadeiro_bram"],
        shops: ["blacksmith_shop", "general_store"],
      },
      {
        id: "forest",
        name: "Floresta de Ravenwood",
        description:
          "Uma densa floresta que cerca a vila. Lar de animais selvagens e, recentemente, de bandidos.",
        enemies: ["bandit", "bandit_archer", "wolf"],
        items: ["herbs", "mushrooms"],
      },
      {
        id: "ruins",
        name: "Ruínas Antigas",
        description:
          "Ruínas de uma antiga civilização, agora tomadas pela vegetação. Dizem que tesouros estão escondidos em suas profundezas.",
        enemies: ["bandit", "skeleton"],
        items: ["ancient_amulet", "gold_coins"],
        boss: "garrick",
      },
    ],
  },
  {
    id: "phase2",
    name: "O Reino em Ruínas",
    description:
      "A capital de Elbion está em desordem. Lordes corruptos disputam o poder e mercenários dominam as ruas. Aqui, você deve se aliar a uma facção e provar seu valor em torneios e combates clandestinos.",
    introduction:
      "Você chega à capital de Elbion, uma cidade imponente com torres altas e muralhas de pedra. No entanto, logo percebe que por trás da fachada grandiosa, a cidade está em caos. Guardas corruptos patrulham as ruas, nobres disputam poder, e o povo sofre. É hora de escolher um lado e fazer a diferença.",
    startLocation: "capital_gates",
    missions: [
      {
        id: "mission2_1",
        name: "Chegada à Capital",
        description:
          "Encontre um lugar para ficar na capital e descubra mais sobre a situação política.",
        objective:
          "Falar com o taverneiro na Taverna do Dragão Dourado e escolher uma facção para apoiar.",
        reward: "100 de experiência e informações sobre as facções.",
        completed: false,
      },
      {
        id: "mission2_2",
        name: "Provando seu Valor",
        description:
          "Para ganhar a confiança de sua facção, você precisa provar seu valor em um torneio clandestino.",
        objective: "Vencer três lutas no Poço, a arena de combate clandestina.",
        reward: "200 de experiência, 50 de ouro e reconhecimento da facção.",
        completed: false,
      },
      {
        id: "mission2_3",
        name: "O Cavaleiro Negro",
        description:
          "Um misterioso Cavaleiro Negro tem aterrorizado a cidade. Sua facção pede que você o derrote e recupere um artefato roubado.",
        objective: "Derrotar o Cavaleiro Negro e recuperar a Coroa de Elbion.",
        reward:
          "Título de Nobre Aventureiro, 300 de experiência, armadura aprimorada e um aliado de confiança.",
        completed: false,
      },
    ],
    enemies: [
      {
        id: "city_guard",
        name: "Guarda Corrupto",
        health: 45,
        damage: 8,
        experience: 30,
        gold: 10,
        loot: ["health_potion", "guard_badge"],
      },
      {
        id: "pit_fighter",
        name: "Lutador do Poço",
        health: 60,
        damage: 12,
        experience: 40,
        gold: 15,
        loot: ["health_potion", "fighter_gloves"],
      },
      {
        id: "black_knight",
        name: "Cavaleiro Negro",
        health: 100,
        damage: 15,
        experience: 100,
        gold: 50,
        loot: ["black_armor", "royal_crown", "enchanted_weapon"],
      },
    ],
    locations: [
      {
        id: "capital_gates",
        name: "Portões da Capital",
        description:
          "Os imponentes portões da capital de Elbion, guardados por soldados de aparência severa.",
        npcs: ["gate_guard", "merchant"],
        shops: [],
      },
      {
        id: "market_district",
        name: "Distrito do Mercado",
        description:
          "Um lugar movimentado cheio de comerciantes, artesãos e cidadãos comuns. O coração econômico da cidade.",
        npcs: ["merchant", "craftsman", "beggar"],
        shops: ["weapon_shop", "armor_shop", "potion_shop"],
      },
      {
        id: "noble_district",
        name: "Distrito Nobre",
        description:
          "Onde os ricos e poderosos vivem. Mansões elegantes e jardins bem cuidados contrastam com o resto da cidade.",
        npcs: ["noble", "guard_captain"],
        enemies: ["city_guard"],
        shops: ["luxury_goods"],
      },
      {
        id: "undercity",
        name: "Cidade Baixa",
        description:
          "Os bairros pobres da capital, onde a criminalidade é alta e a guarda raramente aparece.",
        npcs: ["thief", "informant", "rebel"],
        enemies: ["thug", "assassin"],
        shops: ["black_market"],
        special: ["the_pit"],
      },
      {
        id: "the_pit",
        name: "O Poço",
        description:
          "Uma arena de combate clandestina onde lutadores se enfrentam por dinheiro e glória.",
        npcs: ["pit_master", "bookie"],
        enemies: ["pit_fighter"],
        boss: "black_knight",
      },
    ],
  },
  {
    id: "phase3",
    name: "A Rebelião dos Traidores",
    description:
      "Os traidores que destruíram a antiga realeza começaram uma guerra para assumir o poder. Você deve unir forças com outros guerreiros para lutar contra um exército sombrio.",
    introduction:
      "Com a Coroa de Elbion recuperada, a verdade sobre a queda da antiga realeza vem à tona. Um grupo conhecido como a Ordem das Sombras foi responsável pelo assassinato da família real e agora planeja tomar o reino à força. Como um dos poucos que conhece a verdade, você deve reunir aliados e enfrentar esta ameaça.",
    startLocation: "war_council",
    missions: [
      {
        id: "mission3_1",
        name: "Reunindo Aliados",
        description:
          "Viaje pelo reino para recrutar aliados para a batalha contra a Ordem das Sombras.",
        objective: "Recrutar pelo menos 3 facções ou grupos para sua causa.",
        reward: "300 de experiência e novos aliados para a batalha.",
        completed: false,
      },
      {
        id: "mission3_2",
        name: "Sabotagem",
        description:
          "A Ordem das Sombras está reunindo armas e suprimentos. Infiltre-se em seu acampamento e sabote seus planos.",
        objective:
          "Destruir o arsenal da Ordem e roubar seus planos de batalha.",
        reward:
          "350 de experiência, informações estratégicas e um item mágico.",
        completed: false,
      },
      {
        id: "mission3_3",
        name: "A Fortaleza Sombria",
        description:
          "É hora de atacar a fortaleza da Ordem das Sombras e derrotar seu líder, o General Sombrio.",
        objective:
          "Liderar o ataque à Fortaleza Sombria e derrotar o General Sombrio.",
        reward:
          "Montaria épica, acesso à guilda dos heróis, 500 de experiência e uma nova técnica de combate.",
        completed: false,
      },
    ],
    enemies: [
      {
        id: "shadow_soldier",
        name: "Soldado das Sombras",
        health: 70,
        damage: 12,
        experience: 50,
        gold: 15,
        loot: ["shadow_essence", "military_rations"],
      },
      {
        id: "shadow_mage",
        name: "Mago das Sombras",
        health: 50,
        damage: 18,
        experience: 60,
        gold: 20,
        loot: ["spell_book", "mana_crystal"],
      },
      {
        id: "shadow_general",
        name: "General Sombrio",
        health: 200,
        damage: 25,
        experience: 200,
        gold: 100,
        loot: ["shadow_armor", "general_sword", "royal_seal"],
      },
    ],
    locations: [
      {
        id: "war_council",
        name: "Conselho de Guerra",
        description:
          "Uma sala secreta na capital onde os líderes da resistência se reúnem para planejar.",
        npcs: ["resistance_leader", "military_advisor", "spy_master"],
        shops: [],
      },
      {
        id: "northern_villages",
        name: "Vilas do Norte",
        description:
          "Pequenas comunidades no norte do reino, algumas já sob ataque da Ordem das Sombras.",
        npcs: ["village_elder", "militia_captain", "refugee"],
        enemies: ["shadow_soldier", "shadow_scout"],
        shops: ["village_supplies"],
      },
      {
        id: "eastern_mountains",
        name: "Montanhas do Leste",
        description:
          "Território dos anões, que possuem as melhores forjas e guerreiros resistentes.",
        npcs: ["dwarf_king", "master_smith", "dwarf_warrior"],
        enemies: ["mountain_troll", "shadow_infiltrator"],
        shops: ["dwarven_forge"],
      },
      {
        id: "western_forests",
        name: "Florestas do Oeste",
        description:
          "Lar dos elfos, arqueiros habilidosos e magos poderosos que vivem em harmonia com a natureza.",
        npcs: ["elf_queen", "archdruid", "elf_scout"],
        enemies: ["corrupted_treant", "shadow_beast"],
        shops: ["elven_crafts"],
      },
      {
        id: "shadow_encampment",
        name: "Acampamento das Sombras",
        description:
          "Um grande acampamento militar onde a Ordem das Sombras reúne suas forças.",
        npcs: ["captured_spy"],
        enemies: ["shadow_soldier", "shadow_mage", "shadow_beast"],
        special: ["arsenal", "command_tent"],
      },
      {
        id: "shadow_fortress",
        name: "Fortaleza Sombria",
        description:
          "A base principal da Ordem das Sombras, uma fortaleza imponente e sinistra.",
        enemies: ["shadow_elite", "shadow_mage", "shadow_beast"],
        boss: "shadow_general",
      },
    ],
  },
  {
    id: "phase4",
    name: "O Julgamento dos Antigos",
    description:
      "Após grandes vitórias, o povo começa a aclamar seu nome. No entanto, para provar que é digno do trono, você deve enfrentar os espíritos dos antigos reis em um desafio divino.",
    introduction:
      "Com a derrota da Ordem das Sombras, o reino está sem um líder legítimo. Muitos começam a ver em você o futuro rei de Elbion. No entanto, uma antiga tradição diz que apenas aqueles que passarem pelo Julgamento dos Antigos podem reivindicar o trono. Você deve viajar ao Templo dos Sábios e enfrentar os testes impostos pelos espíritos dos reis passados.",
    startLocation: "royal_city",
    missions: [
      {
        id: "mission4_1",
        name: "A Jornada Sagrada",
        description:
          "Viaje até o Templo dos Sábios, um local sagrado e misterioso onde os antigos reis são julgados.",
        objective: "Encontrar o Templo dos Sábios e ganhar acesso aos testes.",
        reward: "400 de experiência e acesso aos testes reais.",
        completed: false,
      },
      {
        id: "mission4_2",
        name: "Os Três Testes",
        description:
          "Enfrente os três testes impostos pelos espíritos dos reis: o Teste da Sabedoria, o Teste da Coragem e o Teste da Compaixão.",
        objective: "Completar os três testes no Templo dos Sábios.",
        reward: "500 de experiência e a bênção dos antigos reis.",
        completed: false,
      },
      {
        id: "mission4_3",
        name: "O Confronto Final",
        description:
          "O último teste é enfrentar o espírito do Rei Elbion, o fundador do reino, em combate espiritual.",
        objective: "Derrotar o espírito do Rei Elbion e provar seu valor.",
        reward: "Título real, arma lendária e 600 de experiência.",
        completed: false,
      },
    ],
    enemies: [
      {
        id: "temple_guardian",
        name: "Guardião do Templo",
        health: 100,
        damage: 18,
        experience: 80,
        gold: 0,
        loot: ["guardian_essence"],
      },
      {
        id: "ancient_warrior",
        name: "Guerreiro Ancestral",
        health: 120,
        damage: 20,
        experience: 100,
        gold: 0,
        loot: ["ancestral_medal"],
      },
      {
        id: "king_elbion",
        name: "Espírito do Rei Elbion",
        health: 250,
        damage: 30,
        experience: 300,
        gold: 0,
        loot: ["crown_fragment", "royal_signet", "legendary_weapon"],
      },
    ],
    locations: [
      {
        id: "royal_city",
        name: "Cidade Real",
        description:
          "A antiga capital do reino, agora restaurada após a derrota da Ordem das Sombras.",
        npcs: ["royal_advisor", "high_priest", "people_representative"],
        shops: ["royal_outfitter", "master_craftsman"],
      },
      {
        id: "sacred_path",
        name: "Caminho Sagrado",
        description:
          "Uma antiga estrada que leva ao Templo dos Sábios, protegida por guardiões místicos.",
        npcs: ["pilgrim", "old_hermit"],
        enemies: ["temple_guardian", "sacred_beast"],
        shops: [],
      },
      {
        id: "temple_exterior",
        name: "Exterior do Templo",
        description:
          "A entrada do Templo dos Sábios, um lugar de grande poder espiritual.",
        npcs: ["temple_keeper"],
        enemies: ["temple_guardian"],
        shops: [],
      },
      {
        id: "wisdom_chamber",
        name: "Câmara da Sabedoria",
        description:
          "Uma sala no templo onde sua mente e conhecimento serão testados.",
        npcs: ["spirit_of_wisdom"],
        special: ["wisdom_test"],
      },
      {
        id: "courage_chamber",
        name: "Câmara da Coragem",
        description: "Uma sala no templo onde sua bravura será testada.",
        enemies: ["ancient_warrior", "fear_manifestation"],
        special: ["courage_test"],
      },
      {
        id: "compassion_chamber",
        name: "Câmara da Compaixão",
        description:
          "Uma sala no templo onde sua compaixão e justiça serão testadas.",
        npcs: ["spirit_of_compassion"],
        special: ["compassion_test"],
      },
      {
        id: "throne_chamber",
        name: "Câmara do Trono",
        description:
          "A câmara final do templo, onde o espírito do Rei Elbion aguarda.",
        boss: "king_elbion",
      },
    ],
  },
  {
    id: "phase5",
    name: "A Coroação e a Guerra Final",
    description:
      "Seu destino se aproxima. Você foi escolhido para ser o novo rei, mas os últimos inimigos tentarão impedir sua ascensão. Uma batalha final determinará o futuro de Elbion.",
    introduction:
      "Após passar pelo Julgamento dos Antigos, você retorna à capital como o legítimo herdeiro do trono de Elbion. No entanto, nem todos aceitam seu direito de governar. Um usurpador, apoiado por forças obscuras, reúne um exército para tomar o trono à força. Sua coroação deve acontecer antes que seja tarde demais.",
    startLocation: "coronation_hall",
    missions: [
      {
        id: "mission5_1",
        name: "Preparativos para a Coroação",
        description:
          "Reúna os artefatos reais necessários para a cerimônia de coroação e garanta a segurança da capital.",
        objective:
          "Recuperar a Coroa, o Cetro e o Manto Real, e fortalecer as defesas da cidade.",
        reward: "500 de experiência e os artefatos reais.",
        completed: false,
      },
      {
        id: "mission5_2",
        name: "A Traição",
        description:
          "Um traidor em seu círculo íntimo planeja sabotar sua coroação. Descubra quem é e impeça seus planos.",
        objective:
          "Identificar o traidor e impedir o ataque durante a cerimônia.",
        reward: "600 de experiência e lealdade renovada de seus aliados.",
        completed: false,
      },
      {
        id: "mission5_3",
        name: "A Batalha pelo Trono",
        description:
          "O usurpador lançou seu ataque final. Lidere suas forças em uma batalha épica pelo futuro de Elbion.",
        objective: "Derrotar o usurpador e seu exército, e unificar o reino.",
        reward:
          "O Trono de Elbion, evolução máxima e domínio de uma arte secreta.",
        completed: false,
      },
    ],
    enemies: [
      {
        id: "elite_mercenary",
        name: "Mercenário de Elite",
        health: 150,
        damage: 25,
        experience: 120,
        gold: 30,
        loot: ["elite_badge", "quality_weapon"],
      },
      {
        id: "dark_cultist",
        name: "Cultista das Trevas",
        health: 100,
        damage: 30,
        experience: 130,
        gold: 25,
        loot: ["dark_tome", "sacrificial_dagger"],
      },
      {
        id: "the_usurper",
        name: "O Usurpador",
        health: 400,
        damage: 40,
        experience: 500,
        gold: 200,
        loot: ["usurper_armor", "crown_of_lies", "soul_weapon"],
      },
    ],
    locations: [
      {
        id: "coronation_hall",
        name: "Salão da Coroação",
        description:
          "O grande salão do palácio real onde a cerimônia de coroação será realizada.",
        npcs: ["royal_advisor", "high_priest", "noble_allies"],
        shops: [],
      },
      {
        id: "royal_treasury",
        name: "Tesouro Real",
        description:
          "Onde os artefatos reais são guardados, agora sob forte vigilância.",
        npcs: ["royal_guard_captain"],
        enemies: ["treasury_thief"],
        special: ["royal_artifacts"],
      },
      {
        id: "city_walls",
        name: "Muralhas da Cidade",
        description:
          "As fortificações que protegem a capital, agora sendo reforçadas para o iminente ataque.",
        npcs: ["defense_commander", "engineer"],
        enemies: ["saboteur", "enemy_scout"],
        special: ["defense_preparations"],
      },
      {
        id: "underground_cult",
        name: "Culto Subterrâneo",
        description:
          "Um templo secreto sob a cidade onde cultistas planejam impedir sua coroação.",
        enemies: ["dark_cultist", "summoned_demon"],
        boss: "cult_leader",
      },
      {
        id: "battlefield",
        name: "Campo de Batalha",
        description:
          "As planícies fora da cidade onde a batalha final acontecerá.",
        npcs: ["army_general", "allied_commander"],
        enemies: ["elite_mercenary", "dark_cultist", "enemy_soldier"],
        boss: "the_usurper",
      },
      {
        id: "throne_room",
        name: "Sala do Trono",
        description:
          "O destino final de sua jornada, onde você será coroado como o novo rei de Elbion.",
        npcs: ["royal_court", "people_representatives"],
        special: ["coronation_ceremony"],
      },
    ],
  },
];
