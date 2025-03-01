// Definição dos NPCs do jogo
export const npcs = [
  // NPCs da Fase 1 - Vila de Ravenwood
  {
    id: "mestre_thorne",
    name: "Mestre Thorne",
    description:
      "Um sábio andarilho que viu o potencial em você. Ele conhece muitos segredos do reino de Elbion.",
    location: "village_square",
    quests: ["mission1_1"],
    dialogues: {
      default: [
        "Olá, jovem aventureiro! O destino o aguarda. Uma antiga profecia fala de alguém como você.",
        "Os sinais estão claros. Você tem a marca do herói que salvará nosso reino de Elbion da escuridão que se aproxima.",
        "Mas antes de partir em sua jornada, você deve provar seu valor aqui em Ravenwood.",
      ],
      mission1_1: [
        "Bandidos têm atacado nossa vila. Ajude-nos a defendê-la!",
        "Derrote os bandidos que estão nos arredores da vila e encontre seu líder, Garrick.",
        "Ele deve estar escondido nas ruínas antigas a leste daqui.",
      ],
      mission1_1_complete: [
        "Você provou seu valor, jovem herói!",
        "Agora deve partir para a capital de Elbion e descobrir mais sobre seu destino.",
        "Leve este amuleto. Ele pertenceu a um grande herói do passado e agora é seu.",
      ],
    },
  },
  {
    id: "historiador_anzu",
    name: "Historiador Anzu",
    description:
      "Um velho sábio com conhecimentos sobre as antigas lendas e histórias do reino de Elbion.",
    location: "village_square",
    dialogues: {
      default: [
        "Hah! Vocês acham que qualquer um pode simplesmente ouvir essa história? Vá falar com Throne... quem sabe um dia eu conto a história dos lendários heróis de Iphanewa, há muito tempo esquecidos.",
      ],
    },
  },
  {
    id: "comerciante_gorn",
    name: "Comerciante Gorn",
    description:
      "Um comerciante robusto e bem-humorado que vende os melhores itens de Ravenwood.",
    location: "village_square",
    isShopkeeper: true,
    dialogues: {
      default: [
        "Bem-vindo à minha loja, aventureiro! Tenho os melhores itens de Ravenwood.",
        "Armas, armaduras, poções... tudo que você precisa para suas aventuras!",
        "Tenho um estoque especial de poções de cura que acabaram de chegar. Apenas 5 moedas de ouro cada.",
      ],
      shop: [
        "O que deseja comprar hoje? Tenho itens novos em estoque!",
        "Para um aventureiro como você, posso fazer um preço especial.",
        "Estas poções de cura são essenciais para sua jornada. Não saia sem algumas!",
      ],
      info: [
        "Ouvi dizer que nas ruínas antigas a leste há um tesouro escondido.",
        "Mas cuidado com os esqueletos que guardam o local!",
        "Também dizem que Garrick, o líder dos bandidos, possui uma espada mágica.",
      ],
    },
  },
  {
    id: "estalajadeiro_bram",
    name: "Estalajadeiro Bram",
    description:
      "O dono da Taverna do Javali Dourado. Conhece todas as histórias e rumores da região.",
    location: "village_tavern",
    dialogues: {
      default: [
        "Bem-vindo à Taverna do Javali Dourado! A melhor cerveja de todo o reino de Elbion!",
        "Quer ouvir as últimas notícias? Sempre sei de tudo que acontece por aqui.",
        "Se precisar descansar, tenho quartos disponíveis por apenas 2 moedas de ouro.",
      ],
      rumors: [
        "Dizem que bandidos estão se escondendo na floresta ao norte. Tenha cuidado se for para lá.",
        "O líder deles, Garrick, é um homem perigoso e tem uma recompensa por sua cabeça.",
        "Também ouvi rumores sobre ruínas antigas a leste da vila. Alguns dizem que há tesouros escondidos lá.",
        "Ninguém que entrou voltou para contar a história... Bem, exceto por um velho minerador que jurou ter visto um amuleto brilhante.",
      ],
      rest: [
        "Um quarto para a noite? Claro, são apenas 2 moedas de ouro.",
        "Descanse bem, aventureiro. Uma noite de sono recupera totalmente sua saúde e mana!",
        "Seu quarto está pronto. É o terceiro à direita, subindo as escadas.",
      ],
    },
  },

  // NPCs da Fase 2 - Capital de Elbion
  {
    id: "gate_guard",
    name: "Guarda do Portão",
    description:
      "Um guarda da cidade com aparência severa, mas que respeita aventureiros de renome.",
    location: "capital_gates",
    dialogues: {
      default: [
        "Pare aí! Identifique-se antes de entrar na capital de Elbion.",
        "Ah, você é o aventureiro de Ravenwood? Ouvi falar de seus feitos.",
        "Pode passar, mas fique atento. A cidade não é tão segura quanto já foi.",
      ],
      info: [
        "A capital está em desordem desde que o rei desapareceu.",
        "Lordes corruptos disputam o poder e mercenários dominam as ruas.",
        "Recomendo que visite a Taverna do Dragão Dourado no distrito do mercado.",
        "O taverneiro pode lhe dar informações úteis sobre a situação na capital.",
      ],
    },
  },
  {
    id: "taverneiro",
    name: "Taverneiro",
    description:
      "O dono da Taverna do Dragão Dourado, um homem de meia-idade com cicatrizes de batalha.",
    location: "market_district",
    quests: ["mission2_1"],
    dialogues: {
      default: [
        "Bem-vindo à Taverna do Dragão Dourado, forasteiro.",
        "Não vejo muitos rostos novos por aqui ultimamente. A cidade não está em seus melhores dias.",
        "Se está procurando um lugar para ficar, tenho quartos disponíveis. Se quer informações, tenho isso também... pelo preço certo.",
      ],
      mission2_1: [
        "Interessado na política da cidade, é? Bem, existem três facções principais disputando o poder.",
        "A Guarda Real, leal ao rei desaparecido; a Ordem Mercante, que controla o comércio; e a Irmandade das Sombras, que opera nos becos escuros.",
        "Cada uma tem seus próprios métodos e objetivos. A quem você pretende se aliar?",
      ],
      factions: [
        "A Guarda Real quer restaurar a ordem e encontrar o rei. São honrados, mas estão perdendo poder.",
        "A Ordem Mercante quer estabilidade para o comércio florescer. Têm dinheiro, mas falta-lhes força militar.",
        "A Irmandade das Sombras quer derrubar o sistema atual. São perigosos, mas têm informações valiosas.",
      ],
    },
  },
  {
    id: "pit_master",
    name: "Mestre do Poço",
    description:
      "Um homem musculoso com cicatrizes por todo o corpo. Ele organiza as lutas na arena clandestina.",
    location: "the_pit",
    quests: ["mission2_2"],
    dialogues: {
      default: [
        "Bem-vindo ao Poço, forasteiro. Aqui, apenas os fortes sobrevivem.",
        "Quer participar das lutas? O prêmio é bom, mas você precisa provar seu valor primeiro.",
        "Três lutas. Três oponentes. Se sobreviver, será respeitado aqui.",
      ],
      mission2_2: [
        "Seu primeiro oponente será Krull, o Esmagador. Ele é forte, mas lento.",
        "Depois, enfrentará Vex, a Lâmina Veloz. Ela é rápida e mortal.",
        "Por fim, o Cavaleiro Negro. Ninguém sabe quem ele é, mas nunca foi derrotado.",
      ],
      victory: [
        "Impressionante! Você derrotou todos os oponentes!",
        "O Poço reconhece sua força. Aqui está sua recompensa: 50 moedas de ouro.",
        "E mais importante: você ganhou o respeito da arena. Sua facção ficará satisfeita.",
      ],
    },
  },

  // NPCs da Fase 3 - Guerra contra a Ordem das Sombras
  {
    id: "resistance_leader",
    name: "Líder da Resistência",
    description:
      "Um nobre que abandonou seus títulos para lutar contra a Ordem das Sombras.",
    location: "war_council",
    quests: ["mission3_1"],
    dialogues: {
      default: [
        "Bem-vindo ao Conselho de Guerra, herói. Precisamos de toda a ajuda possível.",
        "A Ordem das Sombras está avançando rapidamente. Eles já controlam várias regiões do reino.",
        "Precisamos unir forças com outros povos de Elbion para ter chance de vitória.",
      ],
      mission3_1: [
        "Precisamos de aliados. Os anões das Montanhas do Leste e os elfos das Florestas do Oeste seriam aliados poderosos.",
        "Também há vilas no Norte que poderiam fornecer suprimentos e guerreiros.",
        "Viaje por essas regiões e convença-os a se unirem à nossa causa. O futuro de Elbion depende disso.",
      ],
      strategy: [
        "Nossa estratégia é simples: primeiro, reunir aliados e recursos.",
        "Depois, enfraquecer a Ordem com ataques de sabotagem aos seus suprimentos.",
        "Por fim, um ataque direto à Fortaleza Sombria para derrotar o General Sombrio.",
      ],
    },
  },
  {
    id: "dwarf_king",
    name: "Rei dos Anões",
    description:
      "O orgulhoso rei dos anões, conhecido por sua sabedoria e habilidade em combate.",
    location: "eastern_mountains",
    dialogues: {
      default: [
        "O que um humano faz nas Montanhas do Leste? Poucos de sua raça são bem-vindos aqui.",
        "A Ordem das Sombras? Sim, conhecemos seus ataques. Eles tentaram invadir nossas minas.",
        "Por que deveríamos ajudar os humanos? Vocês nunca se importaram com nossos problemas antes.",
      ],
      convince: [
        "Hmm, você fala com coragem e honestidade. Qualidades raras entre humanos.",
        "Se quiser nossa ajuda, prove seu valor. Há um troll nas minas que tem causado problemas.",
        "Derrote-o e considerarei sua proposta de aliança.",
      ],
      alliance: [
        "Você provou seu valor, humano. Os anões lutarão ao seu lado contra a Ordem das Sombras.",
        "Nossas forjas produzirão armas e armaduras para a guerra, e nossos guerreiros marcharão com você.",
        "Que nossas marteladas ecoem no campo de batalha e esmaguem nossos inimigos!",
      ],
    },
  },
  {
    id: "elf_queen",
    name: "Rainha dos Elfos",
    description:
      "A bela e sábia rainha dos elfos, com poderes mágicos ancestrais.",
    location: "western_forests",
    dialogues: {
      default: [
        "Seja bem-vindo às Florestas do Oeste, viajante. Poucos humanos chegam tão longe em nosso território.",
        "Sim, sentimos a escuridão se espalhando pelo reino. A Ordem das Sombras corrompe a natureza por onde passa.",
        "Os elfos preferem não se envolver nas guerras dos humanos, mas esta ameaça afeta a todos nós.",
      ],
      convince: [
        "Para ganhar nossa confiança, você deve provar sua harmonia com a natureza.",
        "A floresta está sendo corrompida por criaturas sombrias. Purifique o Bosque Sagrado eliminando essas criaturas.",
        "Só então consideraremos uma aliança com os humanos.",
      ],
      alliance: [
        "Você mostrou respeito pela natureza e coragem diante da escuridão.",
        "Os elfos lutarão ao seu lado. Nossos arqueiros e magos serão valiosos na batalha contra a Ordem das Sombras.",
        "Que a luz da natureza guie nossos passos e fortaleça nossos corações na batalha que está por vir.",
      ],
    },
  },
];
