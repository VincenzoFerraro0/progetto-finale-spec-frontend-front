// Import dei moduli React Router necessari
import { Link, useNavigate } from "react-router-dom"

// Import del contesto globale per accedere agli eventi filtrati e ordinati
import { useGlobalContext } from "../context/GlobalContext"

// Import dei componenti personalizzati
import ToolBar from "../components/ToolBar"
import GradientBar from "../components/GradientBar"
import BtnWishList from "../components/BtnWishList"
import EventCard from "../components/EventCard"

// Componente principale che mostra la lista degli eventi
export default function EventsList() {
    // Recupera la lista di eventi filtrati e ordinati dal contesto globale
    const { filteredAndSortedEvents } = useGlobalContext()

    return (
        <>

            {/* Container centrato con larghezza massima */}
            <div className="max-w-4xl mx-auto text-white">
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
                                <EventCard key={event.id} obj={event} />
                            )
                        })
                    )}
                </div>
            </div>
        </>
    )
}