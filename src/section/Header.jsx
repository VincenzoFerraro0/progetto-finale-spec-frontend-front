import Logo from '../assets/img/logo.png'
import { NavLink, Link } from 'react-router-dom'


export default function Header() {

    // Array di configurazione per i link di navigazione
    // Centralizza la gestione dei percorsi e testi del menu
    const navItems = [
        { to: "/", text: "eventi" },
        { to: "/comparator", text: "comparatore" },
        { to: "/favorites", text: "preferiti" },
    ]

    return (
        // Header sticky con gradient background e z-index elevato per rimanere sopra gli altri elementi
        <header className='px-9 bg-gradient-to-l from-[#1f103d] to-[#e6007e] sticky top-0 z-50'>
            {/* Navbar con layout flexbox per distribuzione spazio */}
            <nav className='flex justify-between items-center'>
                
                {/* Sezione logo - lato sinistro */}
                <div>
                    <figure>
                        {/* Logo cliccabile che porta alla homepage */}
                        <Link to={"/"}>
                            <img className="h-25" src={Logo} alt="" />
                        </Link>
                    </figure>
                </div>

                {/* Sezione menu di navigazione - lato destro */}
                <div>
                    {/* Lista di navigazione con styling flex */}
                    <ul className='flex gap-3 capitalize font-bold'>
                        {/* Rendering dinamico dei link di navigazione */}
                        {navItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    {/* NavLink con styling condizionale basato sullo stato attivo */}
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            // Cambia colore del testo in base allo stato attivo
                                            `${isActive ? 'text-[#008cff]' : 'text-white'}`
                                        }
                                    >
                                        {item.text}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </nav>
        </header>
    )
}