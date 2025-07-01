export default function debounce(callback, delay) { // Funzione di debounce che accetta una callback e un ritardo
    let timer; // Inizializza un timer per gestire il ritardo
    return (value) => { // Restituisce una nuova funzione che accetta un valore
        clearTimeout(timer); // Pulisce il timer precedente se esiste
        timer = setTimeout(() => { // Imposta un nuovo timer
            // console.log(`Debounced value: ${value}`)
            callback(value); // Chiama la callback con il valore dopo il ritardo
        }, delay);
    };
}