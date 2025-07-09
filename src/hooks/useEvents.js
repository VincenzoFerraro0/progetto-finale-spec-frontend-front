import { useState, useEffect } from "react";

// Recupera l'URL dell'API dalle variabili d'ambiente
const { VITE_API_URL } = import.meta.env

/**
 * Hook personalizzato per gestire gli eventi
 * Fornisce funzionalità per recuperare tutti gli eventi e singoli eventi
 */
export default function useEvents() {

    // State per memorizzare la lista di tutti gli eventi
    const [events, setEvents] = useState([]);
    // State per memorizzare un singolo evento selezionato
    const [singleEvent, setSingleEvent] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    // Effect che viene eseguito al mount del componente per caricare tutti gli eventi
    useEffect(() => {
        /**
         * Funzione asincrona per recuperare tutti gli eventi dall'API
         */
        const fetchEvents = async () => {
            try {
                // Chiamata API per recuperare tutti gli eventi
                const res = await fetch(`${VITE_API_URL}/events`)
                const data = await res.json()
                // Aggiorna lo state con i dati ricevuti
                setEvents(data)
            } catch (error) {
                // Gestione degli errori con controllo del tipo
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error("Errore sconosciuto", error);
                }
            }finally {
                // Imposta isLoading a false dopo il fetch
                setIsLoading(false);
            }
        };
        // Esegue la funzione di fetch
        fetchEvents()
    }, []) // Array di dipendenze vuoto = esegue solo al mount

    
    /**
        Funzione per recuperare un singolo evento tramite ID
     */
    const fetchSingleEvent = async (id) => {
        try {
            // Chiamata API per recuperare un evento specifico
            const response = await fetch(`${VITE_API_URL}/events/${id}`);
            
            // Controlla se la risposta è valida
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
           
            // Converte la risposta in JSON
            const data = await response.json();
            // Aggiorna lo state con l'evento recuperato
            setSingleEvent(data);
        } catch (err) {
            // Log dell'errore e reset dello state in caso di fallimento
            console.error("Errore nel recupero dell'evento:", err);
            setSingleEvent(null); 
        }
    };

    // Ritorna gli stati e le funzioni per essere utilizzati nei componenti
    return {
        events,              // Lista di tutti gli eventi
        singleEvent,         // Singolo evento selezionato
        fetchSingleEvent,    // Funzione per recuperare un singolo evento
        isLoading
    };
}