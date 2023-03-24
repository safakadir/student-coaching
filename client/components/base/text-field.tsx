import { useState, KeyboardEvent, useEffect } from "react"

interface TextFieldProps {
    value: string | undefined,
    placeholder?: string,
    onChange: (value: string) => void,
    onEnter?: (text: string) => void
}

const TextField: React.FC<TextFieldProps> = ({value, placeholder, onChange, onEnter}) => {

    const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(value && onEnter && e.key === 'Enter') {
            onEnter(value)
        }
    }

    return <input type="text" className="border rounded-lg bg-white shadow-xs px-3 py-2 mb-4 w-full placeholder:text-gray-400" placeholder={placeholder} 
        value={value} onChange={e => onChange(e.currentTarget.value)} 
        onKeyDown={handleSearchKeyDown} />
}

export default TextField
