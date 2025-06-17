import { createContext, useContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    // Stato preferiti (array di prodotti)
    const [favorites, setFavorites] = useState(() => {
        // Legge da localStorage all'avvio per persistenza
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    // Sync con localStorage ogni volta che favorites cambia
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Funzioni per aggiungere/rimuovere preferiti
    function addFavorite(product) {
        setFavorites((prev) => {
            if (prev.find((p) => p.id === product.id)) return prev; // evita duplicati
            return [...prev, product];
        });
    }

    function removeFavorite(product) {
        setFavorites((prev) => prev.filter((p) => p.id !== product.id));
    }

    function toggleFavorite(product) {
        const isAlreadyFavorite = favorites.some((p) => p.id === product.id);
        if (isAlreadyFavorite) {
            removeFavorite(product);
        } else {
            addFavorite(product);
        }
    }


    return (
        <GlobalContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}
