import React from "react"

type ButtonProps = {
    onClick: () => void
    children: React.ReactNode
    size?: string
    variant?: string

}

const Button = ({onClick, children}: ButtonProps) => {
    return (
        <button onClick={onClick} className="bg-gray-500 text-white p-2 rounded">
            {children}
        </button>
    )
}

export default Button
