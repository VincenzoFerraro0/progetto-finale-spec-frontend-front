import { Link } from "react-router-dom"
import { GlobalContext } from "../context/GlobalContext"
import { useContext } from "react"
import LabelDetail from "../components/LabelDetail"

export default function EventsList() {
    const { events } = useContext(GlobalContext)

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-12 text-center tracking-wider uppercase">
                    prossimi eventi
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => {
                        return (
                            // Add h-full to the Link component to make it fill the grid cell height
                            <div
                                key={event.id}
                                className="border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-600 transition-all duration-300 hover:bg-gray-900/80
                                               h-full flex flex-col justify-between" // Add h-full, flex, and justify-between
                            >
                                <h3 className="text-lg lg:text-xl font-semibold mb-2 text-white uppercase tracking-wide">
                                    {event.title}
                                </h3>
                                <p className="text-gray-400 text-sm uppercase tracking-widest font-mono">
                                    {event.category}
                                </p>
                                <div className="mt-4 h-1 bg-gradient-to-l from-[#1f103d] to-[#e6007e] rounded-full"></div>
                                <LabelDetail path={`/events/${event.id}`}/>
                            </div>
                            
                        )
                    })}
                </div>
            </div>
        </div>
    )
}