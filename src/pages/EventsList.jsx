// Import dei moduli React Router necessari
import { Link, useNavigate } from "react-router-dom"

// Import del contesto globale per accedere agli eventi filtrati e ordinati
import { useGlobalContext } from "../context/GlobalContext"

// Import dei componenti personalizzati
import ToolBar from "../components/ToolBar"
import GradientBar from "../components/GradientBar"

// Componente principale che mostra la lista degli eventi
export default function EventsList() {
    // Recupera la lista di eventi filtrati e ordinati dal contesto globale
    const { filteredAndSortedEvents } = useGlobalContext()

    // Navigazione programmata tra le pagine
    const navigate = useNavigate()

    // Funzione chiamata quando si clicca su "dettagli"
    const handleEventClick = (eventId) => {
        navigate(`/events/${eventId}`)  // Naviga verso la pagina dettagliata dell'evento
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Container centrato con larghezza massima */}
            <div className="max-w-4xl mx-auto">
                {/* Titolo della pagina */}
                <h1 className="text-4xl font-bold mb-12 text-center tracking-wider uppercase">
                    prossimi eventi
                </h1>

                {/* Barra degli strumenti per filtri/ordinamento */}
                <ToolBar />

                {/* Griglia per la visualizzazione degli eventi */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Messaggio di caricamento se non ci sono eventi */}
                    {filteredAndSortedEvents.length === 0 ? (
                        <p>Caricamento degli eventi in corso</p>
                    ) : (
                        // Mappa degli eventi da visualizzare
                        filteredAndSortedEvents.map((event) => {
                            return (
                                // Ogni evento è un link cliccabile alla sua pagina dettagliata
                                <Link
                                    key={event.id}
                                    to={`/events/${event.id}`}
                                    className="cursor-default"
                                >
                                    <div className="border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-600 transition-all duration-300 hover:bg-gray-900/80 h-full flex flex-col justify-between">
                                        
                                        {/* Titolo dell’evento */}
                                        <h3 className="text-lg lg:text-xl font-semibold mb-2 text-white uppercase tracking-wide">
                                            {event.title}
                                        </h3>

                                        {/* Categoria dell’evento */}
                                        <p className="text-gray-400 text-sm uppercase tracking-widest font-mono">
                                            {event.category}
                                        </p>

                                        {/* Barra decorativa sotto titolo e categoria */}
                                        <GradientBar />

                                        {/* Bottone per visualizzare i dettagli */}
                                        <div className="self-center mt-4">
                                            <button
                                                onClick={() => handleEventClick(event.id)}
                                                className="bg-white text-black hover:bg-[#008cff] hover:text-white font-bold py-2 px-4 
                                                            rounded-full shadow-lg hover:shadow transition duration-300 ease-in-out
                                                            text-sm uppercase tracking-wider cursor-pointer"
                                            >
                                                dettagli
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}