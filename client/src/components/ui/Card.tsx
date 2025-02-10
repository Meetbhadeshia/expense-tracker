import React from "react"

interface CardProps {
    children: React.ReactNode
    className: string
}

const Card = ({ children }: CardProps) => {
    return (
        <div className="border rounded p-3 shadow">{ children }</div>
    )

}

export default Card
