import { createContext, useContext, useState, useEffect } from "react";
export const GlobalContext = createContext();

// Provider globale che avvolge l'intera applicazione, e attraverso la prop speciale children
// mi permette di passare i componenti figli che avranno accesso al contesto 
export function GlobalProvider({ children }) {

    // GESTIONE PREFERITI
    const [favorites, setFavorites] = useState(() => {
        // "Legge" i preferiti dal localStorage (getItem) all'avvio dell'applicazione
        const stored = localStorage.getItem("favorites");
        // Se esistono preferiti salvati, li restituisce come array, altrimenti restituisce un array vuoto
        return stored ? JSON.parse(stored) : [];
    });

    // "Salva" i preferiti nel localStorage (setItem) ogni volta che cambia lo stato di favorites
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites)); // lo trasformo in stringa
    }, [favorites]);

    // Aggiunge un prodotto ai preferiti se non è già presente, usando some per evitare duplicati
    // e prev per accedere allo stato precedente
    function addFavorite(product) {
        setFavorites((prev) => {
            const isInList = prev.some((p) => p.id === product.id);
            // Se il prodotto è già presente, restituisce la lista
            if (isInList) return prev;
            // Se il prodotto non è presente, crea una nuova lista
            // usando lo spread operator per mantenere gli altri prodotti
            // e aggiunge il nuovo prodotto
            return [...prev, product];
        });
    }

    // Funzione di rimozione prodotto dai preferiti
    // Utilizzo il metodo filter per creare una nuova lista senza il prodotto specificato
    function removeFavorite(product) {
        setFavorites((prev) => prev.filter((p) => p.id !== product.id));
    }

    // Funzione di aggiunta o rimozione di un prodotto in base alla sua presenza
    // Utilizza some per verificare se il prodotto è già nei preferiti
    function toggleFavorite(product) {
        const isAlreadyFavorite = favorites.some((p) => p.id === product.id);
        isAlreadyFavorite ? removeFavorite(product) : addFavorite(product);
    }

    // Funzione di rimozione di tutti i preferiti
    function clearFavorites() {
        setFavorites([]);
    }

    // GESTIONE COMPARAZIONE
    const [compareList, setCompareList] = useState(() => {
        const stored = localStorage.getItem("compare");
        return stored ? JSON.parse(stored) : [];
    });

    // Salva automaticamente la lista di confronto nel localStorage ogni volta che cambia
    useEffect(() => {
        localStorage.setItem("compare", JSON.stringify(compareList));
    }, [compareList]);

    // Funzione di aggiunta di un prodotto alla lista di confronto, massimo 4 elementi
    function addToCompare(product) {
        // Se la lista di confronto contiene già 4 prodotti, mostro un alert e interrompo l'aggiunta
        if (compareList.length >= 4) {
            alert("Puoi confrontare al massimo 4 prodotti.");
            return;
        }
        // Aggiorna la lista di confronto
        setCompareList((prev) => {
            // Se il prodotto è già presente, restituisce la lista attuale
            if (prev.some((p) => p.id === product.id)) return prev;
            // Se il prodotto non è presente, lo aggiunge a una nuova lista
            // usando lo spread operator per mantenere gli altri prodotti
            // e aggiunge il nuovo prodotto
            return [...prev, product];
        });
    }

    // Funzione di rimozione di un prodotto dalla lista di confronto
    function removeFromCompare(product) {
        setCompareList((prev) => prev.filter((p) => p.id !== product.id));
    }

    // Funzione di aggiunta o rimozione di un prodotto dalla lista di confronto in base alla sua presenza
    function toggleCompare(product) {
        const isAlreadyInCompare = compareList.some((p) => p.id === product.id);
        // Se il prodotto è già nella lista di confronto, lo rimuove
        isAlreadyInCompare ? removeFromCompare(product) : addToCompare(product);
    }

    // Funzione di rimozione di tutti i prodotti dalla lista di confronto
    function clearCompare() {
        setCompareList([]);
    }

    // Valori e funzioni esportati dal contesto globale
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
                toggleCompare,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

// Hook personalizzato per utilizzare il contesto globale in qualsiasi componente
export function useGlobalContext() {
    return useContext(GlobalContext);
}