import { Link } from "react-router-dom";
import BtnWishList from "./BtnWishList";
import GradientBar from "./GradientBar";


export default function ({ event }) {
    return (
        <div className="border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-600 transition-all duration-300 hover:bg-gray-900/80 h-full flex flex-col justify-between relative">
            {/* Bottone wishlist in alto a destra */}
            <BtnWishList event={event} />

            {/* Titolo dell’evento */}
            <h3 className="text-lg lg:text-xl font-semibold mb-2 mt-3 text-white uppercase tracking-wide">
                {event.title}
            </h3>

            {/* Categoria dell’evento */}
            <p className="text-gray-400 text-sm uppercase tracking-widest font-mono">
                {event.category}
            </p>

            {/* Barra decorativa sotto titolo e categoria */}
            <GradientBar />

            {/* Link per visualizzare il singolo evento */}
            <Link
                to={`/events/${event.id}`}
                className="self-center mt-4 bg-white text-black hover:bg-[#008cff] hover:text-white font-bold py-2 px-4 
                            rounded-full shadow-lg hover:shadow transition duration-300 ease-in-out
                            text-sm uppercase tracking-wider cursor-pointer"
            >
                dettagli
            </Link>
        </div>




    )
}