import { DeepPartial } from "@/lib/types/common"
import { Ogrenci } from "@/lib/types/ogrenci-types"
import { useState } from "react"
import TextField from "../base/text-field"

const OgrenciForm: React.FC = () => {
    const [ogrenciState, setOgrenciState] = useState<DeepPartial<Ogrenci>>({term:{}})
    return <form>
        <TextField 
            value={ogrenciState.fullname} 
            onChange={(value) => setOgrenciState({fullname: value, ...ogrenciState})} 
            placeholder="Öğrenci Adı Soyadı" />
        
        <TextField 
            value={ogrenciState.contactPhone} 
            onChange={(value) => setOgrenciState({contactPhone: value, ...ogrenciState})} 
            placeholder="Telefon" />

        <TextField 
            value={ogrenciState.birthDate} 
            onChange={(value) => setOgrenciState({birthDate: value, ...ogrenciState})} 
            placeholder="Doğum Tarihi (YYYY-AA-GG)" />

        <TextField 
            value={ogrenciState.term?.school} 
            onChange={(value) => setOgrenciState({term: {school: value, ...ogrenciState.term}, ...ogrenciState})} 
            placeholder="Okulu" />

        <TextField 
            value={ogrenciState.term?.grade} 
            onChange={(value) => setOgrenciState({term: {school: value, ...ogrenciState.term}, ...ogrenciState})} 
            placeholder="Okulu" />

        <TextField 
            value={ogrenciState.term?.school} 
            onChange={(value) => setOgrenciState({term: {school: value, ...ogrenciState.term}, ...ogrenciState})} 
            placeholder="Okulu" />
    </form>
}

export default OgrenciForm
