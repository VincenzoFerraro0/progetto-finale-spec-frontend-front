import { createContext, useContext, useCallback, useMemo, useState, } from "react";

import useEvents from "../hooks/useEvents";
import { useNavigate } from "react-router-dom";
import useStorage from "../hooks/useStorage";

// Crea il contesto globale per condividere lo stato tra componenti
const GlobalContext = createContext();

//Funzione di debounce per ritardare l'esecuzione di una callback
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearInterval(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}

/**
 * Provider del contesto globale
 * Gestisce lo stato condiviso dell'applicazione per eventi, ricerca e filtri
 */
export function GlobalProvider({ children }) {
    // Recupera tutti gli eventi tramite hook personalizzato
    const { events } = useEvents();

    // State per la query di ricerca
    const [searchQuery, setSearchQuery] = useState("");
    // State per la categoria selezionata nel filtro
    const [selectedCategory, setSelectedCategory] = useState("");
    // State per il campo di ordinamento (es: "title", "date", ecc.)
    const [sortField, setSortField] = useState("title");
    // State per la direzione di ordinamento ("asc" o "desc")
    const [sortOrder, setSortOrder] = useState("asc");

    // Funzione di ricerca con debounce per evitare troppe chiamate durante la digitazione
    // Ritarda l'esecuzione di 500ms dopo l'ultimo carattere digitato
    const debaunceSearch = useCallback(debounce(setSearchQuery, 500), []);



    //! funzione che gestisce la ricerca ed il riordinamento degli eventi 
    const filteredAndSortedEvents = useMemo(() => {
        return [...events]
            .filter(e =>
                // Filtro per titolo: controlla se il titolo contiene la query di ricerca 
                e.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&

                // Filtro per categoria: se nessuna categoria è selezionata (""), accetta tutte;
                // altrimenti accetta solo quelle che corrispondono alla categoria selezionata
                (selectedCategory === "" || e.category === selectedCategory)
            )
            .sort((a, b) => {
                // Estrae i valori per il confronto, convertendoli in lowercase per ordinamento
                const aValue = a[sortField]?.toLowerCase() ?? "";
                const bValue = b[sortField]?.toLowerCase() ?? "";

                return sortOrder === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            });
    }, [searchQuery, selectedCategory, events, sortField, sortOrder]); // Dipendenze per la ricalcolazione


    //! Funzioni per gestire la wish list degli eventi
    // State per la wishList persistente su localStorage
    const [wishList, setWishList] = useStorage("wishList", [])
    
    // Aggiunge un evento alla wish list se non è già presente
    const addWishList = (event) => {
        if (!wishList.some((item) => item.id === event.id)) {
            setWishList([...wishList, event]);
        }
    };

    // Rimuove un evento dalla wish list
    const removeWishList = (event) => {
        setWishList(wishList.filter((item) => item.id !== event.id));
    };

    // Controlla se un evento è già presente nella wish list
    const isInWishList = useCallback((event) => {
        return wishList.some((item) => item.id === event.id);
    }, [wishList]); // Dipendenza per evitare ricomputazioni inutili

    // Svuota la wishList
    const clearWishList = () => {
        setWishList([])
    }

    // Oggetto valore che contiene tutto lo stato e le funzioni da condividere
    const value = {
        events,                    // Lista originale degli eventi
        debaunceSearch,           // Funzione di ricerca con debounce
        filteredAndSortedEvents,  // Eventi filtrati e ordinati
        setSelectedCategory,      // Setter per la categoria selezionata
        selectedCategory,         // Categoria attualmente selezionata
        setSortField,            // Setter per il campo di ordinamento
        setSortOrder,            // Setter per la direzione di ordinamento
        sortField,               // Campo di ordinamento attuale
        sortOrder,               // Direzione di ordinamento attuale
        wishList,                // Lista degli eventi nella wish list
        addWishList,             // Funzione per aggiungere un evento alla wish list
        removeWishList,          // Funzione per rimuovere un evento dalla wish list
        isInWishList,            // Funzione per verificare se un evento è nella wish
        clearWishList
    };

    // Restituisce il provider con il valore del contesto
    return (
        <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    );
}

/**
 * Hook personalizzato per utilizzare il contesto globale
 * Include controllo di errore per assicurarsi che sia usato all'interno del provider
 */
export function useGlobalContext() {
    const context = useContext(GlobalContext);

    // Controllo di sicurezza: verifica che l'hook sia utilizzato all'interno del provider
    if (context === undefined) {
        throw new Error(
            "useGlobalContext deve essere usato all'interno di un GlobalProvider"
        );
    }

    return context;
}