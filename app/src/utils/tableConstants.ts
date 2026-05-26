import { ElementCategory } from '@/src/data/elementsData';

export interface CategoryMeta {
  id: ElementCategory;
  label: string;
  /** Tailwind classes used on the cell (text + hover border + glow). */
  cellClass: string;
  /** Tailwind text class on its own (e.g. for legend dots and active filter). */
  textClass: string;
  /** Raw hex used by SVG dots and inline glows. */
  hex: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'nonmetal',
    label: 'Não Metais',
    textClass: 'text-emerald-300',
    cellClass:
      'text-emerald-300 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]',
    hex: '#6ee7b7',
  },
  {
    id: 'noble-gas',
    label: 'Gases Nobres',
    textClass: 'text-cyan-300',
    cellClass:
      'text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]',
    hex: '#67e8f9',
  },
  {
    id: 'alkali-metal',
    label: 'Metais Alcalinos',
    textClass: 'text-amber-500',
    cellClass:
      'text-amber-500 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]',
    hex: '#f59e0b',
  },
  {
    id: 'alkaline-earth-metal',
    label: 'Alcalino-Terrosos',
    textClass: 'text-yellow-400',
    cellClass:
      'text-yellow-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]',
    hex: '#facc15',
  },
  {
    id: 'metalloid',
    label: 'Metaloides',
    textClass: 'text-teal-400',
    cellClass:
      'text-teal-400 hover:border-teal-400 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)]',
    hex: '#2dd4bf',
  },
  {
    id: 'halogen',
    label: 'Halogênios',
    textClass: 'text-fuchsia-400',
    cellClass:
      'text-fuchsia-400 hover:border-fuchsia-400 hover:shadow-[0_0_15px_rgba(232,121,249,0.3)]',
    hex: '#e879f9',
  },
  {
    id: 'post-transition-metal',
    label: 'Pós-Transição',
    textClass: 'text-blue-400',
    cellClass:
      'text-blue-400 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)]',
    hex: '#60a5fa',
  },
  {
    id: 'transition-metal',
    label: 'Metais de Transição',
    textClass: 'text-slate-300',
    cellClass:
      'text-slate-300 hover:border-slate-300 hover:shadow-[0_0_15px_rgba(203,213,225,0.3)]',
    hex: '#cbd5e1',
  },
  {
    id: 'lanthanide',
    label: 'Lantanídeos',
    textClass: 'text-indigo-300',
    cellClass:
      'text-indigo-300 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(165,180,252,0.3)]',
    hex: '#a5b4fc',
  },
  {
    id: 'actinide',
    label: 'Actinídeos',
    textClass: 'text-toxic',
    cellClass:
      'text-toxic hazard-bg font-bold shadow-[0_0_10px_rgba(57,255,20,0.1)] hover:shadow-[0_0_20px_rgba(57,255,20,0.6)]',
    hex: '#39ff14',
  },
];

export const categoryMap: Record<ElementCategory, CategoryMeta> =
  CATEGORIES.reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {} as Record<ElementCategory, CategoryMeta>);

/** @deprecated use categoryMap[id].cellClass */
export const categoryStyles: Record<ElementCategory, string> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.id] = c.cellClass;
    return acc;
  },
  {} as Record<ElementCategory, string>,
);

/** @deprecated use CATEGORIES */
export const filterCategories = CATEGORIES.map(({ id, label }) => ({ id, label }));
