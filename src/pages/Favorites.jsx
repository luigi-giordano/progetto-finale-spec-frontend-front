import { useGlobalContext } from '../context/GlobalContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Favorites() {
    const {
        favorites,
        toggleFavorite,
        compareList,
        addToCompare,
        removeFromCompare,
        clearFavorites,
    } = useGlobalContext();

    // Se la lista preferiti è vuota, mostra messaggio + bottone per tornare alla Home
    if (favorites.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Nessun prodotto nei preferiti</h2>
                <p>Aggiungi prodotti ai preferiti per vederli qui.</p>
                <Link to="/" className="btn btn-primary mt-3">
                    Torna alla Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Preferiti</h1>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        if (window.confirm('Vuoi svuotare tutti i prodotti preferiti?')) {
                            clearFavorites();
                        }
                    }}
                >
                    Svuota preferiti
                </button>
            </div>

            <div className="row">
                {favorites.map(product => {
                    const isCompared = compareList.some(p => p.id === product.id);

                    return (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <ProductCard
                                product={product}
                                isFavorite={true}
                                isCompared={isCompared}
                                onToggleFavorite={toggleFavorite}
                                onToggleCompare={p => {
                                    if (isCompared) removeFromCompare(p);
                                    else addToCompare(p);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
