import { Link } from 'react-router-dom';
// Importa il contesto globale per accedere a funzioni e stati condivisi
import { useGlobalContext } from '../context/GlobalContext';

// Componente principale che rappresenta la card di un prodotto
export default function ProductCard({ product }) {

    // Valori ottenuti dal context globale
    const {
        favorites,
        toggleFavorite,
        compareList,
        toggleCompare,
    } = useGlobalContext();

    const isFavorite = favorites.find(fav => fav.id === product.id); // Controlla se il prodotto è nei preferiti
    const isCompared = compareList.find(comp => comp.id === product.id); // Controlla se il prodotto è nella lista di confronto

    // Funzione di utilità per rendere maiuscola la prima lettera di una stringa
    function capitalizeFirstLetter(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1); // Altrimenti restituisce la stringa con la prima lettera maiuscola
    }

    // Genera il percorso dell'immagine in base al titolo, sostituendo gli spazi vuoti con trattini
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
                    className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`} // Cambia stile dinamicamente in base allo stato (preferito o no)
                    onClick={() => toggleFavorite(product)} // Aggiunta/rimozione dai preferiti
                >
                    {isFavorite ? '❤️' : '🤍'} {/* Emoji cambia a seconda dello stato */}
                </button>
                <button
                    className={`btn btn-sm ${isCompared ? 'btn-warning' : 'btn-outline-warning'}`} // Cambia stile dinamicamente in base allo stato (comparato o no)
                    onClick={() => toggleCompare(product)} // Aggiunta/rimozione dalla lista di confronto
                >
                    {isCompared ? '🚫' : '🔍'} {/* Emoji cambia a seconda dello stato */}
                </button>
            </div>
        </div>
    );
}
