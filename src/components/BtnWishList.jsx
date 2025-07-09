import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Importiamo entrambe le versioni dell'icona "faHeart" (solid e regular).
// Usiamo "as" per rinominare una delle due e evitare conflitti di nome.
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useGlobalContext } from "../context/GlobalContext";

export default function BtnWishList({ obj }) {

    const  { wishList, addWishList, removeWishList, isInWishList } = useGlobalContext();

    console.log("WishList:", wishList); // Log della wishlist per debug
    return (
        <button
            onClick={() => {
                // Gestione del click sul pulsante
                // Qui puoi implementare la logica per aggiungere/rimuovere l'evento dalla wishlist
                if (isInWishList(obj)) {
                    removeWishList(obj);
                } else {
                    addWishList(obj);
                }
            }}
            className="absolute right-3.5 top-2.5 cursor-pointer" // Pulsante posizionato in alto a destra
            title={isInWishList(obj) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
            <FontAwesomeIcon
                icon={isInWishList(obj) ? faHeartSolid : faHeartRegular}
                className={` ${isInWishList(obj) ? "text-[#e6007e]" : ""}  z-10 text-2xl hover:text-3xl` } // Icona cuore con colore rosso
            />
        </button>
    )
}