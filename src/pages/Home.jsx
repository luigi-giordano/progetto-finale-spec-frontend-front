// Import dei React Hooks e dei custom hooks/componenti
import { useGlobalContext } from '../context/GlobalContext';
import { useState, useMemo } from 'react';
import useProducts from '../hooks/useProducts';
import useDebounce from '../hooks/useDebounce';
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

    // Valori ottenuti dal context globale
    const {
        favorites,          // Lista dei prodotti preferiti
        toggleFavorite,     // Aggiungere/rimuovere dai preferiti
        compareList,        // Lista dei prodotti da confrontare
        addToCompare,       // Aggiungere un prodotto al confronto
        removeFromCompare,  // Rimuovere un prodotto dal confronto
    } = useGlobalContext();

    // Stato locale per il campo di ricerca (input utente)
    const [searchTerm, setSearchTerm] = useState('');

    // Applichiamo debounce: il valore cambia solo dopo 500ms che l'utente smette di scrivere
    const debouncedSearch = useDebounce(searchTerm, 500);

    // Stato locale per il filtro per categoria
    const [category, setCategory] = useState('');

    // Stato locale per l'ordinamento (titolo/categoria, ascendente/descendente)
    const [sort, setSort] = useState('title-asc');

    // Calcolo dei prodotti filtrati/mappati in base a ricerca, categoria e ordinamento usando useMemo
    const filteredProducts = useMemo(() => {
        // Copia locale dei prodotti
        let result = [...products];

        // Filtro per titolo
        if (debouncedSearch.trim()) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }

        // Filtro per categoria
        if (category) {
            result = result.filter(p => p.category === category);
        }

        // Ordinamento in base alla selezione dell'utente
        if (sort === 'title-asc') result.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === 'title-desc') result.sort((a, b) => b.title.localeCompare(a.title));
        if (sort === 'category-asc') result.sort((a, b) => a.category.localeCompare(b.category));
        if (sort === 'category-desc') result.sort((a, b) => b.category.localeCompare(a.category));

        return result; // Restituiamo l'array filtrato e ordinato
    }, [products, debouncedSearch, category, sort]); // useMemo si aggiorna solo se uno di questi valori cambia

    // Immagini per lo slider della homepage
    const sliderImages = [
        "/img/slide1.png",
        "/img/slide2.png",
        "/img/slide3.png"
    ];

    // Stato di caricamento
    if (loading) return <div className="text-center mt-5">Caricamento in corso...</div>;

    // Stato di errore
    if (error) return <div className="alert alert-danger mt-4">Errore: {error}</div>;

    // Render principale della pagina
    return (
        <>
            <main className="container my-5">
                {/* Hero section: titolo e descrizione */}
                <div className="text-center mb-4">
                    <h1 className="display-4 fw-bold">AmazBool</h1>
                    <p className="lead text-muted">
                        Confronta e salva i migliori prodotti high-tech e trova quello più adatto a te
                    </p>
                </div>
                {/* Slider immagini sotto la hero */}
                <ImageSlider images={sliderImages} />
                {/* Filtri: input ricerca, select categoria, select ordinamento */}
                <div className="row g-3 mb-5">
                    {/* Input di ricerca */}
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control shadow-sm"
                            placeholder="🔍 Cerca per titolo..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Select categoria */}
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
                    {/* Select ordinamento */}
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
                {/* Lista dei prodotti filtrati */}
                <div className="row">
                    {/* Nessun risultato trovato */}
                    {filteredProducts.length === 0 ? (
                        <div className="col-12 text-center mt-5">
                            <h4>Nessun risultato trovato.</h4>
                            <p>Prova a modificare la ricerca o i filtri.</p>
                        </div>
                    ) : (
                        // Mapping dei prodotti da mostrare
                        filteredProducts.map(product => {
                            // Controllo se è nei preferiti o nella lista di confronto
                            const isFavorite = favorites.some(p => p.id === product.id);
                            const isCompared = compareList.some(p => p.id === product.id);
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
            {/* Footer finale */}
            <Footer />
        </>
    );
}
