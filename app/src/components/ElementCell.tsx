import { motion } from 'framer-motion';
import { ChemicalElement, ElementCategory } from '@/src/data/elementsData';
import { categoryMap } from '@/src/utils/tableConstants';

interface ElementCellProps {
  element: ChemicalElement;
  activeFilter: ElementCategory | null;
  onClick: (el: ChemicalElement) => void;
}

export function ElementCell({ element, activeFilter, onClick }: ElementCellProps) {
  const gridRow = element.row >= 8 ? element.row + 1 : element.row;
  const isScannedOut = activeFilter !== null && activeFilter !== element.category;
  const meta = categoryMap[element.category];

  return (
    <motion.button
      type="button"
      onClick={() => onClick(element)}
      aria-label={`${element.name} (${element.symbol}), número atômico ${element.number}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: isScannedOut ? 1 : 1.1, zIndex: isScannedOut ? 1 : 50 }}
      style={{ gridColumn: element.column, gridRow: gridRow }}
      className={`
        @container relative w-full h-full flex flex-col items-center justify-center
        glass-cell transition-all duration-500 cursor-crosshair group
        focus:outline-none focus-visible:ring-2 focus-visible:ring-toxic focus-visible:ring-offset-1 focus-visible:ring-offset-black
        ${isScannedOut ? 'opacity-10 grayscale brightness-50 pointer-events-none' : meta.cellClass}
      `}
    >
      <span className="absolute top-[5%] left-[8%] text-[15cqw] font-mono opacity-60 group-hover:opacity-100 transition-opacity">
        {element.number}
      </span>
      <strong className="text-[40cqw] font-bold leading-none tracking-tighter mt-[10%] drop-shadow-md">
        {element.symbol}
      </strong>
      <span className="text-[12cqw] uppercase font-medium tracking-widest opacity-70 group-hover:opacity-100 truncate w-[90%] text-center mt-[2%]">
        {element.name}
      </span>
    </motion.button>
  );
}
