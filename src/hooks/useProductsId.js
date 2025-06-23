import { useState, useEffect } from 'react';

const { VITE_API_URL } = import.meta.env;

// Definisco custom hook che prende in input l'id del prodotto
export default function useProductId(id) {
    // Stato per memorizzare l'oggetto prodotto recuperato dall'API, inizialmente null
    const [product, setProduct] = useState(null);
    // Stato per indicare se la chiamata è in corso (loading), inizialmente true perché si presume che si stia caricando
    const [loading, setLoading] = useState(true);
    // Stato per memorizzare eventuali errori nella fetch, inizialmente null perché non ci sono errori
    const [error, setError] = useState(null);

    // useEffect si attiva ogni volta che cambia l'id passato al hook
    useEffect(() => {
        // Definisco una funzione asincrona interna per effettuare la chiamata all'API
        async function fetchProductId() {
            // Se l'id non è valido esco subito senza fare nulla
            if (!id) return;

            // Inizio la fase di caricamento: imposto loading a true e resetto eventuali errori
            setLoading(true);
            setError(null);

            try {
                // Faccio la chiamata fetch all'endpoint dell'API per ottenere il prodotto tramite l'id
                const res = await fetch(`${VITE_API_URL}/products/${id}`);
                // Se la risposta non è ok lancio un errore personalizzato
                if (!res.ok) throw new Error('Prodotto non trovato');
                // Converto la risposta in JSON
                const data = await res.json();
                // Aggiorno lo stato product con l'oggetto ottenuto
                setProduct(data.product);
            } catch (err) {
                // Se qualcosa va storto, catturo l'errore e aggiorno lo stato error
                setError(err.message || 'Errore generico');
            } finally {
                // Alla fine della fetch, sia in caso di successo che di errore, imposto loading a false
                setLoading(false);
            }
        }

        // Richiamo la funzione asincrona per iniziare la fetch
        fetchProductId();

        // L'effetto dipende da id, quindi si riattiva ogni volta che id cambia
    }, [id]);
    return { product, loading, error };
}