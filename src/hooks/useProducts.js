// Importa gli hook useState e useEffect da React
import { useState, useEffect } from 'react';

// Recupera la variabile d'ambiente VITE_API_URL dal file .env
const { VITE_API_URL } = import.meta.env;

// Custom hook chiamato useProducts, che gestisce la logica per ottenere la lista prodotti
export default function useProducts(search = '', category = '') {
    // Stato locale per memorizzare l'array dei prodotti
    const [products, setProducts] = useState([]);

    // Stato per la gestione del caricamento e degli errori
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect per effettuare la richiesta ogni volta che search o category cambiano
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);        // Imposta lo stato di caricamento
            setError(null);          // Reset eventuale errore precedente

            try {
                // Costruisce la query string dinamicamente
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (category) params.append('category', category);

                // Effettua la richiesta GET all'endpoint /products con parametri
                const res = await fetch(`${VITE_API_URL}/products?${params.toString()}`);

                // Controlla se la risposta non è ok
                if (!res.ok) throw new Error('Errore nel recupero dei prodotti');

                // Parsing della risposta JSON
                const data = await res.json();

                // Salva i prodotti nello stato
                setProducts(data);
            } catch (err) {
                // Imposta il messaggio d'errore
                setError(err.message || 'Errore generico');
            } finally {
                // Disattiva lo stato di caricamento
                setLoading(false);
            }
        }

        // Chiama la funzione asincrona
        fetchProducts();

    }, [search, category]); // Dipendenze: ogni volta che search o category cambiano

    // Restituisce i dati utili al componente
    return {
        products,
        loading,
        error
    };
}
