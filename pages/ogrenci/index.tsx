import Layout from "@/components/layout"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setOgrenci } from "@/store/ogrenci-slice"
import { useRouter } from "next/router";
import { findAllStudents } from "@/lib/dao/ogrenci";
import { Ogrenci } from "@/lib/types/ogrenci";

export async function getServerSideProps() {
    const students = await findAllStudents()
    return {
        props: {students}
    }
}

interface OgrenciPageProps {
    students: Ogrenci[]
}

const OgrenciPage: React.FC<OgrenciPageProps> = ({students}) => {
    const dispatch = useDispatch()
    const router = useRouter()

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
        <div className="flex flex-col">
            Öğrenci İşlemleri Sayfası
            {students.map(s => 
                <button key={s._id} className="border rounded-xl hover:bg-neutral-100 bg-white text-blue-500 p-2 w-48 mt-2" onClick={handleClick} value={s._id}>{s.name} {s.surname}</button>
            )}
        </div>
    </Layout>
}

export default OgrenciPage