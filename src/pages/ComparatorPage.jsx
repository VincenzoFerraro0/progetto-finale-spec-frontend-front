// Importazione di hook e componenti necessari
import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext"; 
import useEvents from "../hooks/useEvents"; 
import EventCardDetails from "../components/EventCardDetails"; 

// Componente principale per confrontare due eventi
export default function ComparatorPage() {

    // Recupera tutti gli eventi dal contesto globale
    const { events } = useGlobalContext();

    // Stati per memorizzare gli ID degli eventi selezionati
    const [firstId, setFirstId] = useState("");
    const [secondId, setSecondId] = useState("");

    // Hook personalizzati per gestire il recupero dei dati di ciascun evento
    const firstEventHook = useEvents();
    const secondEventHook = useEvents(); 

    // Quando cambia il primo ID, recupera i dati del primo evento
    useEffect(() => {
        firstEventHook.fetchSingleEvent(firstId);
    }, [firstId]); 

    // Quando cambia il secondo ID, recupera i dati del secondo evento
    useEffect(() => {
        secondEventHook.fetchSingleEvent(secondId);
    }, [secondId]); 

    // Funzione per azzerare entrambe le selezioni
    const handleClear = () => {
        setFirstId('');
        setSecondId('');
    };

    return (
        <div className="max-w-6xl mx-auto text-white p-4">

            {/* Header con link di ritorno, titolo e pulsante reset */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

                {/* Link per tornare alla lista eventi */}
                <Link
                    to="/"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 flex-shrink-0"
                >
                    <span className="text-xl mr-2">←</span>
                    <span className="uppercase tracking-wide text-sm font-mono">torna agli eventi</span>
                </Link>

                {/* Titolo della pagina */}
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

            {/* Sezione per la selezione dei due eventi da confrontare */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                
                {/* Dropdown per selezionare il primo evento */}
                <div>
                    <label htmlFor="select-event-1" className="block text-white mb-2">Evento 1</label>
                    <select
                        id="select-event-1"
                        className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e6007e]"
                        value={firstId}
                        onChange={e => setFirstId(e.target.value)}
                    >
                        <option value="">Seleziona un evento...</option>
                        {/* Mappa tutti gli eventi disponibili, disattivando quello selezionato nel secondo dropdown */}
                        {events.map(event => (
                            <option
                                key={event.id}
                                value={event.id}
                                disabled={event.id === parseInt(secondId)}
                            >
                                {event.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dropdown per selezionare il secondo evento */}
                <div>
                    <label htmlFor="select-event-2" className="block text-white mb-2">Evento 2</label>
                    <select
                        id="select-event-2"
                        className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1f103d]"
                        value={secondId}
                        onChange={e => setSecondId(e.target.value)}
                    >
                        <option value="">Seleziona un evento...</option>
                        {/* Mappa tutti gli eventi disponibili, disattivando quello selezionato nel primo dropdown */}
                        {events.map(event => (
                            <option
                                key={event.id}
                                value={event.id}
                                disabled={event.id === parseInt(firstId)}
                            >
                                {event.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Sezione di visualizzazione dei dettagli dei due eventi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Visualizza il primo evento o un messaggio placeholder */}
                {firstId === "" ? ( 
                    <div className="flex items-center justify-center min-h-[300px] bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-gray-400 text-center">
                        Seleziona il primo evento per confrontarlo.
                    </div>
                ) : ( 
                    firstEventHook.singleEvent?.event && ( 
                        <EventCardDetails event={firstEventHook.singleEvent.event} />
                    )
                )}

                {/* Visualizza il secondo evento o un messaggio placeholder */}
                {secondId === "" ? ( 
                    <div className="flex items-center justify-center min-h-[300px] bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-gray-400 text-center">
                        Seleziona il secondo evento per confrontarlo.
                    </div>
                ) : ( 
                    secondEventHook.singleEvent?.event && ( 
                        <EventCardDetails event={secondEventHook.singleEvent.event} />
                    )
                )}
            </div>
        </div>
    );
}