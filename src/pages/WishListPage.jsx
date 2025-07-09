import { useGlobalContext } from "../context/GlobalContext"

export default function WishlistPage() {
    const {wishList} = useGlobalContext()

    return (
        <>
            <div className="text-white max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center tracking-wider uppercase">i tuoi eventi preferiti</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
                    {wishList.length === 0 ?(
                        <p>non hai aggiunto nessun evento alla lista dei preferiti</p>
                    ) : (
                         wishList&&
                        wishList.map((e)=>{
                            return(
                                <p>{e.title}</p>
                            )
                        })
                    )
                    }
                </div>
            </div>

        </>
    )
}