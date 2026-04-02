

function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<ChemicalElement | null>(null);

  return (
    <div className="app-container">
      <header>
        <h1>Tabela Periódica</h1>
      </header>

      <main className="table-grid">
        {elements.map((el) => (
          <div 
            key={el.number}
            className={`element-cell ${el.category}`}
            style={{ gridColumn: el.column, gridRow: el.row }}
            onClick={() => setSelectedElement(el)}
          >
            <span className="atomic-number">{el.number}</span>
            <h2 className="symbol">{el.symbol}</h2>
            <span className="name">{el.name}</span>
          </div>
        ))}
      </main>

      {selectedElement && (
        <aside className="details-panel">
          <button onClick={() => setSelectedElement(null)}>Fechar</button>
          <h2>{selectedElement.name} ({selectedElement.symbol})</h2>
          <p><strong>Número Atômico:</strong> {selectedElement.number}</p>
          <p><strong>Categoria:</strong> {selectedElement.category}</p>
          <p className="summary">{selectedElement.summary}</p>
        </aside>
      )}
    </div>
  );
}
