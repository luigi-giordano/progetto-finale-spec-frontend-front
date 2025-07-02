import { useState, useEffect } from 'react';

const { VITE_API_URL } = import.meta.env;

// Custom hook per recuperare prodotti da un'API, filtrati per ricerca e categoria
export default function useProducts(search = '', category = '') {
    // Stato per salvare i prodotti che arrivano dall'API
    const [products, setProducts] = useState([]);
    // Stato per sapere se sto caricando i dati (loading = true quando sta caricando)
    const [loading, setLoading] = useState(true);
    // Stato per eventuali errori nella fetch
    const [error, setError] = useState(null);

    // useEffect si attiva ogni volta che cambia 'search' o 'category'
    useEffect(() => {
        // Funzione asincrona che si occupa di fare la chiamata all'API
        async function fetchProducts() {
            setLoading(true);
            setError(null);

            try {
                // Creo un oggetto per i parametri query da aggiungere dinamicamente all'URL
                const params = new URLSearchParams();
                // Se c'è una stringa di ricerca, la aggiungo
                if (search) params.append('search', search);
                // Se c'è una categoria, la aggiungo
                if (category) params.append('category', category);

                // Faccio la fetch all'endpoint con i parametri nella query string formattata
                // `${VITE_API_URL}/products` è l'endpoint base
                // `params.toString()` converte l'oggetto URLSearchParams in una stringa
                const res = await fetch(`${VITE_API_URL}/products?${params.toString()}`);

                // Controllo se la risposta è ok, altrimenti lancio un errore
                if (!res.ok) throw new Error('Errore nel recupero dei prodotti');

                // Estraggo i dati JSON dalla risposta
                const data = await res.json();

                // Per ogni prodotto recuperato, faccio una seconda fetch in parallelo per ottenere dettagli extra (prezzo e valutazione)
                const enrichedData = await Promise.all(
                    // Uso map per trasformare l'array di prodotti in un array di Promesse e attendo che tutte siano risolte
                    data.map(async (product) => {
                        const res = await fetch(`${VITE_API_URL}/products/${product.id}`);

                        // Controllo la risposta della fetch dettagli, lancio errore se non ok
                        if (!res.ok) throw new Error('Errore nel recupero del prodotto');

                        // Se la risposta è valida estraggo i dettagli
                        const dataDetails = await res.json();

                        // Unisco i dati base del prodotto con i dettagli aggiuntivi (price e rating)
                        return {
                            ...product,
                            price: dataDetails.product.price,
                            rating: dataDetails.product.rating
                        };
                    })
                );
                // Aggiorno lo stato con i prodotti arricchiti di dettagli
                setProducts(enrichedData);
            } catch (err) {
                // Se qualcosa va storto salvo il messaggio di errore
                setError(err.message || 'Errore generico');
            } finally {
                // Alla fine del processo, sia in caso di successo o errore, setto loading a false
                setLoading(false);
            }
        }
        fetchProducts();
    }, [search, category]);  // Rilancio il fetch ogni volta che cambiano 'search' o 'category'

    return {
        products,
        loading,
        error
    };
}