import { useState } from 'react'
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
        <header className='bg-white px-9 border-b-1 border-b-gray-400'>
            <nav className='flex justify-between items-center'>
                <div>
                    <figure>
                        <Link to={"/"}>
                            <img className="h-28" src={Logo} alt="" />
                        </Link>

                    </figure>
                </div>
                <div>
                    <ul className='flex gap-3 capitalize'>
                        {navItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `${isActive ? 'text-[#2B97F0]' : 'text-gray-500 hover:text-gray-700'}`
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