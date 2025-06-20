import { useState, useEffect, useRef } from 'react';

const { VITE_API_URL } = import.meta.env;

export default function useProducts(search = '', category = '') {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchedOnce = useRef(false); // ✅ Blocca fetch multipli in StrictMode

    useEffect(() => {
        // ✅ Se abbiamo già fatto il fetch, non farlo di nuovo
        if (fetchedOnce.current) return;
        fetchedOnce.current = true;

        async function fetchProducts() {
            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (category) params.append('category', category);

                const res = await fetch(`${VITE_API_URL}/products?${params.toString()}`);
                if (!res.ok) throw new Error('Errore nel recupero dei prodotti');
                const data = await res.json();

                // Arricchisci con dettagli
                const enrichedData = await Promise.all(data.map(async (product) => {
                    const res = await fetch(`${VITE_API_URL}/products/${product.id}`);
                    if (!res.ok) throw new Error('Errore nel recupero del prodotto');
                    const details = await res.json();
                    return {
                        ...product,
                        price: details.product.price,
                        rating: details.product.rating
                    };
                }));

                setProducts(enrichedData);
            } catch (err) {
                setError(err.message || 'Errore generico');
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [search, category]);

    return { products, loading, error };
}
