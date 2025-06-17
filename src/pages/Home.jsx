import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';
import useDebounce from '../hooks/useDebounce';

export default function Home() {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('title-asc');

    const { products, loading, error } = useProducts(debouncedSearch, category);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (debouncedSearch.trim()) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }

        if (category) {
            result = result.filter(p => p.category === category);
        }

        if (sort === 'title-asc') result.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === 'title-desc') result.sort((a, b) => b.title.localeCompare(a.title));
        if (sort === 'category-asc') result.sort((a, b) => a.category.localeCompare(b.category));
        if (sort === 'category-desc') result.sort((a, b) => b.category.localeCompare(a.category));

        return result;
    }, [products, debouncedSearch, category, sort]);

    function resetSearch() {
        setSearch('');
    }

    if (loading) return <div className="text-center mt-5">Caricamento in corso...</div>;
    if (error) return <div className="alert alert-danger mt-4">Errore: {error}</div>;

    return (
        <main className="container mt-5">
            <h1 className="text-center mb-4">Catalogo Prodotti</h1>

            <div className="row g-3 mb-3">
                <div className="col-md-4 position-relative">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Cerca per titolo..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        aria-label="Cerca per titolo"
                        style={{ paddingRight: search ? '2.5rem' : undefined }}
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={resetSearch}
                            aria-label="Resetta ricerca"
                            className="btn-clear-search"
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        aria-label="Filtra per categoria"
                    >
                        <option value="">Tutte le categorie</option>
                        <option value="cuffie">Cuffie</option>
                        <option value="fotocamere">Fotocamere</option>
                        <option value="microfoni">Microfoni</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        aria-label="Ordina prodotti"
                    >
                        <option value="title-asc">Titolo A-Z</option>
                        <option value="title-desc">Titolo Z-A</option>
                        <option value="category-asc">Categoria A-Z</option>
                        <option value="category-desc">Categoria Z-A</option>
                    </select>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-center">Nessun prodotto trovato.</p>
            ) : (
                <div className="row">
                    {filteredProducts.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
