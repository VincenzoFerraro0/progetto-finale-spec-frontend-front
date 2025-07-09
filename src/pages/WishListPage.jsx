import EventCard from "../components/EventCard"
import { useGlobalContext } from "../context/GlobalContext"

export default function WishlistPage() {
    const { wishList, clearWishList } = useGlobalContext()

    return (
        <>
            <div className="text-white max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center tracking-wider uppercase">i tuoi eventi preferiti</h2>
                <button
                    onClick={clearWishList}
                >
                    svuota e torna alla lista
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
                    {wishList.length === 0 ? (
                        <p>non hai aggiunto nessun evento alla lista dei preferiti</p>
                    ) : (
                        wishList &&
                        wishList.map((event) => {
                            return (
                                <EventCard key={event.id} event={event} />
                            )
                        })
                    )
                    }
                </div>
            </div>

        </>
    )
}