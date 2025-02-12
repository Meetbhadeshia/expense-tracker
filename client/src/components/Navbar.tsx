import React from 'react'
import { useRouter } from 'next/navigation'

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
        name: "Add expense",
        link: "/expenses"
    },
    // {
    //     name: "Cash",
    //     link: "/"
    // }
]

const Navbar = () => {
    const router = useRouter()
    const moveToPage = (name: string) => {
        router.push(name)
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }} className="general-padding primary-background">

                <button className="general-button" onClick={() => moveToPage("/")}>logo</button>
                <div style={{ display: "flex", gap: "1vw" }}>
                    {
                        Menu.map((item, index) => {
                            return (
                                <button key={index} className="general-button" onClick={() => moveToPage(item.link)}>{item.name}</button>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar