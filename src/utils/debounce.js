export default function debounce(callback, delay) { // Funzione di debounce che accetta una callback e un ritardo
    let timer; // Inizializza un timer per gestire il ritardo
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            // console.log(`Debounced value: ${value}`)
            callback(value);
        }, delay);
    };
}