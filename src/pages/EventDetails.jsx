import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"

import useEvents from "../hooks/useEvents"
import EventCardDetails from "../components/EventCardDetails"

/**
 * Componente per visualizzare i dettagli di un singolo evento
 * Recupera l'ID dell'evento dalla URL e mostra le informazioni complete
 */
export default function EventDetails() {
    // Estrae l'ID dell'evento dalla URL tramite React Router
    const { id } = useParams()

    // Hook personalizzato per la gestione degli eventi
    const { fetchSingleEvent, singleEvent } = useEvents()

    // Effetto per caricare i dati dell'evento quando il componente viene montato
    // o quando l'ID cambia
    useEffect(() => {
        if (id) {
            fetchSingleEvent(id); // Chiama la funzione per recuperare l'evento
        }
    }, [id]); // Dipendenza: si riesegue quando l'ID cambia

    // Estrae l'oggetto evento dalla risposta del hook
    const event = singleEvent?.event;
 

    // Stato di caricamento: mostra un messaggio mentre i dati vengono recuperati
    if (!event) {
        return (
            <p className="text-center text-gray-400">Caricamento in corso...</p>
        )
    }

    // Render principale del componente
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                {/* Link di navigazione per tornare alla lista eventi */}
                <Link
                    to="/"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-6"
                >
                    {/* Icona freccia sinistra */}
                    <span className="text-xl mr-2">←</span>
                    {/* Testo del link con stile mono  */}
                    <span className="uppercase tracking-wide text-sm font-mono">torna agli eventi</span>
                </Link>
            </div>

            {/* Contenuto principale: mostra la card con i dettagli dell'evento */}
            <div>
                <EventCardDetails event={event} />
            </div>
        </div>
    )
}