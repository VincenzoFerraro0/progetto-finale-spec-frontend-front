import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useGlobalContext } from "../context/GlobalContext";

export default function WishlistPage() {
    const { wishList, clearWishList } = useGlobalContext();

    return (
        <div className="text-white max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center uppercase tracking-widest">
                I tuoi eventi preferiti
            </h2>

            <div className="flex justify-between items-center mb-8">
                <Link
                    to="/"
                    className="bg-white text-black font-bold py-2 px-4 rounded-full shadow hover:bg-[#008cff] hover:text-white transition duration-300 ease-in-out text-sm uppercase tracking-wider"
                >
                    Torna alla lista
                </Link>
                {wishList.length > 0 && (
                    <button
                        onClick={clearWishList}
                        className="bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow hover:bg-red-700 transition duration-300 ease-in-out text-sm uppercase tracking-wider cursor-pointer"
                    >
                        Svuota lista
                    </button>
                )}
            </div>

            {wishList.length === 0 ? (
                <p className="text-center text-gray-400 mt-12 text-lg">
                    Non hai aggiunto nessun evento ai preferiti.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishList.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
}