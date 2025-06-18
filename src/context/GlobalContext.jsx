import { createContext, useContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    // Preferiti
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    function addFavorite(product) {
        setFavorites((prev) => {
            if (prev.find((p) => p.id === product.id)) return prev;
            return [...prev, product];
        });
    }

    function removeFavorite(product) {
        setFavorites((prev) => prev.filter((p) => p.id !== product.id));
    }

    function toggleFavorite(product) {
        const isAlreadyFavorite = favorites.some((p) => p.id === product.id);
        isAlreadyFavorite ? removeFavorite(product) : addFavorite(product);
    }

    // Nuova funzione per svuotare tutti i preferiti
    function clearFavorites() {
        setFavorites([]);
    }

    // Comparazione
    const [compareList, setCompareList] = useState(() => {
        const stored = localStorage.getItem("compare");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("compare", JSON.stringify(compareList));
    }, [compareList]);

    function addToCompare(product) {
        setCompareList((prev) => {
            if (prev.find((p) => p.id === product.id)) return prev;

            if (prev.length >= 4) {
                alert("Puoi confrontare al massimo 4 prodotti.");
                return prev;
            }

            return [...prev, product];
        });
    }

    function removeFromCompare(product) {
        setCompareList((prev) => prev.filter((p) => p.id !== product.id));
    }

    function clearCompare() {
        setCompareList([]);
    }

    return (
        <GlobalContext.Provider
            value={{
                favorites,
                addFavorite,
                removeFavorite,
                toggleFavorite,
                clearFavorites,
                compareList,
                addToCompare,
                removeFromCompare,
                clearCompare,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}
