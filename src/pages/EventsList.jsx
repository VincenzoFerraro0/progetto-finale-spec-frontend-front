import { Link } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext"

import LabelDetail from "../components/LabelDetail"
import ToolBar from "../components/ToolBar"

export default function EventsList() {
    const { filteredAndSortedEvents } = useGlobalContext()
    console.log('ri-rendering')

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-12 text-center tracking-wider uppercase">
                    prossimi eventi
                </h1>
                <ToolBar />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedEvents.length === 0 ? (
                        <p>Caricamento degli eventi in corso</p>
                    ) : (
                        filteredAndSortedEvents.map((event) => {
                            return (
                                <Link key={event.id} to={`/events/${event.id}`} className="cursor-default">
                                    <div
                                        className="border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-600 transition-all duration-300 hover:bg-gray-900/80 h-full flex flex-col justify-between"
                                    >
                                        <h3 className="text-lg lg:text-xl font-semibold mb-2 text-white uppercase tracking-wide">
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm uppercase tracking-widest font-mono">
                                            {event.category}
                                        </p>
                                        <div className="mt-4 h-1 bg-gradient-to-l from-[#1f103d] to-[#e6007e] rounded-full"></div>

                                        <div className="self-center mt-4">
                                            <LabelDetail
                                                text={"dettagli"}
                                            />
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

