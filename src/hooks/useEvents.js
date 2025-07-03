import { useEffect, useState } from "react";
// Importo la variabile salvata nel file .env
const {VITE_API_URL} = import.meta.env

export default function useEvents(){

    const [events, setEvents] = useState([])

    useEffect(()=>{
        fetch(`${VITE_API_URL}/events`)
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(error => console.error(error))
    }, [])
    return{events}
}