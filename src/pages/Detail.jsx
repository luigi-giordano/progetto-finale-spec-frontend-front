import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import { useGlobalContext } from '../context/GlobalContext';

const { VITE_API_URL } = import.meta.env;

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const { favorites, addFavorite, removeFavorite } = useGlobalContext();

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true);
            setError('');

            try {
                const res = await fetch(`${VITE_API_URL}/products/${id}`);
                if (!res.ok) throw new Error('Prodotto non trovato');
                const data = await res.json();
                setProduct(data.product);
            } catch (err) {
                setError(err.message || 'Errore generico');
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) return <p className="text-center mt-5">Caricamento...</p>;
    if (error) return <p className="text-danger text-center mt-5">Errore: {error}</p>;
    if (!product) return <p className="text-center mt-5">Nessun prodotto trovato.</p>;

    const isFavorite = favorites.some((fav) => fav.id === product.id);

    const toggleFavorite = () =>
        isFavorite ? removeFavorite(product) : addFavorite(product);

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

                <div className="mt-4">
                    <FavoriteButton
                        product={product}
                        isFavorite={isFavorite}
                        onToggle={toggleFavorite}
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
