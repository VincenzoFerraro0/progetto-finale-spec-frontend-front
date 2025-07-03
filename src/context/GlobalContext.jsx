// Importa la funzione createContext da React per creare un contesto globale
import { createContext } from "react";

// Importa un hook personalizzato che gestisce i dati relativi agli eventi
import useEvents from "../hooks/useEvents";

// Definisce un componente provider che fornisce i dati ai componenti figli
export const GlobalContext = createContext();

// Definisce un componente provider che fornisce i dati ai componenti fisgli
export function GlobalProvider({ children }) {

    // Recupero i dati degli eventi tramite l'hook personalizzato
    const eventData = useEvents();
    return (
        // Ritorna il provider del contesto con i dati degli eventi disponibili per tutti i figli
        <GlobalContext.Provider value={{ ...eventData }}>
            {children}
        </GlobalContext.Provider>
    )
}
