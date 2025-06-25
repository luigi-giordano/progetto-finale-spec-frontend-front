import { useGlobalContext } from '../context/GlobalContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import FavoriteButton from '../components/FavoriteButton';
import CompareButton from '../components/CompareButton';
// Hook personalizzato per ottenere i dati del prodotto tramite ID
import useProductsId from '../hooks/useProductsId';
// Componente per mostrare la valutazione a stelle
import StarRating from '../components/StarRating';

// Funzione helper per rendere maiuscola la prima lettera di una stringa
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Detail() {
    // Prendo l'id del prodotto dalla URL tramite React Router
    const { id } = useParams();
    // Hook di navigazione per tornare indietro o cambiare pagina
    const navigate = useNavigate();

    // Uso hook custom per recuperare dati, loading ed errori del prodotto
    const { product, loading, error } = useProductsId(id);

    // Estraggo dal contesto globale gli array e funzioni per preferiti e confronto
    const {
        favorites,
        addFavorite,
        removeFavorite,
        compareList,
        addToCompare,
        removeFromCompare,
    } = useGlobalContext();

    // Memorizzo il prodotto per evitare ricalcoli a ogni render, ricomputando solo se cambia l'id del prodotto
    const memoProduct = useMemo(() => product, [product?.id]);

    // Memorizzo e verifico se il prodotto è presente nella lista preferiti (recomputo solo se cambia favorites o prodotto)
    const isFavorite = useMemo(() => {
        return favorites.some((fav) => fav.id === memoProduct?.id);
    }, [favorites, memoProduct]);

    // Memorizzo e verifico se il prodotto è presente nella lista confronto (recomputo solo se cambia compareList o prodotto)
    const isCompared = useMemo(() => {
        return compareList.some((item) => item.id === memoProduct?.id);
    }, [compareList, memoProduct]);

    // Funzione per alternare l'aggiunta/rimozione dai preferiti, memorizzata con useCallback per non ricrearla ad ogni render
    const toggleFavorite = useCallback(() => {
        if (!memoProduct) return; // controllo se il prodotto non esiste
        if (isFavorite) {
            removeFavorite(memoProduct);
        } else {
            addFavorite(memoProduct);
        }
    }, [isFavorite, removeFavorite, addFavorite, memoProduct]);

    // Funzione per alternare l'aggiunta/rimozione dalla lista confronto, memorizzata con useCallback per non ricrearla ad ogni render
    const toggleCompare = useCallback(() => {
        if (!memoProduct) return; // controllo se il prodotto non esiste
        if (isCompared) {
            removeFromCompare(memoProduct);
        } else {
            addToCompare(memoProduct);
        }
    }, [isCompared, removeFromCompare, addToCompare, memoProduct]);

    // Gestione dei casi di caricamento, errore o prodotto non trovato
    if (loading) return (<p className="text-center mt-5">Caricamento...</p>);
    if (error) return (<p className="text-danger text-center mt-5">Errore: {error}</p>);
    if (!product) return (<p className="text-center mt-5">Nessun prodotto trovato.</p>);

    // Rendering della pagina dettagliata prodotto
    return (
        <div className="container mt-5 product-detail-page">
            {/* Card con informazioni prodotto, layout flessibile in riga */}
            <div className="card shadow-sm p-4 mb-4 d-flex flex-row align-items-start">
                {/* Sezione sinistra con dettagli testo */}
                <div style={{ flex: 1, paddingRight: '20px' }}>
                    {/* Titolo del prodotto */}
                    <h2 className="mb-4">{product.title}</h2>
                    {/* Categoria prodotto */}
                    <p><strong>Categoria:</strong> {capitalizeFirstLetter(product.category)}</p>
                    {/* Prezzo, mostrato solo se presente */}
                    {product.price && <p><strong>Prezzo:</strong> €{product.price}</p>}
                    {/* Marca prodotto, se disponibile */}
                    {product.brand && <p><strong>Marca:</strong> {capitalizeFirstLetter(product.brand)}</p>}
                    {/* Descrizione prodotto, se presente */}
                    {product.description && (
                        <p><strong>Descrizione:</strong> {product.description}</p>
                    )}

                    {/* Lista delle caratteristiche, se presenti */}
                    {product.features && product.features.length > 0 && (
                        <>
                            <h5>Caratteristiche:</h5>
                            <ul>
                                {product.features.map((feat) => (
                                    <li key={feat}>{capitalizeFirstLetter(feat)}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {/* Anno di rilascio, se specificato */}
                    {product.releaseYear && <p><strong>Anno di rilascio:</strong> {product.releaseYear}</p>}

                    {/* Valutazione prodotto con componente StarRating, se disponibile */}
                    {product.rating && (
                        <div className="mt-3">
                            <strong>Valutazione:</strong>
                            <StarRating rating={product.rating} />
                        </div>
                    )}

                    {/* Pulsanti per aggiungere/rimuovere dai preferiti e dalla lista confronto */}
                    <div className="mt-4 d-flex gap-3">
                        <FavoriteButton
                            product={product}
                            isActive={isFavorite}
                            onToggle={toggleFavorite}
                        />
                        <CompareButton
                            product={product}
                            isActive={isCompared}
                            onToggle={toggleCompare}
                        />
                    </div>
                </div>

                {/* Sezione destra con immagine prodotto */}
                <div style={{ flex: 1, maxWidth: '400px' }}>
                    {product.image && (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="img-fluid"
                            style={{ maxWidth: '100%', borderRadius: '8px' }}
                        />
                    )}
                </div>
            </div>

            {/* Pulsante per tornare indietro alla pagina precedente */}
            <div className="text-center my-4">
                <button className="btn btn-outline-primary back-button" onClick={() => navigate(-1)}>
                    ⬅ Torna indietro
                </button>
            </div>
        </div>
    );
}
