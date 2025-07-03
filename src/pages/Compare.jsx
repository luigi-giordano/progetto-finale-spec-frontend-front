// Importa il contesto globale per accedere allo stato condiviso
import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function Compare() {
    const {
        compareList,
        removeFromCompare,
        clearCompare
    } = useGlobalContext();

    // Caso in cui la lista dei prodotti da confrontare è vuota
    if (compareList.length === 0) {
        // Ritorno una sezione con messaggio informativo e link per tornare alla home
        return (
            <div className="container my-5 text-center">
                <h2>Nessun prodotto da confrontare!</h2>
                <p>Aggiungi prodotti dalla home cliccando su "Confronta".</p>
                {/* Link per tornare alla home */}
                <Link to="/" className="btn btn-primary mt-3">
                    Torna alla Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Lista Confronto Prodotti</h2>
                {/* Bottone rosso che, se cliccato, mostra una finestra di conferma prima di svuotare tutta la lista */}
                <button className="btn btn-danger" onClick={() => {
                    if (window.confirm('Vuoi svuotare tutti i prodotti comparati?')) {
                        clearCompare(); // Funzione per svuotare la lista confronto dal contesto globale
                    }
                }}>
                    Svuota confronto
                </button>
            </div>

            {/* Container per la griglia dei prodotti */}
            <div className="row">
                {/* Mappo la lista dei prodotti da confrontare per generare una card per ciascuno */}
                {compareList.map((product) => {
                    // Genero l'url dell'immagine a partire dal titolo del prodotto sostituendo gli spazi con trattini
                    const imgUrl = `/img/${product.title}.jpg`.replaceAll(' ', '-');

                    return (
                        // Card del prodotto con key univoca basata sull'id del prodotto
                        <div key={product.id} className="col-md-6 col-lg-3 mb-4">
                            <div className="card h-100">
                                <img
                                    src={imgUrl}
                                    className="card-img-top p-3"
                                    alt={product.title}
                                    style={{ height: "200px", objectFit: "contain" }}
                                />
                                {/* Corpo della card con titolo, dettagli e bottoni */}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text"><strong>Categoria:</strong> {product.category}</p>
                                    <p className="card-text"><strong>Prezzo:</strong> €{product.price}</p>
                                    <p className="card-text"><strong>Rating:</strong> {product.rating ? product.rating : 'N/A'}</p>

                                    {/* Container flessibile con i bottoni in basso, distanziati verticalmente */}
                                    <div className="mt-auto d-flex flex-column gap-2">
                                        {/* Link per andare alla pagina dettaglio prodotto */}
                                        <Link
                                            to={`/detail/${product.id}`}
                                            className="btn btn-outline-primary"
                                        >
                                            Vedi dettagli
                                        </Link>
                                        {/* Bottone per rimuovere il prodotto dalla lista confronto */}
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => removeFromCompare(product)}
                                        >
                                            Rimuovi dal confronto
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