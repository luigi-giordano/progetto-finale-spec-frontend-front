import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

export default function Favorites() {
    const {
        favorites,
        toggleFavorite,
        clearFavorites,
    } = useGlobalContext();

    if (favorites.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Nessun prodotto nei preferiti!</h2>
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
                <h2>Lista Dei Preferiti</h2>
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
                {favorites.map((product) => {
                    console.log(product);

                    const imgUrl = `/img/${product.title}.jpg`.replaceAll(' ', '-');

                    return (
                        <div key={product.id} className="col-md-6 col-lg-3 mb-4">
                            <div className="card h-100">
                                <img
                                    src={imgUrl}
                                    className="card-img-top p-3"
                                    alt={product.title}
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text"><strong>Categoria:</strong> {product.category}</p>
                                    <p className="card-text"><strong>Prezzo:</strong> €{product.price}</p>
                                    <p className="card-text"><strong>Rating:</strong> {product.rating ? product.rating : 'N/A'}</p>

                                    <div className="mt-auto d-flex flex-column gap-2">
                                        <Link
                                            to={`/detail/${product.id}`}
                                            className="btn btn-outline-primary"
                                        >
                                            Vedi dettagli
                                        </Link>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => toggleFavorite(product)}
                                        >
                                            Rimuovi dai preferiti
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
