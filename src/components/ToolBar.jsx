import { useGlobalContext } from "../context/GlobalContext";

export default function ToolBar() {
    
    const {
        debaunceSearch,
        setSelectedCategory,
        setSortField,
        setSortOrder,
        events
    } = useGlobalContext()


    const categories = events.reduce((acc, event) => {
        if (!acc.includes(event.category)) {
            acc.push(event.category);
        }
        return acc;
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <input
                type="text"
                placeholder="Cerca evento..."
                onChange={e => debaunceSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />

            <select
                onChange={e => setSelectedCategory(e.target.value)}
                className="p-2 w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
                <option value="">Tutte le categorie</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <select
                onChange={e => setSortField(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
                <option value="title">Ordina per Titolo</option>
                <option value="category">Ordina per Categoria</option>
            </select>

            <select
                onChange={e => setSortOrder(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
                <option value="asc">A → Z</option>
                <option value="desc">Z → A</option>
            </select>
        </div>
    )
}