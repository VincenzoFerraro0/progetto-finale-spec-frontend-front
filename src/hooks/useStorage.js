import { useState } from "react";

// Custom hook chiamato useStorage per gestire stato sincronizzato con localStorage
export default function useStorage(itemKey, initialValue) {

    // useState con funzione di inizializzazione pigra (lazy initializer)
    const [state, setState] = useState(() => {
        
        // Prova a recuperare un valore già salvato in localStorage
        const prevState = localStorage.getItem(itemKey);

        if (prevState) {
            try {
                // Se esiste, prova a fare il parsing del valore JSON salvato
                return JSON.parse(prevState);
            } catch {
                // Se il parsing fallisce, usa il valore iniziale
                return initialValue;
            }
        } else {
            // Se non esiste nulla in localStorage, salva il valore iniziale
            localStorage.setItem(itemKey, JSON.stringify(initialValue));
            return initialValue;
        }
    });

    // Funzione per aggiornare lo stato e il localStorage insieme
    const changeState = (newState) => {
        setState(newState); // aggiorna lo stato React
        localStorage.setItem(itemKey, JSON.stringify(newState)); // aggiorna localStorage
    }

    // Ritorna lo stato attuale e la funzione per modificarlo
    return [state, changeState];
}