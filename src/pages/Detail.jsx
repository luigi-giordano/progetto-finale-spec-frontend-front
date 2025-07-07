import { useGlobalContext } from '../context/GlobalContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import FavoriteButton from '../components/FavoriteButton';
import CompareButton from '../components/CompareButton';
import useProductsId from '../hooks/useProductsId';
import StarRating from '../components/StarRating';

// Funzione helper per rendere maiuscola la prima lettera di una stringa
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Detail() {
    const { id } = useParams(); // Ottiene l'ID del prodotto dalla URL 
    const navigate = useNavigate();
    const { product, loading, error } = useProductsId(id); // Hook personalizzato per ottenere i dettagli del prodotto

    const {
        favorites,
        compareList,
        toggleFavorite,
        toggleCompare
    } = useGlobalContext();

    const memoProduct = useMemo(() => product, [product?.id]); // UseMemo per ottimizzare il rendering del prodotto e verifico che non sia undefined

    const isFavorite = useMemo(() => { // Verifica se il prodotto è nei preferiti
        return favorites.some((fav) => fav.id === memoProduct?.id);
    }, [favorites, memoProduct]);

    const isCompared = useMemo(() => { // Verifica se il prodotto è nel confronto 
        return compareList.some((item) => item.id === memoProduct?.id);
    }, [compareList, memoProduct]);

    if (loading) return (<p className="text-center mt-5">Caricamento...</p>);
    if (error) return (<p className="text-danger text-center mt-5">Errore: {error}</p>);
    if (!product) return (<p className="text-center mt-5">Nessun prodotto trovato.</p>);

    return (
        <div className="container mt-5 product-detail-page"
            style={{ paddingTop: '100px' }}
        >
            <div className="card shadow-sm p-4 mb-4 d-flex flex-row align-items-start">
                {/* Contenitore flessibile per il layout */}
                <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h2 className="mb-4">{product.title}</h2>
                    <p><strong>Categoria:</strong> {capitalizeFirstLetter(product.category)}</p>
                    {product.price && <p><strong>Prezzo:</strong> €{product.price}</p>}
                    {product.description && (
                        <p><strong>Descrizione:</strong> {product.description}</p>
                    )}
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
                    {product.releaseYear && <p><strong>Anno di rilascio:</strong> {product.releaseYear}</p>}
                    {product.rating && (
                        <div className="mt-3">
                            <strong>Valutazione:</strong>
                            <StarRating rating={product.rating} />
                        </div>
                    )}

                    {/* Pulsanti aggiornati che usano direttamente le funzioni del contesto */}
                    <div className="mt-4 d-flex gap-3">
                        <FavoriteButton
                            product={product}
                            isActive={isFavorite}
                            onToggle={() => toggleFavorite(product)}
                        />
                        <CompareButton
                            product={product}
                            isActive={isCompared}
                            onToggle={() => toggleCompare(product)}
                        />
                    </div>
                </div>

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

            <div className="text-center my-4">
                <button className="btn btn-outline-primary back-button" onClick={() => navigate(-1)}>
                    ⬅ Torna indietro
                </button>
            </div>
        </div>
    );
}
