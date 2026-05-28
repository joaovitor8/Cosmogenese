import type { ChemicalElement } from "../types";

const noAbundance = {
  universe: null,
  earthCrust: null,
  earthAtmosphere: null,
  earthOcean: null,
  humanBody: null,
};

const syntheticActinide = {
  cosmicOrigin: "human-made" as const,
  cosmicOriginNote:
    "Não existe naturalmente em quantidades significativas — sintetizado em reatores ou aceleradores. Decai em poucos segundos a milhares de anos dependendo do isótopo.",
  cosmicOriginNoteEn:
    "Does not naturally exist in significant amounts — synthesized in reactors or accelerators. Decays in seconds to thousands of years depending on the isotope.",
  abundance: noAbundance,
  biologicalRole: "toxic" as const,
  biologicalRoleNote: "Radioativo; biologicamente tóxico por radiação ionizante.",
  biologicalRoleNoteEn: "Radioactive; biologically toxic via ionizing radiation.",
  naturalSources: ["sintetizado em reatores nucleares ou aceleradores de partículas"],
  naturalSourcesEn: ["synthesized in nuclear reactors or particle accelerators"],
};

export const actinides: ChemicalElement[] = [
  {
    number: 89,
    symbol: "Ac",
    name: "Actínio",
    nameEn: "Actinium",
    category: "actinide",
    column: 4,
    row: 9,
    summary:
      "O ancestral que dá nome à sua família radioativa, emitindo um suave brilho azul pálido na completa escuridão.",
    summaryEn:
      "The ancestor that names its radioactive family, emitting a soft pale blue glow in complete darkness.",
    cosmicOrigin: "neutron-star-merger",
    cosmicOriginNote:
      "Existe em traços na natureza como produto de decaimento do urânio; brilha por sua própria radioatividade alfa.",
    cosmicOriginNoteEn:
      "Exists in traces in nature as a uranium decay product; glows from its own alpha radioactivity.",
    abundance: { universe: null, earthCrust: 5.5e-10, earthAtmosphere: null, earthOcean: null, humanBody: null },
    biologicalRole: "toxic",
    biologicalRoleNote: "Extremamente radioativo; estudado para terapia alfa direcionada contra câncer.",
    biologicalRoleNoteEn: "Extremely radioactive; studied for targeted alpha therapy against cancer.",
    naturalSources: ["traços em minérios de urânio"],
    naturalSourcesEn: ["traces in uranium ores"],
    discoveryYear: 1899,
    discoveredBy: "André-Louis Debierne",
  },
  {
    number: 90,
    symbol: "Th",
    name: "Tório",
    nameEn: "Thorium",
    category: "actinide",
    column: 5,
    row: 9,
    summary:
      "Batizado em homenagem ao deus nórdico do trovão, carrega tanta energia latente que é estudado como a energia nuclear do futuro.",
    summaryEn:
      "Named after the Norse god of thunder, it carries so much latent energy it is studied as the nuclear energy of the future.",
    cosmicOrigin: "neutron-star-merger",
    cosmicOriginNote:
      "Forjado pelo processo-r em fusões de estrelas de nêutrons; com meia-vida de 14 bilhões de anos, é o actinídeo mais abundante na crosta.",
    cosmicOriginNoteEn:
      "Forged by the r-process in neutron star mergers; with a 14-billion-year half-life, it is the most abundant actinide in the crust.",
    abundance: { universe: 0.00004, earthCrust: 9.6, earthAtmosphere: null, earthOcean: 1e-9, humanBody: 0.0001 },
    biologicalRole: "toxic",
    biologicalRoleNote: "Radiologicamente perigoso; pode substituir cálcio em ossos e causar câncer ósseo.",
    biologicalRoleNoteEn: "Radiologically dangerous; can replace calcium in bones and cause bone cancer.",
    naturalSources: ["monazita", "torita"],
    naturalSourcesEn: ["monazite", "thorite"],
    discoveryYear: 1828,
    discoveredBy: "Jöns Jacob Berzelius",
  },
  {
    number: 91,
    symbol: "Pa",
    name: "Protactínio",
    nameEn: "Protactinium",
    category: "actinide",
    column: 6,
    row: 9,
    summary:
      "Extremamente tóxico e raro, o seu nome significa literalmente 'pai do actínio' na cadeia de decaimento radioativo.",
    summaryEn:
      "Extremely toxic and rare, its name literally means 'father of actinium' in the radioactive decay chain.",
    cosmicOrigin: "neutron-star-merger",
    cosmicOriginNote: "Existe em traços como produto da cadeia de decaimento do urânio-235.",
    cosmicOriginNoteEn: "Exists in traces as a product of the uranium-235 decay chain.",
    abundance: { universe: null, earthCrust: 1.4e-6, earthAtmosphere: null, earthOcean: 5e-11, humanBody: null },
    biologicalRole: "toxic",
    biologicalRoleNote: "Extremamente radioativo e tóxico; um dos elementos mais caros de purificar.",
    biologicalRoleNoteEn: "Extremely radioactive and toxic; one of the most expensive elements to purify.",
    naturalSources: ["traços em minérios de urânio"],
    naturalSourcesEn: ["traces in uranium ores"],
    discoveryYear: 1913,
    discoveredBy: "Kazimierz Fajans & Oswald Helmuth Göhring",
  },
  {
    number: 92,
    symbol: "U",
    name: "Urânio",
    nameEn: "Uranium",
    category: "actinide",
    column: 7,
    row: 9,
    summary:
      "O titã da era atômica, cujos átomos instáveis foram forjados há bilhões de anos, antes mesmo de o nosso sistema solar existir.",
    summaryEn:
      "The titan of the atomic age, whose unstable atoms were forged billions of years ago, even before our solar system existed.",
    cosmicOrigin: "neutron-star-merger",
    cosmicOriginNote:
      "Forjado pelo processo-r em fusões de estrelas de nêutrons; metade do urânio original da Terra já decaiu desde a formação do planeta.",
    cosmicOriginNoteEn:
      "Forged by the r-process in neutron star mergers; half of Earth's original uranium has already decayed since the planet formed.",
    abundance: { universe: 0.0002, earthCrust: 2.7, earthAtmosphere: null, earthOcean: 0.0033, humanBody: 0.0001 },
    biologicalRole: "toxic",
    biologicalRoleNote:
      "Quimicamente tóxico (rins) e radiologicamente perigoso; mas seu calor radioativo aquece o interior da Terra há 4,5 bilhões de anos.",
    biologicalRoleNoteEn:
      "Chemically toxic (kidneys) and radiologically dangerous; but its radioactive heat has been warming Earth's interior for 4.5 billion years.",
    naturalSources: ["uraninita", "carnotita", "monazita", "água do mar"],
    naturalSourcesEn: ["uraninite", "carnotite", "monazite", "seawater"],
    discoveryYear: 1789,
    discoveredBy: "Martin Heinrich Klaproth",
  },
  {
    number: 93,
    symbol: "Np",
    name: "Netúnio",
    nameEn: "Neptunium",
    category: "actinide",
    column: 8,
    row: 9,
    summary:
      "O primeiro elemento transurânico criado, que levou a tabela periódica para além da fronteira do Urânio (assim como o planeta Netuno).",
    summaryEn:
      "The first transuranic element ever created, taking the periodic table beyond Uranium (just like the planet Neptune).",
    ...syntheticActinide,
    cosmicOrigin: "human-made",
    discoveryYear: 1940,
    discoveredBy: "Edwin McMillan & Philip Abelson",
  },
  {
    number: 94,
    symbol: "Pu",
    name: "Plutônio",
    nameEn: "Plutonium",
    category: "actinide",
    column: 9,
    row: 9,
    summary:
      "Nasce artificialmente em reatores; tem energia suficiente para alimentar as sondas espaciais que viajam para fora da nossa galáxia.",
    summaryEn:
      "Born artificially in reactors; has enough energy to power space probes traveling beyond our galaxy.",
    ...syntheticActinide,
    cosmicOrigin: "human-made",
    cosmicOriginNote:
      "Sintetizado em reatores nucleares; o isótopo Pu-238 alimenta sondas espaciais como Voyager e Curiosity há décadas.",
    cosmicOriginNoteEn:
      "Synthesized in nuclear reactors; the Pu-238 isotope has powered space probes like Voyager and Curiosity for decades.",
    biologicalRoleNote: "Extremamente tóxico — uma das substâncias mais perigosas que existem.",
    biologicalRoleNoteEn: "Extremely toxic — one of the most dangerous substances in existence.",
    naturalSources: ["sintetizado em reatores nucleares (ínfimos traços naturais)"],
    naturalSourcesEn: ["synthesized in nuclear reactors (minute natural traces)"],
    discoveryYear: 1940,
    discoveredBy: "Glenn T. Seaborg & equipe",
  },
  {
    number: 95,
    symbol: "Am",
    name: "Amerício",
    nameEn: "Americium",
    category: "actinide",
    column: 10,
    row: 9,
    summary:
      "Embora sintético e radioativo, é o guarda silencioso da sua casa, sendo a tecnologia central dentro dos detectores de fumo.",
    summaryEn:
      "Although synthetic and radioactive, it is the silent guard of your home — the core technology inside smoke detectors.",
    ...syntheticActinide,
    cosmicOrigin: "human-made",
    biologicalRoleNote:
      "Tóxico em qualquer quantidade significativa; ínfimas quantidades seguramente seladas operam detectores de fumo.",
    biologicalRoleNoteEn:
      "Toxic in any significant amount; tiny safely sealed amounts operate smoke detectors.",
    naturalSources: ["sintetizado em reatores nucleares; usado em detectores de fumaça"],
    naturalSourcesEn: ["synthesized in nuclear reactors; used in smoke detectors"],
    discoveryYear: 1944,
    discoveredBy: "Glenn T. Seaborg & equipe",
  },
  {
    number: 96,
    symbol: "Cm",
    name: "Cúrio",
    nameEn: "Curium",
    category: "actinide",
    column: 11,
    row: 9,
    summary:
      "Criado em laboratório e nomeado em homenagem a Marie e Pierre Curie, emite tanta radioatividade que brilha num tom púrpura.",
    summaryEn:
      "Created in laboratory and named in honor of Marie and Pierre Curie, emits so much radioactivity that it glows purple.",
    ...syntheticActinide,
    cosmicOrigin: "human-made",
    discoveryYear: 1944,
    discoveredBy: "Glenn T. Seaborg, Ralph A. James & Albert Ghiorso",
  },
  {
    number: 97,
    symbol: "Bk",
    name: "Berquélio",
    nameEn: "Berkelium",
    category: "actinide",
    column: 12,
    row: 9,
    summary:
      "Forjado em ciclotrões, o seu tempo de vida é tão curto que é quase exclusivamente utilizado para pesquisa nuclear teórica.",
    summaryEn:
      "Forged in cyclotrons, its lifespan is so short it is used almost exclusively for theoretical nuclear research.",
    ...syntheticActinide,
    cosmicOrigin: "human-made",
    discoveryYear: 1949,
    discoveredBy: "Stanley G. Thompson, Albert Ghiorso & Glenn T. Seaborg",
  },
  {
    number: 98,
    symbol: "Cf",
    name: "Califórnio",
    nameEn: "Californium",
    category: "actinide",
    column: 13,
    row: 9,
    summary:
      "Uma autêntica 'metralhadora de nêutrons', usado em radares terrestres potentes para encontrar jazidas de ouro e prata.",
    summaryEn:
      "A true 'neutron machine gun', used in powerful ground radars to find gold and silver deposits.",
    ...syntheticActinide,
    cosmicOrigin: "human-made",
    naturalSources: ["sintetizado em reatores; usado em prospecção mineral e medicina"],
    naturalSourcesEn: ["synthesized in reactors; used in mineral prospecting and medicine"],
    discoveryYear: 1950,
    discoveredBy: "Stanley G. Thompson, Kenneth Street Jr., Albert Ghiorso & Glenn T. Seaborg",
  },
  {
    number: 99,
    symbol: "Es",
    name: "Einstênio",
    nameEn: "Einsteinium",
    category: "actinide",
    column: 14,
    row: 9,
    summary:
      "Descoberto pela primeira vez nas cinzas trágicas da primeira detonação termonuclear, presta homenagem a Albert Einstein.",
    summaryEn:
      "First discovered in the tragic ashes of the first thermonuclear detonation, honors Albert Einstein.",
    ...syntheticActinide,
    cosmicOrigin: "human-made",
    cosmicOriginNote:
      "Descoberto nas cinzas radioativas da explosão Ivy Mike (1952) — a primeira detonação termonuclear da história.",
    cosmicOriginNoteEn:
      "Discovered in the radioactive ashes of the Ivy Mike explosion (1952) — the first thermonuclear detonation in history.",
    discoveryYear: 1952,
    discoveredBy: "Albert Ghiorso & equipe",
  },
  {
    number: 100,
    symbol: "Fm",
    name: "Férmio",
    nameEn: "Fermium",
    category: "actinide",
    column: 15,
    row: 9,
    summary:
      "A fronteira final: é o último elemento pesado que pode ser construído apenas atirando nêutrons contra elementos mais leves.",
    summaryEn:
      "The final frontier: the last heavy element that can be built simply by firing neutrons at lighter elements.",
    ...syntheticActinide,
    cosmicOrigin: "human-made",
    discoveryYear: 1952,
    discoveredBy: "Albert Ghiorso & equipe",
  },
  {
    number: 101,
    symbol: "Md",
    name: "Mendelévio",
    nameEn: "Mendelevium",
    category: "actinide",
    column: 16,
    row: 9,
    summary: "Nomeado em homenagem a Dmitri Mendeleiev, o brilhante arquiteto que desenhou a primeira Tabela Periódica.",
    summaryEn: "Named in honor of Dmitri Mendeleev, the brilliant architect who designed the first Periodic Table.",
    ...syntheticActinide,
    cosmicOrigin: "human-made",
    discoveryYear: 1955,
    discoveredBy: "Albert Ghiorso, Bernard G. Harvey, Gregory R. Choppin, Stanley G. Thompson & Glenn T. Seaborg",
  },
  {
    number: 102,
    symbol: "No",
    name: "Nobélio",
    nameEn: "Nobelium",
    category: "actinide",
    column: 17,
    row: 9,
    summary:
      "Homenageia Alfred Nobel; as suas propriedades só podem ser estudadas átomo por átomo antes que se desintegre.",
    summaryEn:
      "Honors Alfred Nobel; its properties can only be studied atom by atom before it disintegrates.",
    ...syntheticActinide,
    cosmicOrigin: "human-made",
    discoveryYear: 1966,
    discoveredBy: "JINR (Dubna)",
  },
  {
    number: 103,
    symbol: "Lr",
    name: "Laurêncio",
    nameEn: "Lawrencium",
    category: "actinide",
    column: 18,
    row: 9,
    summary:
      "O último dos actinídeos. Marca o fim da era dos elementos radioativos que 'flutuam' abaixo da tabela principal.",
    summaryEn:
      "The last of the actinides. Marks the end of the radioactive elements that 'float' below the main table.",
    ...syntheticActinide,
    cosmicOrigin: "human-made",
    discoveryYear: 1961,
    discoveredBy: "Albert Ghiorso, Torbjørn Sikkeland, Almon Larsh & Robert M. Latimer",
  },
];
