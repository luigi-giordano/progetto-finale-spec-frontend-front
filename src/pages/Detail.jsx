import { useParams, useNavigate } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import CompareButton from '../components/CompareButton';
import { useGlobalContext } from '../context/GlobalContext';
import useProductsId from '../hooks/useProductsId';

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { product, loading, error } = useProductsId(id);

    const {
        favorites,
        addFavorite,
        removeFavorite,
        compareList,
        toggleCompare,
    } = useGlobalContext();

    if (loading) return <p className="text-center mt-5">Caricamento...</p>;
    if (error) return <p className="text-danger text-center mt-5">Errore: {error}</p>;
    if (!product) return <p className="text-center mt-5">Nessun prodotto trovato.</p>;

    const isFavorite = favorites.some((fav) => fav.id === product.id);
    const isCompared = compareList.some((p) => p.id === product.id);

    const toggleFavorite = () =>
        isFavorite ? removeFavorite(product) : addFavorite(product);

    const handleToggleCompare = () => toggleCompare(product);

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4 mb-4">
                <h2 className="mb-4">{product.title}</h2>
                <p><strong>Categoria:</strong> {product.category}</p>
                {product.price && <p><strong>Prezzo:</strong> €{product.price}</p>}
                {product.brand && <p><strong>Marca:</strong> {product.brand}</p>}
                {product.description && (
                    <p><strong>Descrizione:</strong> {product.description}</p>
                )}

                {product.image && (
                    <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid my-3"
                        style={{ maxWidth: '400px' }}
                    />
                )}

                {product.features && product.features.length > 0 && (
                    <>
                        <h5>Caratteristiche:</h5>
                        <ul>
                            {product.features.map((feat, idx) => (
                                <li key={idx}>{feat}</li>
                            ))}
                        </ul>
                    </>
                )}

                {product.releaseYear && <p><strong>Anno di rilascio:</strong> {product.releaseYear}</p>}
                {product.rating && <p><strong>Valutazione:</strong> {product.rating} / 5</p>}

                <div className="mt-4 d-flex gap-2">
                    <FavoriteButton
                        product={product}
                        isFavorite={isFavorite}
                        onToggle={toggleFavorite}
                    />
                    <CompareButton
                        product={product}
                        isCompared={isCompared}
                        onToggle={handleToggleCompare}
                    />
                </div>
            </div>

            <div className="text-center">
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    ⬅ Torna indietro
                </button>
            </div>
        </div>
    );
}
