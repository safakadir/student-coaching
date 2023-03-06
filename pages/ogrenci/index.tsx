import Layout from "@/components/layout"
import React from "react"
import { useDispatch } from "react-redux";
import { setOgrenci } from "@/store/ogrenci-slice"
import { useRouter } from "next/router";
import { Ogrenci } from "@/lib/types/ogrenci-types";
import { Pagination } from "@/lib/types/pagination-types";

export async function getServerSideProps() {
    const response = await fetch('http://localhost:3000/api/ogrenci')
    return {
        props: {studentsData: await response.json()}
    }
}

interface OgrenciPageProps {
    studentsData: Pagination<Ogrenci>
}

const OgrenciPage: React.FC<OgrenciPageProps> = ({studentsData}) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const students = studentsData.data

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const student = students.find(s => s._id === e.currentTarget.value)
        if(!student) {
            console.log("Error: couldn't find clicked student")
            return
        }
        dispatch(setOgrenci(student))
        router.push('/ogrenci/bilgi')
    }

    return <Layout>
        <div className="relative overflow-x-auto w-full rounded-lg shadow grow">
            <table className="text-sm text-left text-gray-600 w-full">
                <thead className="bg-gray-50">
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
                    <tr key={s._id} className="bg-white border-b">
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
