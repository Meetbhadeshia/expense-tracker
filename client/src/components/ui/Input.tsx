import React from "react"

type InputProps = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void

}

const Input = ({value, onChange, placeholder, onKeyDown}: InputProps) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="w-full p-2 border rounded-md text-black"
        />
    )
}


export default Input
