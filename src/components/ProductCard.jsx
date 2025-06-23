import { Link } from 'react-router-dom';

// Funzione di utilità per rendere maiuscola la prima lettera di una stringa
function capitalizeFirstLetter(str) {
    if (!str) return ''; // Se la stringa è vuota o undefined, ritorna stringa vuota
    return str.charAt(0).toUpperCase() + str.slice(1); // Prima lettera maiuscola + resto della stringa
}

// Componente principale che rappresenta la card del prodotto
export default function ProductCard({
    product,           // Oggetto prodotto da visualizzare
    isFavorite,        // Il prodotto è nei preferiti?
    isCompared,        // Il prodotto è nella lista confronto?
    onToggleFavorite,  // Funzione da chiamare al click sul cuore
    onToggleCompare,   // Funzione da chiamare al click sulla lente/confronto
}) {
    // Genera il percorso dell'immagine in base al titolo, sostituendo gli spazi vuoiti con trattini
    const imgUrl = `/img/${product.title}.jpg`.replaceAll(' ', '-');

    return (
        <div className="product-card">
            <img
                className="product-image"
                src={imgUrl}
                alt={product.title}
            />
            <div className="product-title">{product.title}</div>
            <div className="product-category">
                • {capitalizeFirstLetter(product.category)}
            </div>
            <Link
                to={`/detail/${product.id}`} // Naviga alla pagina dettaglio
                className="btn btn-primary w-100 mt-3"
            >
                Dettagli
            </Link>
            <div className="d-flex justify-content-between mt-3 w-100">
                <button
                    className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'
                        }`} // Cambia stile in base allo stato (preferito o no)
                    onClick={() => onToggleFavorite(product)} // Chiamata alla funzione passata come prop
                >
                    {isFavorite ? '❤️' : '🤍'} {/* Emoji cambia a seconda dello stato */}
                </button>
                <button
                    className={`btn btn-sm ${isCompared ? 'btn-warning' : 'btn-outline-warning'
                        }`} // Cambia stile in base allo stato (comparato o no)
                    onClick={() => onToggleCompare(product)} // Chiamata alla funzione passata come prop
                >
                    {isCompared ? '🚫' : '🔍'} {/* Emoji cambia: lente per aggiungere, stop per rimuovere */}
                </button>
            </div>
        </div>
    );
}
