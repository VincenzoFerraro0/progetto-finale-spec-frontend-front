import { createContext, useContext, useCallback, useMemo, useState, use } from "react";

import useEvents from "../hooks/useEvents";
import { useNavigate } from "react-router-dom";
import useStorage from "../hooks/useStorage";

// Crea il contesto globale per condividere lo stato tra componenti
const GlobalContext = createContext();

/**
 * Funzione di debounce per ritardare l'esecuzione di una callback
 * Utile per evitare troppe chiamate durante la digitazione
 * @param {Function} callback - La funzione da eseguire
 * @param {number} delay - Il ritardo in millisecondi
 * @returns {Function} - La funzione con debounce applicato
 */
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
 * @param {Object} props - Le props del componente
 * @param {React.ReactNode} props.children - I componenti figli
 */
export function GlobalProvider({ children }) {

    const navigate = useNavigate()
    // Recupera tutti gli eventi tramite hook personalizzato
    const { events } = useEvents();

    //! STATI
    // State per la query di ricerca
    const [searchQuery, setSearchQuery] = useState("");
    // State per la categoria selezionata nel filtro
    const [selectedCategory, setSelectedCategory] = useState("");
    // State per il campo di ordinamento (es: "title", "date", ecc.)
    const [sortField, setSortField] = useState("title");
    // State per la direzione di ordinamento ("asc" o "desc")
    const [sortOrder, setSortOrder] = useState("asc");
    
    // State per la wishList persistente su localStorage
    const [wishList, setWishList] = useStorage("wishList", [])

    // Funzione di ricerca con debounce per evitare troppe chiamate durante la digitazione
    // Ritarda l'esecuzione di 500ms dopo l'ultimo carattere digitato
    const debaunceSearch = useCallback(debounce(setSearchQuery, 500), []);


    // Memo per calcolare eventi filtrati e ordinati
    // Si ricalcola solo quando cambiano le dipendenze
    const filteredAndSortedEvents = useMemo(() => {
        return [...events] // Crea una copia dell'array per evitare mutazioni
            .filter(t =>
                // Filtro per titolo: controlla se il titolo contiene la query di ricerca (case-insensitive)
                t.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
                // Filtro per categoria: mostra tutti se nessuna categoria è selezionata, altrimenti filtra per categoria
                (selectedCategory === "" || t.category === selectedCategory)
            )
            .sort((a, b) => {
                // Estrae i valori per il confronto, convertendoli in lowercase per ordinamento case-insensitive
                const aValue = a[sortField]?.toLowerCase() ?? "";
                const bValue = b[sortField]?.toLowerCase() ?? "";

                // Ordina in base alla direzione specificata
                if (sortOrder === "asc") {
                    return aValue.localeCompare(bValue); // Ordinamento crescente
                } else {
                    return bValue.localeCompare(aValue); // Ordinamento decrescente
                }
            });
    }, [searchQuery, selectedCategory, events, sortField, sortOrder]); // Dipendenze per la ricalcolazione


    // Funzioni per gestire la wish list degli eventi
    const addWishList = (event) => {
        // Aggiunge un evento alla wish list se non è già presente
        if (!wishList.some((item) => item.id === event.id)) {
            setWishList([...wishList, event]);
        }
    };

    const removeWishList = (event) => {
        // Rimuove un evento dalla wish list
        setWishList(wishList.filter((item) => item.id !== event.id));
    };

    const isInWishList = useCallback((event) => {
        // Controlla se un evento è già presente nella wish list
        return wishList.some((item) => item.id === event.id);
    }, [wishList]); // Dipendenza per evitare ricomputazioni inutili

    const clearWishList = () => {
        setWishList([])
        navigate('/')

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
 * @returns {Object} - Il valore del contesto globale
 * @throws {Error} - Se utilizzato fuori dal GlobalProvider
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