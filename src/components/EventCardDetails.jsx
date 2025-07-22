import { Link } from "react-router-dom";
import GradientBar from "./GradientBar";
import BtnWishList from "./BtnWishList";

/**
 * Componente per visualizzare i dettagli completi di un evento
 * Mostra immagine, informazioni principali, dettagli e pulsante per l'acquisto biglietti
 * * @param {Object} event - Oggetto contenente tutti i dati dell'evento
 */
export default function EventCardDetails({ event }) {
    return (
        <div className="text-white">
            {/* Sezione immagine dell'evento */}
            <div className="relative mb-8">
                <BtnWishList event={event} /> {/* Pulsante per aggiungere ai preferiti */}
                <figure className="w-full h-96 overflow-hidden">
                    {/* Immagine di copertina  */}
                    <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </figure>

                {/* Barra decorativa con gradient */}
                <GradientBar />
            </div>

            {/* Sezione informazioni evento */}
            <div className="flex flex-col justify-between">
                <div>
                    {/* Titolo principale dell'evento */}
                    <h1 className="text-4xl font-bold mb-6 text-white uppercase tracking-wider leading-tight">
                        {event.title}
                    </h1>

                    {/* Badge categoria evento */}
                    <div className="mb-6">
                        <span className="inline-block bg-gray-900/50 border border-gray-800 px-4 py-2 text-gray-400 text-sm uppercase tracking-widest font-mono">
                            {event.category}
                        </span>
                    </div>

                    {/* Descrizione dettagliata dell'evento */}
                    <div className="mb-8">
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {event.description}
                        </p>
                    </div>

                    {/* Sezione dettagli evento con design a blocchi */}
                    <div className="space-y-6">

                        {/* Data evento con formattazione italiana */}
                        <div className="border-l-4 pl-4">
                            <h3 className="text-sm uppercase tracking-widest font-mono text-gray-400 mb-1">
                                Data
                            </h3>
                            <p className="text-white text-lg font-semibold">
                                {/* Formattazione data in italiano con giorno della settimana */}
                                {new Date(event.date).toLocaleDateString('it-IT', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>

                        {/* Luogo evento */}
                        <div className="border-l-4 pl-4">
                            <h3 className="text-sm uppercase tracking-widest font-mono text-gray-400 mb-1">
                                Luogo
                            </h3>
                            <p className="text-white text-lg font-semibold">
                                {event.location}
                            </p>
                        </div>

                        {/* Lista artisti partecipanti - rendering condizionale */}
                        {event.artists && event.artists.length > 0 && (
                            <div className="border-l-4 pl-4">
                                <h3 className="text-sm uppercase tracking-widest font-mono text-gray-400 mb-1">
                                    Artisti
                                </h3>
                                {/* Disposizione flessibile dei badge artisti */}
                                <div className="flex flex-wrap gap-2">
                                    {event.artists.map((artist, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-900/50 border border-gray-800 px-3 py-1 text-white text-sm uppercase tracking-wide"
                                        >
                                            {artist}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags evento - rendering condizionale */}
                        {event.tags && event.tags.length > 0 && (
                            <div className="border-l-4 pl-4">
                                <h3 className="text-sm uppercase tracking-widest font-mono text-gray-400 mb-1">
                                    Tags
                                </h3>
                                {/* Disposizione flessibile dei tag con prefisso # */}
                                <div className="flex flex-wrap gap-2">
                                    {event.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-800/50 border border-gray-700 px-3 py-1 text-gray-300 text-sm uppercase tracking-wide"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pulsante per acquisto biglietti - rendering condizionale */}
                {event.ticketLink && (
                    <div className="pt-6">
                        <Link
                            to={event.ticketLink}
                            className={`text-white bg-gradient-to-r from-[#e6007e] to-[#1f103d] hover:from-[#1f103d] hover:to-[#e6007e] transition-colors duration-300 px-6 py-3 rounded-full text-lg font-semibold uppercase tracking-wider flex items-center justify-center`}
                            target="_blank" //dice al browser di aprire il link in una nuova scheda.
                            rel="noopener noreferrer" //è una best practice di sicurezza, soprattutto per evitare che la pagina aperta possa accedere alla window.opener della tua app.
                        >
                            acquista biglietti
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}