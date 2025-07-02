// Import dei React Hooks e dei custom hooks/componenti
import { useState, useMemo, useCallback } from 'react';
import debounce from '../utils/debounce';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ImageSlider from '../components/ImageSlider';
import Footer from '../components/Footer';

// Funzione helper per rendere maiuscola la prima lettera di una stringa
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Componente principale della homepage
export default function Home() {
    // Dati caricati da API tramite hook personalizzato
    const { products, loading, error } = useProducts();

    // Stato locale per input visivo dell'utente
    const [searchTerm, setSearchTerm] = useState('');

    // Stato che contiene il debounce per la ricerca
    const [debounceSearch, setDebounceSearch] = useState('');

    // Funzione debounced che si aggiorna solo dopo 500ms e memorizza la funzione con useCallback
    const debounceSetSearch = useCallback(debounce(setDebounceSearch, 500), []);

    // Stato locale per il filtro per categoria
    const [category, setCategory] = useState('');

    // Stato locale per l'ordinamento (titolo/categoria, ascendente/descendente)
    const [sort, setSort] = useState('title-asc');

    // Calcolo dei prodotti filtrati in base a ricerca, categoria e ordinamento, memorizzo il risultato con useMemo
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filtro per titolo con debounce
        // Se il debounceSearch è vuoto, non applico il filtro
        // Altrimenti filtro i prodotti che contengono il termine di ricerca nel titolo
        if (debounceSearch.trim()) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(debounceSearch.toLowerCase())
            );
        }

        // Filtro per categoria
        if (category) {
            result = result.filter(p => p.category === category);
        }

        // Ordinamento
        if (sort === 'title-asc') result.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === 'title-desc') result.sort((a, b) => b.title.localeCompare(a.title));
        if (sort === 'category-asc') result.sort((a, b) => a.category.localeCompare(b.category));
        if (sort === 'category-desc') result.sort((a, b) => b.category.localeCompare(a.category));

        return result;
    }, [products, debounceSearch, category, sort]);

    // Immagini per lo slider
    const sliderImages = [
        "/img/slide1.png",
        "/img/slide2.png",
        "/img/slide3.png"
    ];

    // Se il caricamento è in corso o c'è un errore, mostro un messaggio di stato
    if (loading) return (<div className="text-center mt-5">Caricamento in corso...</div>);
    if (error) return (<div className="alert alert-danger mt-4">Errore: {error}</div>);

    return (
        <>
            <main className="container my-5">
                {/* Hero */}
                <div className="text-center mb-4">
                    <h1 className="display-4 fw-bold">AmazBool</h1>
                    <p className="lead text-muted">
                        Confronta e salva i migliori prodotti high-tech e trova quello più adatto a te
                    </p>
                </div>

                {/* Slider immagini */}
                <ImageSlider images={sliderImages} />

                {/* Filtri */}
                <div className="row g-3 mb-5">
                    {/* Input di ricerca controllato */}
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control shadow-sm"
                            placeholder="🔍 Cerca per titolo..."
                            value={searchTerm}
                            onChange={e => {
                                setSearchTerm(e.target.value);
                                debounceSetSearch(e.target.value);
                            }}
                        />
                    </div>

                    {/* Select categoria controllata */}
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

                    {/* Select ordinamento controllato */}
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
                            return (
                                <div
                                    className="col-12 col-sm-8 col-md-6 col-lg-4 mb-4 d-flex justify-content-center mx-auto"
                                    key={product.id}
                                >
                                    <ProductCard
                                        product={{
                                            ...product,
                                            category: capitalizeFirstLetter(product.category),
                                        }}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}
