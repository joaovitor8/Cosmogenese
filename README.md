# Cosmogênese

> Tabela periódica reescrita como arqueologia do cosmos — de onde vem cada átomo do seu corpo.

Cosmogênese é uma reinterpretação visual e interativa da tabela periódica que trata cada elemento não como uma célula estática, mas como o resultado de um evento cósmico: Big Bang, fusão estelar, supernova, colisão de estrelas de nêutrons, espalação por raios cósmicos, explosão de anã branca ou síntese humana. É uma extensão do projeto **Universe**.

## Principais funcionalidades

- **Tabela periódica completa (Z=1 → 118)** com layout 18×10 responsivo e tipografia HUD.
- **Origem cósmica** de cada elemento (`big-bang`, `stellar-fusion-low/high`, `supernova`, `neutron-star-merger`, `white-dwarf-explosion`, `cosmic-ray-spallation`, `human-made`) com tinta dedicada por origem.
- **Modo Stardust** — destaca apenas os elementos presentes no corpo humano, recolorindo cada um pela sua origem cósmica real. "Você é poeira de estrelas, literalmente."
- **Scanner / filtros** por categoria química, origem cósmica e papel biológico (essencial, traço, benéfico, tóxico).
- **Linha do tempo cósmica** correlacionando elementos a eventos no histórico do universo.
- **Command palette** (⌘K / Ctrl+K) para busca rápida por símbolo, número, nome (pt/en) ou origem.
- **Modal de elemento** com ficha completa: abundância (universo, crosta, atmosfera, oceano, corpo humano), cor de chama, linhas espectrais, fontes naturais, descoberta, papel biológico, integração com Wikipédia (resumo + thumbnail).
- **Comparador** de elementos lado a lado (compare drawer + modal de cross-reference).
- **Elemento do dia** rotativo, deep-linkável.
- **Internacionalização** pt-BR ⇄ en-US com persistência local.
- **Áudio sutil** (geiger, click-tech, hover-blip) com toggle no rodapé.
- **Easter egg** no rodapé (modo *toxic*: 3 cliques no glyph).

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript 6](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com) (PostCSS plugin)
- [Framer Motion](https://www.framer.com/motion/) — animações
- [TanStack Query](https://tanstack.com/query) — cache da Wikipédia REST
- [lucide-react](https://lucide.dev) — ícones
- Fontes: Inter, Cinzel (serif), JetBrains Mono — via `next/font`

## Estrutura

```
src/
├── app/                    # App Router (layout, page, globals.css)
├── components/             # UI
│   ├── PeriodicTable.tsx   # orquestrador principal
│   ├── ElementCell.tsx
│   ├── ElementModal.tsx
│   ├── ScannerPanel.tsx
│   ├── CosmicTimeline.tsx
│   ├── CommandPalette.tsx
│   ├── CompareDrawer.tsx / CompareModal.tsx
│   ├── StardustMode.tsx
│   └── hub/                # painéis HUD reutilizáveis
├── data/
│   ├── types.ts            # ChemicalElement, CosmicOrigin, BiologicalRole, ...
│   ├── elementsData.ts     # agrega tudo + índices por Z/categoria/origem/biologia
│   └── elements/           # divididos por período + lantanídeos/actinídeos
├── hooks/                  # filter, sync de URL, pinned, mac detect, sound
├── lib/                    # i18n, api (Wikipedia), audio, utils
└── utils/                  # abundance, bioMeta, cosmicMeta, elementOfDay, search, constants
```

Os dados de elementos vivem em `src/data/elements/*.ts` (períodos 1–7 + lantanídeos + actinídeos) e são unidos e indexados em `src/data/elementsData.ts`.

## Atalhos

| Atalho | Ação |
|---|---|
| `⌘K` / `Ctrl+K` | Abre/fecha o command palette |
| `←` / `→` | Navega entre elementos (no modal) |
| `Esc` | Fecha modais |

## Fontes de dados

- NASA / JPL
- Wikipedia REST API (`api/rest_v1/page/summary/...`)
- PubChem PUG-REST
- IUPAC

## Licença

Projeto pessoal de João Vitor. Sem licença pública definida.
