import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';

export default function Home() {
    const { products, loading, error } = useProducts();

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>Errore: {error.message}</p>;

    if (products.length === 0) {
        return <p>Nessun prodotto disponibile.</p>;
    }

    return (
        <main className="home">
            <h1>Catalogo Prodotti</h1>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.title} product={product} />
                ))}
            </div>
        </main>
    );
}
