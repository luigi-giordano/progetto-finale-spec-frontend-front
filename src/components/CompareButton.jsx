export default function CompareButton({ product, isCompared, onToggle }) {
    return (
        <button
            className={`btn btn-sm ${isCompared ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => onToggle(product)}
        >
            {isCompared ? '🚫 Rimuovi dal confronto' : '🔍 Aggiungi al confronto'}
        </button>
    );
}
