import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    // useEffect viene eseguito ogni volta che 'value' o 'delay' cambiano
    useEffect(() => {
        // Imposta un timeout per aggiornare il valore dopo 'delay' millisecondi
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Pulisce il timeout se value o delay cambiano
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}