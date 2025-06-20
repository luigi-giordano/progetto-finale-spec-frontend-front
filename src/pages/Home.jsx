import { useState, useMemo, useEffect, useRef } from 'react';
import useProducts from '../hooks/useProducts';
import { useGlobalContext } from '../context/GlobalContext';
import ProductCard from '../components/ProductCard';
import ImageSlider from '../components/ImageSlider';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Home() {
    const { products, loading, error } = useProducts();

    const {
        favorites,
        toggleFavorite,
        compareList,
        addToCompare,
        removeFromCompare,
    } = useGlobalContext();

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('title-asc');

    const inputRef = useRef(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            if (inputRef.current) inputRef.current.focus();
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

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

    const sliderImages = [
        "/images/slide1.jpg",
        "/images/slide2.jpg",
        "/images/slide3.jpg"
    ];

    if (loading) return <div className="text-center mt-5">Caricamento in corso...</div>;
    if (error) return <div className="alert alert-danger mt-4">Errore: {error}</div>;

    return (
        <main className="container my-5">
            {/* Hero Section */}
            <div className="text-center mb-4">
                <h1 className="display-4 fw-bold">AmazBool</h1>
                <p className="lead text-muted">
                    Confronta e salva i migliori prodotti high-tech e trova quello più adatto per te
                </p>
            </div>

            {/* Slider sotto la Hero */}
            <ImageSlider images={sliderImages} />

            {/* Filters */}
            <div className="row g-3 mb-5">
                <div className="col-md-4">
                    <input
                        ref={inputRef}
                        type="text"
                        className="form-control shadow-sm"
                        placeholder="🔍 Cerca per titolo..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select shadow-sm"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">Tutte le categorie</option>
                        <option value="cuffie">Cuffie 🎧</option>
                        <option value="fotocamere">Fotocamere 📷</option>
                        <option value="microfoni">Microfoni 🎤</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select shadow-sm"
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

            {/* Lista prodotti */}
            <div className="row">
                {filteredProducts.length === 0 ? (
                    <div className="col-12 text-center mt-5">
                        <h4>Nessun risultato trovato.</h4>
                        <p>Prova a modificare la ricerca o i filtri.</p>
                    </div>
                ) : (
                    filteredProducts.map(product => {
                        const isFavorite = favorites.some(p => p.id === product.id);
                        const isCompared = compareList.some(p => p.id === product.id);

                        return (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <ProductCard
                                    product={{
                                        ...product,
                                        category: capitalizeFirstLetter(product.category),
                                    }}
                                    isFavorite={isFavorite}
                                    isCompared={isCompared}
                                    onToggleFavorite={toggleFavorite}
                                    onToggleCompare={product => {
                                        if (isCompared) removeFromCompare(product);
                                        else addToCompare(product);
                                    }}
                                />
                            </div>
                        );
                    })
                )}
            </div>
        </main>
    );
}
