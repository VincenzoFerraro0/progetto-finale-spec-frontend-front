import { useState, useEffect } from "react"; // Importa gli hook useState per la gestione dello stato e useEffect per effetti collaterali
import { useGlobalContext } from "../context/GlobalContext"; // Importa il contesto globale per accedere a dati globali, come la lista di tutti gli eventi
import useEvents from "../hooks/useEvents"; // Importa il custom hook useEvents per il fetching dei dettagli di un singolo evento
import EventCardDetails from "../components/EventCardDetails"; // Importa il componente EventCardDetails per visualizzare i dettagli di un evento
import { Link } from "react-router-dom"; // Importa Link per la navigazione tra le pagine

// Componente principale della pagina del comparatore
export default function ComparatorPage() {
    // Estrae la lista completa degli eventi dal contesto globale
    const { events } = useGlobalContext();

    // Stato locale per memorizzare l'ID del primo evento selezionato per il confronto
    const [firstId, setFirstId] = useState("");
    // Stato locale per memorizzare l'ID del secondo evento selezionato per il confronto
    const [secondId, setSecondId] = useState("");

    // Inizializza due istanze separate del custom hook useEvents.
    // Questo è fondamentale per poter gestire il fetching e lo stato di due eventi diversi in parallelo.
    const firstEventHook = useEvents(); // Gestirà i dati del primo evento
    const secondEventHook = useEvents(); // Gestirà i dati del secondo evento

    // useEffect per il primo evento: si attiva ogni volta che firstId cambia.
    // Richiede i dettagli completi dell'evento tramite fetchSingleEvent del primo hook.
    // NOTA: Se il tuo useEvents hook non usa useCallback per fetchSingleEvent,
    // dovresti includere 'firstEventHook.fetchSingleEvent' nelle dipendenze per evitare warning o loop.
    // Ho rimosso 'firstEventHook.fetchSingleEvent' dalle dipendenze qui perché presumiamo
    // che la funzione fetchSingleEvent all'interno di useEvents sia stabile (memoizzata con useCallback).
    useEffect(() => {
        firstEventHook.fetchSingleEvent(firstId);
    }, [firstId]); // Dipendenza solo da firstId, se fetchSingleEvent è stabile

    // useEffect per il secondo evento: si attiva ogni volta che secondId cambia.
    // Richiede i dettagli completi dell'evento tramite fetchSingleEvent del secondo hook.
    // Stessa nota sulle dipendenze di cui sopra.
    useEffect(() => {
        secondEventHook.fetchSingleEvent(secondId);
    }, [secondId]); // Dipendenza solo da secondId, se fetchSingleEvent è stabile

    // Funzione per resettare entrambe le selezioni degli eventi.
    // Imposta gli ID a stringhe vuote, il che a sua volta triggera gli useEffect
    // e (grazie alla logica interna di useEvents) resetta i dati dei singoli eventi a null.
    const handleClear = () => {
        setFirstId('');
        setSecondId('');
    };

    // Console log utile per il debug, mostra gli ID degli eventi selezionati ad ogni render.
    console.log("Rendering ComparatorPage with firstId:", firstId, "and secondId:", secondId);

    return (
        <div className="max-w-6xl mx-auto text-white p-4">
            {/* Header della pagina con titolo, link di ritorno e pulsante "Pulisci Tutto" */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                {/* Link per tornare alla pagina principale (lista eventi) */}
                <Link
                    to="/"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 flex-shrink-0"
                >
                    <span className="text-xl mr-2">←</span>
                    <span className="uppercase tracking-wide text-sm font-mono">torna agli eventi</span>
                </Link>
                {/* Titolo principale della pagina */}
                <h1 className="text-3xl md:text-4xl font-bold text-center tracking-wider uppercase flex-grow">
                    CONFRONTO EVENTI
                </h1>
                {/* Pulsante per pulire entrambe le selezioni */}
                <button
                    onClick={handleClear}
                    className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex-shrink-0"
                >
                    PULISCI TUTTO
                </button>
            </div>

            {/* Sezione dei dropdown per la selezione degli eventi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Dropdown per la selezione del primo evento */}
                <div>
                    <label htmlFor="select-event-1" className="block text-white mb-2">Evento 1</label>
                    <select
                        id="select-event-1"
                        className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e6007e]"
                        value={firstId}
                        onChange={e => setFirstId(e.target.value)} // Aggiorna firstId allo stato selezionato
                    >
                        <option value="">Seleziona un evento...</option>
                        {/* Mappa tutte le opzioni, disabilitando quella già selezionata nel secondo dropdown */}
                        {events.map(event => (
                            <option
                                key={event.id}
                                value={event.id}
                                disabled={event.id === parseInt(secondId)} // Disabilita se l'ID corrisponde a secondId (convertito a numero)
                            >
                                {event.title}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Dropdown per la selezione del secondo evento */}
                <div>
                    <label htmlFor="select-event-2" className="block text-white mb-2">Evento 2</label>
                    <select
                        id="select-event-2" // Ho aggiunto l'id per coerenza e accessibilità
                        className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1f103d]"
                        value={secondId}
                        onChange={e => setSecondId(e.target.value)} // Aggiorna secondId allo stato selezionato
                    >
                        <option value="">Seleziona un evento...</option>
                        {/* Mappa tutte le opzioni, disabilitando quella già selezionata nel primo dropdown */}
                        {events.map(event => (
                            <option
                                key={event.id}
                                value={event.id}
                                disabled={event.id === parseInt(firstId)} // Disabilita se l'ID corrisponde a firstId (convertito a numero)
                            >
                                {event.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Sezione per la visualizzazione delle EventCard affiancate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pannello per il primo evento */}
                {firstId === "" ? ( // Se nessun evento è stato selezionato per il primo slot
                    <div className="flex items-center justify-center min-h-[300px] bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-gray-400 text-center">
                        Seleziona il primo evento per confrontarlo.
                    </div>
                ) : ( // Se un ID è stato selezionato
                    firstEventHook.singleEvent?.event && ( // Renderizza EventCard SOLO SE i dati dell'evento sono arrivati e non sono nulli
                        <EventCardDetails event={firstEventHook.singleEvent.event} />
                    )
                    // Se firstId è selezionato ma firstEventHook.singleEvent?.event è null (es. in fase di caricamento, o errore, o ID non valido),
                    // questo blocco non renderizzerà nulla, lasciando lo spazio vuoto.
                )}

                {/* Pannello per il secondo evento */}
                {secondId === "" ? ( // Se nessun evento è stato selezionato per il secondo slot
                    <div className="flex items-center justify-center min-h-[300px] bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-gray-400 text-center">
                        Seleziona il secondo evento per confrontarlo.
                    </div>
                ) : ( // Se un ID è stato selezionato
                    secondEventHook.singleEvent?.event && ( // Renderizza EventCardDetails SOLO SE i dati dell'evento sono arrivati e non sono nulli
                        <EventCardDetails event={secondEventHook.singleEvent.event} />
                    )
                    // Comportamento simile al primo pannello per i casi di caricamento/errore/dati mancanti.
                )}
            </div>
        </div>
    );
}