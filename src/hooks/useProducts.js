import { useState, useEffect } from 'react';

const { VITE_API_URL } = import.meta.env;

export default function useProducts(search = '', category = '') {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

                console.log('✅ Tutti i prodotti:', data);

                setProducts(data); // data = array di prodotti
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
