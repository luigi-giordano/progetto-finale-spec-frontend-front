import { useState, useEffect } from 'react';

const { VITE_API_URL } = import.meta.env;

export default function useProductId(id) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`${VITE_API_URL}/products/${id}`);
                if (!res.ok) throw new Error('Prodotto non trovato');
                const data = await res.json();
                setProduct(data.product); // data.product = oggetto del prodotto
            } catch (err) {
                setError(err.message || 'Errore generico');
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    return { product, loading, error };
}
