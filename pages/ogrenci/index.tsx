import Layout from "@/components/layout"
import React, { KeyboardEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setOgrenci } from "@/store/ogrenci-slice"
import { useRouter } from "next/router";
import { Ogrenci } from "@/lib/types/ogrenci-types";
import { Pagination } from "@/lib/types/pagination-types";

export async function getServerSideProps() {
    return {
        props: {studentsData: await fetchOgrenci('http://localhost:3000/api/ogrenci')}
    }
}

async function fetchOgrenci(url: string) {
    const response = await fetch(url)
    return await response.json()
}

interface OgrenciPageProps {
    studentsData: Pagination<Ogrenci>
}

const OgrenciPage: React.FC<OgrenciPageProps> = ({studentsData}) => {

    const [searchText, setSearchText] = useState<string>('')
    const [currentSearch, setCurrentSearch] = useState<string | undefined>(undefined)
    const [students, setStudents] = useState<Ogrenci[]>(studentsData.data)

    const dispatch = useDispatch()
    const router = useRouter()

    const handleClick = (clickedId: string) => {
        const student = students.find(s => s._id === clickedId)
        if(!student) {
            console.log("Error: couldn't find clicked student")
            return
        }
        dispatch(setOgrenci(student))
        router.push('/ogrenci/bilgi')
    }

    const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
          console.log("Search: "+e.currentTarget.value)
          setCurrentSearch(e.currentTarget.value)
        }
    }

    useEffect(() => {
        let url = 'http://localhost:3000/api/ogrenci'
        if(currentSearch) {
            url = `http://localhost:3000/api/ogrenci?search=${currentSearch}`
        }
        fetchOgrenci(url).then(response => {
            setStudents(response.data)
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
                    {students.map(s => 
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
    </Layout>
}

export default OgrenciPage
