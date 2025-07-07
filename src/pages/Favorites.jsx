import { useGlobalContext } from '../context/GlobalContext'; // Importa il context globale per accedere a favorites, toggleFavorite e clearFavorites
import { Link } from 'react-router-dom'; // Importa Link per la navigazione client-side senza ricaricare la pagina

export default function Favorites() {
    // Estrae dal contesto globale le variabili e funzioni per la gestione dei preferiti
    const {
        favorites,
        toggleFavorite,
        clearFavorites
    } = useGlobalContext();

    // Se la lista dei preferiti è vuota, mostra un messaggio e un link per tornare alla home
    if (favorites.length === 0) {
        return (
            <div className="container text-center"
                style={{ marginTop: "100px" }}
            >
                <h2>Nessun prodotto nei preferiti!</h2>
                <p>Aggiungi prodotti ai preferiti per vederli qui.</p>
                {/* Link alla home page */}
                <Link to="/" className="btn btn-primary mt-3">
                    Torna alla Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container"
            style={{ marginTop: "100px" }}
        >
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Lista Dei Preferiti</h2>
                {/* Pulsante rosso per svuotare tutti i preferiti */}
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        // Mostra un prompt di conferma prima di svuotare
                        if (window.confirm('Vuoi svuotare tutti i prodotti preferiti?')) {
                            clearFavorites(); // Se confermato, svuota i preferiti
                        }
                    }}
                >
                    Svuota preferiti
                </button>
            </div>
            {/* Griglia dei prodotti preferiti */}
            <div className="row">
                {favorites.map((product) => {
                    // Creo dinamicamente l'URL dell'immagine
                    const imgUrl = `/img/img-${product.id}.jpg`;

                    return (
                        // Wrapper di ogni prodotto con chiave unica (id)
                        <div key={product.id} className="col-md-6 col-lg-3 mb-4">
                            <div className="card h-100">

                                {/* Immagine del prodotto con stile per adattare l'immagine */}
                                <img
                                    src={imgUrl}
                                    className="card-img-top p-3"
                                    alt={product.title}
                                    style={{ height: '200px', objectFit: 'contain' }} // Mantiene proporzioni immagine
                                />

                                {/* Corpo della card con informazioni e azioni */}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text"><strong>Categoria:</strong> {product.category}</p>
                                    <p className="card-text"><strong>Prezzo:</strong> €{product.price}</p>

                                    {/* Mostra il rating se presente, altrimenti 'N/A' */}
                                    <p className="card-text"><strong>Rating:</strong> {product.rating ? product.rating : 'N/A'}</p>

                                    {/* Area bottoni con allineamento in fondo alla card */}
                                    <div className="mt-auto d-flex flex-column gap-2">

                                        {/* Link ai dettagli del prodotto */}
                                        <Link
                                            to={`/detail/${product.id}`}
                                            className="btn btn-outline-primary"
                                        >
                                            Vedi dettagli
                                        </Link>

                                        {/* Bottone per rimuovere il prodotto dai preferiti */}
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
