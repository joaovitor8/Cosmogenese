import { ElementCategory } from '@/src/data/elementsData';

export const categoryStyles: Record<ElementCategory, string> = {
  "nonmetal": "text-emerald-300 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]",
  "noble-gas": "text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]",
  "alkali-metal": "text-amber-500 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]",
  "alkaline-earth-metal": "text-yellow-400 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]",
  "metalloid": "text-teal-400 hover:border-teal-400 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)]",
  "halogen": "text-fuchsia-400 hover:border-fuchsia-400 hover:shadow-[0_0_15px_rgba(232,121,249,0.3)]",
  "post-transition-metal": "text-blue-400 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)]",
  "transition-metal": "text-slate-300 hover:border-slate-300 hover:shadow-[0_0_15px_rgba(203,213,225,0.3)]",
  "lanthanide": "text-indigo-300 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(165,180,252,0.3)]",
  "actinide": "text-toxic hazard-bg font-bold shadow-[0_0_10px_rgba(57,255,20,0.1)] hover:shadow-[0_0_20px_rgba(57,255,20,0.6)]",
};

export const filterCategories: { id: ElementCategory; label: string }[] = [
  { id: "nonmetal", label: "Não Metais" },
  { id: "noble-gas", label: "Gases Nobres" },
  { id: "alkali-metal", label: "Metais Alcalinos" },
  { id: "alkaline-earth-metal", label: "Alcalino-Terrosos" },
  { id: "metalloid", label: "Metaloides" },
  { id: "halogen", label: "Halogênios" },
  { id: "post-transition-metal", label: "Pós-Transição" },
  { id: "transition-metal", label: "Metais de Transição" },
  { id: "lanthanide", label: "Lantanídeos" },
  { id: "actinide", label: "Actinídeos" }
];
