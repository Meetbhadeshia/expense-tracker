import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdMenu, MdClose } from "react-icons/md";

const Menu = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Profile",
        link: "/profile"
    },
    {
        name: "Expense",
        link: "/expenses"
    },
    {
        name: "Labels",
        link: "/labels"
    }
]

const Navbar = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const moveToPage = (name: string) => {
        router.push(name)
        setIsOpen(false)
    }

    return (
        <div style={{ position: "relative", zIndex: 50 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="general-padding primary-background">

                <button className="general-button" onClick={() => moveToPage("/")}>logo</button>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: "flex", gap: "1vw" }}>
                    {
                        Menu.map((item, index) => {
                            return (
                                <button key={index} className="general-button" onClick={() => moveToPage(item.link)}>{item.name}</button>
                            )
                        })
                    }
                </div>

                {/* Mobile Menu Icon */}
                <div className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <MdClose /> : <MdMenu />}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="mobile-menu-dropdown primary-background">
                    {
                        Menu.map((item, index) => {
                            return (
                                <button key={index} className="general-button mobile-menu-button" onClick={() => moveToPage(item.link)}>{item.name}</button>
                            )
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default Navbar