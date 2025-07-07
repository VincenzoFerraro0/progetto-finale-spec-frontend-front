import { useParams } from "react-router-dom"
import { useEffect } from "react"


import useEvents from "../hooks/useEvents"

export default function EventDetails() {

    const { id } = useParams()
    const { fetchSingleEvent, singleEvent } = useEvents()

   
    useEffect(() => {
        if (id) {
            fetchSingleEvent(id);
        }
    }, [id]);
    
    const event = singleEvent?.event;

    console.log(event)

    return (

        <>
            <h3>Pagina dettaglio Evento</h3>
            { event &&(
                <div>
                    <h1>{event.title}</h1>
                    <p>{event.description}</p>
                    <p>Data: {new Date(event.date).toLocaleDateString()}</p>
                    <p>Luogo: {event.location}</p>
                    <p>Categoria: {event.category}</p>
                    <p>Artisti: {event.artists.join(', ')}</p>
                    <figure>

                        <img src={event.coverImage} alt="" />
                    </figure>
                </div>
            )}
        </>
    )
}