import { useGlobalContext } from "../context/GlobalContext"; // Importa il contesto globale per accedere allo stato condiviso
import { Link } from "react-router-dom"; // Importa Link per la navigazione senza ricaricare la pagina

function Compare() {
    // Estraggo dal contesto globale la lista dei prodotti da confrontare, e le funzioni per rimuovere un singolo prodotto e per svuotare tutta la lista
    const { compareList, removeFromCompare, clearCompare } = useGlobalContext();

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

    // Se ci sono prodotti da confrontare, renderizzo la lista
    return (
        <div className="container my-5">
            {/* Header con titolo e bottone per svuotare la lista confronto */}
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
                                {/* Immagine del prodotto con padding e stile per mantenere proporzioni e dimensioni */}
                                <img
                                    src={imgUrl}
                                    className="card-img-top p-3"
                                    alt={product.title}
                                    style={{ height: "200px", objectFit: "contain" }}
                                />
                                {/* Corpo della card con titolo, dettagli e bottoni */}
                                <div className="card-body d-flex flex-column">
                                    {/* Titolo del prodotto */}
                                    <h5 className="card-title">{product.title}</h5>
                                    {/* Categoria del prodotto */}
                                    <p className="card-text"><strong>Categoria:</strong> {product.category}</p>
                                    {/* Prezzo del prodotto */}
                                    <p className="card-text"><strong>Prezzo:</strong> €{product.price}</p>
                                    {/* Rating del prodotto o N/A se non disponibile */}
                                    <p className="card-text"><strong>Rating:</strong> {product.rating ? product.rating : 'N/A'}</p>

                                    {/* Container flessibile che posiziona i bottoni in basso, distanziati verticalmente */}
                                    <div className="mt-auto d-flex flex-column gap-2">
                                        {/* Link per andare alla pagina dettaglio prodotto, passa lo stato "from: compare" */}
                                        <Link
                                            to={`/detail/${product.id}`}
                                            state={{ from: "compare" }}
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

export default Compare;
