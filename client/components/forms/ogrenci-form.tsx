import { DeepPartial } from "@/lib/types/common"
import { Field, FIELDS, Grade, GRADES, Ogrenci } from "@/lib/types/ogrenci-types"
import { FormEvent, MouseEvent, useEffect, useState } from "react"
import Select from "../base/select"
import TextField from "../base/text-field"

interface OgrenciFormProps {
    onChange: (ogrenci: DeepPartial<Ogrenci>) => void
}

interface TestType {
    test?: string,
    extension: string
}


const OgrenciForm: React.FC<OgrenciFormProps> = ({onChange}) => {
    const [ogrenciState, setOgrenciState] = useState<DeepPartial<Ogrenci>>({term:{}})

    useEffect(() => {
        onChange(ogrenciState)
    }, [ogrenciState])

    return <form className="max-w-md">
        <h1 className="text-xl mb-5">Öğrenci Formu</h1>

        <TextField 
            value={ogrenciState.fullname} 
            onChange={(value) => setOgrenciState({...ogrenciState, fullname: value})} 
            placeholder="Öğrenci Adı Soyadı" />
        
        <TextField 
            value={ogrenciState.contactPhone} 
            onChange={(value) => setOgrenciState({...ogrenciState, contactPhone: value})} 
            placeholder="Telefon" />

        <TextField 
            value={ogrenciState.birthDate} 
            onChange={(value) => setOgrenciState({...ogrenciState, birthDate: value})} 
            placeholder="Doğum Tarihi (YYYY-AA-GG)" />

        <TextField 
            value={ogrenciState.term?.school} 
            onChange={(value) => setOgrenciState({...ogrenciState, term: {...ogrenciState.term, school: value}})} 
            placeholder="Okulu" />

        <Select 
            value={ogrenciState.term?.grade} options={GRADES}
            onSelect={(value) => setOgrenciState({...ogrenciState, term: {...ogrenciState.term, grade: value as Grade}})} 
            placeholder="Sınıfı" />

        <Select 
            value={ogrenciState.term?.field} options={FIELDS}
            onSelect={(value) => setOgrenciState({...ogrenciState, term: {...ogrenciState.term, field: value as Field}})} 
            placeholder="Alanı" />
    </form>
}

export default OgrenciForm
