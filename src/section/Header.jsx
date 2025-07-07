import Logo from '../assets/img/logo.png'
import { NavLink, Link } from 'react-router-dom'
export default function Header() {

    // Percorsi pagine 
    const navItems = [
        { to: "/", text: "eventi" },
        { to: "/comparator", text: "comparatore" },
        { to: "/favorites", text: "preferiti" },
    ]

    return (
        <header className='px-9 bg-gradient-to-l from-[#1f103d] to-[#e6007e]'>
            <nav className='flex justify-between items-center'>
                <div>
                    <figure>
                        <Link to={"/"}>
                            <img className="h-30" src={Logo} alt="" />
                        </Link>

                    </figure>
                </div>
                <div>
                    <ul className='flex gap-3 capitalize font-bold'>
                        {navItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
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