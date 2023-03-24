import { FormEvent, useEffect, useState } from "react"

interface SelectOption {
    value: string,
    text: string
}

interface SelectProps {
    value?: string,
    options: string[] | SelectOption[],
    onSelect: (value?: string) => void
    placeholder?: string
}

const Select: React.FC<SelectProps> = ({value, options, onSelect, placeholder="Seçiniz..."}) => {
    const [valueInternal, setValueInternal] = useState<string>()

    const handleChange = (e: FormEvent<HTMLSelectElement>) => {
        const selectedValue = e.currentTarget.value !== "" ? e.currentTarget.value : undefined
        setValueInternal(selectedValue)
        onSelect(selectedValue)
    }

    useEffect(() => {
        setValueInternal(value)
        onSelect(value)
    }, [value])

    return <select value={valueInternal} onChange={handleChange} className={"border rounded-lg bg-white shadow-xs px-2 py-2 mb-4 w-full "+(!valueInternal ? "text-gray-400" : "")}>
        <option value="">{placeholder}</option>
        {options
            .map(o => typeof o === "string" ? {text:o, value:o} : o)
            .map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
    </select>
}

export default Select
