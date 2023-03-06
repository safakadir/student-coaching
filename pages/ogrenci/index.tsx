import Layout from "@/components/layout"
import React, { KeyboardEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setOgrenci } from "@/store/ogrenci-slice"
import { useRouter } from "next/router";
import { Ogrenci } from "@/lib/types/ogrenci-types";
import { Pagination } from "@/lib/types/pagination-types";

export async function getServerSideProps() {
    return {
        props: {studentsData: await fetchOgrenci('/api/ogrenci')}
    }
}

async function fetchOgrenci(path: string): Promise<Pagination<Ogrenci>> {
    const url = process.env.BASE_API_URL+path
    const response = await fetch(url)
    return await response.json()
}

interface OgrenciPageProps {
    studentsData: Pagination<Ogrenci>
}

const OgrenciPage: React.FC<OgrenciPageProps> = ({studentsData}) => {

    const [searchText, setSearchText] = useState<string>('')
    const [currentSearch, setCurrentSearch] = useState<string | undefined>(undefined)
    const [studentsP, setStudentsP] = useState<Pagination<Ogrenci>>(studentsData)

    const dispatch = useDispatch()
    const router = useRouter()

    const handleClick = (clickedId: string) => {
        const student = studentsP.data.find(s => s._id === clickedId)
        if(!student) {
            console.log("Error: couldn't find clicked student")
            return
        }
        dispatch(setOgrenci(student))
        router.push('/ogrenci/bilgi')
    }

    const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
          setCurrentSearch(e.currentTarget.value)
        }
    }

    const handleNextPrev = (nextPrevQuery?: string) => {
        if(!nextPrevQuery) return
        const path = `/api/ogrenci?${nextPrevQuery}`
        fetchOgrenci(path).then(response => {
            setStudentsP(response)
        })
    }

    useEffect(() => {
        const path = currentSearch ? `/api/ogrenci?search=${currentSearch}` : '/api/ogrenci'

        fetchOgrenci(path).then(response => {
            setStudentsP(response)
        })
    }, [currentSearch])

    return <Layout className="flex flex-col gap-4">
        <input type="text" className="border rounded-lg bg-white shadow-xs px-3 py-2" placeholder="Öğrenci ara..." 
            value={searchText} onChange={e => setSearchText(e.currentTarget.value)} 
            onKeyDown={handleSearchKeyDown} />
        <div className=" overflow-x-auto w-full rounded-lg shadow">
            <table className="text-sm text-left text-gray-600 w-full">
                <thead className="bg-slate-200">
                    <tr>
                        <th scope="col" className="whitespace-nowrap px-6 py-4">Öğrenci Adı Soyadı</th>
                        <th scope="col" className="whitespace-nowrap px-6 py-4">İletişim</th>
                        <th scope="col" className="whitespace-nowrap px-6 py-4">Sınıfı</th>
                        <th scope="col" className="whitespace-nowrap px-6 py-4">Alanı</th>
                        <th scope="col" className="whitespace-nowrap px-6 py-4">Okulu</th>
                    </tr>
                </thead>
                <tbody>
                    {studentsP.data.map(s => 
                    <tr key={s._id} className="bg-white border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleClick(s._id)}>
                        <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium">{s.fullname}</th>
                        <td className="whitespace-nowrap px-6 py-4">{s.contactPhone}</td>
                        <td className="whitespace-nowrap px-6 py-4">{s.term.grade}</td>
                        <td className="whitespace-nowrap px-6 py-4">{s.term.field}</td>
                        <td className="whitespace-nowrap px-6 py-4">{s.term.school}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        <div className="flex justify-between px-6 text-sm text-gray-400">
            <span>{studentsP.totalCount} kayıttan {studentsP.offset+1}-{studentsP.offset+studentsP.data.length} arası</span>
            <div>
                {studentsP.page > 1 && 
                    <a className="text-blue-400 cursor-pointer" onClick={() => handleNextPrev(studentsP.prevQuery)}>&lt; Önceki</a>}
                <span className="mx-2">{studentsP.page}. sayfa</span>
                {studentsP.page < Math.ceil(studentsP.totalCount/studentsP.limit) && 
                    <a className="text-blue-400 cursor-pointer" onClick={() => handleNextPrev(studentsP.nextQuery)}>Sonraki &gt;</a>}
            </div>
        </div>
    </Layout>
}

export default OgrenciPage
