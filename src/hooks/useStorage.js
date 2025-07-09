import { useState } from "react";
export default function useStorage(itemKey, initialValue) {

    const [state, setState] = useState(() => {
        // Recupera il valore iniziale dal localStorage o usa il valore di default
        const prevState = localStorage.getItem(itemKey);
        if (prevState) {
            try {
                return JSON.parse(prevState);
            } catch {
                return initialValue;
            }
        } else {
            localStorage.setItem(itemKey, JSON.stringify(initialValue));
            return initialValue;
        }
    });

    const changeState = (newState) => {
        setState(newState);
        // Aggiorna il localStorage con il nuovo valore serializzato
        localStorage.setItem(itemKey, JSON.stringify(newState));
    }
    return [state, changeState];
}