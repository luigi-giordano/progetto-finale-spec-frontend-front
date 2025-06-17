import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';

export default function Home() {
    const { products, loading, error } = useProducts();

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('title-asc');

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (search.trim()) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(search.toLowerCase())
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
    }, [products, search, category, sort]);

    if (loading) return <div className="text-center mt-5">Caricamento in corso...</div>;
    if (error) return <div className="alert alert-danger mt-4">Errore: {error.message}</div>;

    return (
        <main className="container mt-5">
            <h1 className="text-center mb-4">Catalogo Prodotti</h1>

            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Cerca per titolo..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
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
                    >
                        <option value="title-asc">Titolo A-Z</option>
                        <option value="title-desc">Titolo Z-A</option>
                        <option value="category-asc">Categoria A-Z</option>
                        <option value="category-desc">Categoria Z-A</option>
                    </select>
                </div>
            </div>

            <div className="row">
                {filteredProducts.map(product => (
                    <div className="col-md-4 mb-4" key={product.title}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </main>
    );
}
