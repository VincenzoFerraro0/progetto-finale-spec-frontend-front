import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../context/GlobalContext";

// Icone per i preferiti da FontAwesome.
// "as" per rinominare una delle due e evitare conflitti di nome.
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";


export default function BtnWishList({ event }) {

    const { addWishList, removeWishList, isInWishList } = useGlobalContext();

    // Funzione per gestire il click sul pulsante dei preferiti
    const handleWishListToggle = () => {
        if (isInWishList(event)) { 
            removeWishList(event);
        } else {
            addWishList(event);
        }
    };
    

    return (
        <button
            onClick={handleWishListToggle}
            className="absolute right-3.5 top-2.5 cursor-pointer" // Pulsante posizionato in alto a destra
            title={isInWishList(event) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"} 
        >
            <FontAwesomeIcon
                icon={isInWishList(event) ? faHeartSolid : faHeartRegular}
                className={` ${isInWishList(event) ? "text-[#e6007e]" : ""}  z-10 text-2xl hover:text-3xl`} 
            />
        </button>
    )
}