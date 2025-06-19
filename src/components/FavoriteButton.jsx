export default function FavoriteButton({ product, isFavorite, onToggle }) {
    return (
        <button
            className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-primary'} mt-3`}
            onClick={() => onToggle(product)}
        >
            {isFavorite ? '★ Rimuovi dai Preferiti' : '☆ Aggiungi ai Preferiti'}
        </button>
    );
}
