import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext"; 
import useEvents from "../hooks/useEvents"; 
import EventCardDetails from "../components/EventCardDetails"; 

export default function ComparatorPage() {

    const { events } = useGlobalContext();

    const [firstId, setFirstId] = useState("");
    const [secondId, setSecondId] = useState("");

   
    const firstEventHook = useEvents();
    const secondEventHook = useEvents(); 


    useEffect(() => {
        firstEventHook.fetchSingleEvent(firstId);
    }, [firstId]); 

    useEffect(() => {
        secondEventHook.fetchSingleEvent(secondId);
    }, [secondId]); 


    const handleClear = () => {
        setFirstId('');
        setSecondId('');
    };


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
                {firstId === "" ? ( 
                    <div className="flex items-center justify-center min-h-[300px] bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-gray-400 text-center">
                        Seleziona il primo evento per confrontarlo.
                    </div>
                ) : ( 
                    firstEventHook.singleEvent?.event && ( 
                        <EventCardDetails event={firstEventHook.singleEvent.event} />
                    )
                )}

                {/* Pannello per il secondo evento */}
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