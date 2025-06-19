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
            const isInList = prev.some((p) => p.id === product.id);
            if (isInList) return prev;

            // Cerca il prodotto completo, se esiste
            const full = products.find((p) => p.id === product.id);
            const enriched = full ? { ...full, ...product } : product;

            return [...prev, enriched];
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
        //Controllo se la lista ha gia 4 prodotti
        //Se si, non aggiungo il prodotto e mostro un alert
        if (compareList.length >= 4) {
            alert("Puoi confrontare al massimo 4 prodotti.");
            return;
        };
        //Se no, aggiungo il prodotto alla lista
        setCompareList((compareListPrev) => {
            if (compareListPrev.find((p) => p.id === product.id)) return compareListPrev; // Se il prodotto è già nella lista, non lo aggiungo
            return [...compareListPrev, product]; // Altrimenti lo aggiungo
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
