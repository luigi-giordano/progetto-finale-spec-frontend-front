import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Pulisce il timeout se value o delay cambiano
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}