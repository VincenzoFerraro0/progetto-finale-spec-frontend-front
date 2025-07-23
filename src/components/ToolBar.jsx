// Importa il context globale per accedere a funzioni e dati condivisi
import { useGlobalContext } from "../context/GlobalContext";

// Componente principale della toolbar per la ricerca e il filtraggio degli eventi
export default function ToolBar() {

    // Estrae dal context le funzioni e i dati necessari
    const {
        debaunceSearch,         // Funzione per la ricerca con debounce 
        setSelectedCategory,    // Imposta la categoria selezionata per il filtro
        setSortField,           // Imposta il campo per l'ordinamento (es. titolo o categoria)
        setSortOrder,           // Imposta l'ordine di ordinamento (ascendente o discendente)
        events                  // Lista degli eventi disponibili
    } = useGlobalContext()

    // Estrae le categorie uniche dagli eventi per popolare il menu a tendina delle categorie
    const categories = events.reduce((acc, event) => {
        if (!acc.includes(event.category)) {
            acc.push(event.category); // Aggiunge solo se non è già presente
        }
        return acc;
    }, []);

    // Renderizza la barra degli strumenti con input e menu a tendina
    return (
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            {/* Campo di input per cercare eventi */}
            <input
                type="text"
                placeholder="Cerca evento..."
                onChange={e => debaunceSearch(e.target.value)} // Chiama la ricerca con debounce
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />

            {/* Selezione della categoria per filtrare gli eventi */}
            <select
                onChange={e => setSelectedCategory(e.target.value)} // Imposta la categoria selezionata
                className="p-2 w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
                <option value="">Tutte le categorie</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option> // Una voce per ogni categoria unica
                ))}
            </select>

            {/* Selezione del campo per l'ordinamento degli eventi */}
            <select
                onChange={e => setSortField(e.target.value)} // Imposta il campo da usare per ordinare
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
                <option value="title">Ordina per Titolo</option>
                <option value="category">Ordina per Categoria</option>
            </select>

            {/* Selezione dell'ordine (ascendente o discendente) */}
            <select
                onChange={e => setSortOrder(e.target.value)} // Imposta la direzione dell’ordinamento
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
                <option value="asc">A → Z</option>
                <option value="desc">Z → A</option>
            </select>
        </div>
    )
}