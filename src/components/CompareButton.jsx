export default function CompareButton({ product, isActive, onToggle }) {
    return (
        <button
            className={`btn btn-sm ${isActive ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => onToggle(product)}
        >
            {isActive ? '🚫 Rimuovi dal confronto' : '🔍 Aggiungi al confronto'}
        </button>
    );
}
