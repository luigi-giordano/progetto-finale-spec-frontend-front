export default function FavoriteButton({ product, isActive, onToggle }) {
    return (
        <button
            className={`btn btn-sm ${isActive ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => onToggle(product)}
        >
            {isActive ? '★ Rimuovi dai Preferiti' : '☆ Aggiungi ai Preferiti'}
        </button>
    );
}
