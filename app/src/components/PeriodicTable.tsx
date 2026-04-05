'use client';

import { useState, useEffect, useRef } from 'react'; // Importamos o useRef
import { Radar, Sparkles, ShieldAlert } from 'lucide-react'; 
import { elements, ChemicalElement, ElementCategory } from '@/src/data/elementsData';

import { ElementCell } from './ElementCell';
import { ElementModal } from './ElementModal';
import { ScannerPanel } from './ScannerPanel';



export default function PeriodicTable() {
  const [selected, setSelected] = useState<ChemicalElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<ElementCategory | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [isCosmic, setIsCosmic] = useState(false);

  // useRef guarda variáveis "silenciosas" que não causam re-renderizações na tela
  const clickCountRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // A lógica do Easter Egg movida para um Event Handler limpo
  const handleCosmicClick = () => {
    clickCountRef.current += 1;

    // Limpa o timer anterior se o usuário clicou rapidamente de novo
    if (timerRef.current) clearTimeout(timerRef.current);

    if (clickCountRef.current >= 3) {
      setIsCosmic(prev => !prev);
      clickCountRef.current = 0; // Zera os cliques após ativar
    } else {
      // Se não chegou a 3, define um timer de 1s para zerar a contagem
      timerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1000);
    }
  };

  // Mantemos apenas o useEffect que sincroniza o CSS global com o React
  useEffect(() => {
    document.body.classList.toggle('theme-cosmic', isCosmic);
  }, [isCosmic]);

  const toggleFilter = (categoryId: ElementCategory) => setActiveFilter(prev => prev === categoryId ? null : categoryId);
  const closeFilters = () => { setShowFilters(false); setActiveFilter(null); };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-2 sm:p-4 lg:p-8 relative">
      
      {/* HEADER */}
      <div className="w-full max-w-[95vw] lg:max-w-[85vw] flex justify-between items-center mb-4 sm:mb-6 z-30">
        <button 
          onClick={handleCosmicClick} // Chamando a nossa nova função otimizada
          className="flex items-center gap-2 text-xl sm:text-2xl font-mono text-toxic tracking-[0.2em] uppercase transition-all duration-700 select-none cursor-pointer"
        >
          {isCosmic ? <><Sparkles className="w-6 h-6 animate-pulse text-fuchsia-400" /> Forja_Estelar</> : <><ShieldAlert className="w-6 h-6" /> Tabela_Periódica</>}
        </button>
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase border transition-all duration-300 ${showFilters || activeFilter ? 'border-toxic text-toxic shadow-[0_0_10px_currentColor] bg-toxic/10' : 'border-white/20 text-white/50 hover:border-white/50 hover:text-white bg-black/40'}`}
        >
          <Radar className={`w-4 h-4 ${activeFilter ? 'animate-spin-slow' : ''}`} />
          {activeFilter ? 'Scanner Em Uso' : 'Modo Scanner'}
        </button>
      </div>

      <ScannerPanel 
        showFilters={showFilters}
        activeFilter={activeFilter}
        isCosmic={isCosmic}
        onToggleFilter={toggleFilter}
        onClose={closeFilters}
      />

      {/* GRID DA TABELA */}
      <div className="relative shrink-0 transition-opacity duration-500 z-10" style={{ width: 'min(100%, calc((100vh - 7rem) * 1.8))', aspectRatio: '18 / 10' }}>
        <div className="absolute inset-0 grid gap-0.5 sm:gap-1" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))', gridTemplateRows: 'repeat(10, minmax(0, 1fr))' }}>
          {elements.map((el) => (
            <ElementCell 
              key={el.number} 
              element={el} 
              activeFilter={activeFilter} 
              onClick={setSelected} 
            />
          ))}
        </div>
      </div>

      {/* MODAL HUD */}
      <ElementModal 
        selected={selected} 
        onClose={() => setSelected(null)} 
      />

    </div>
  );
}
