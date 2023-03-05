import Layout from "@/components/layout"
import React from "react"
import { useDispatch } from "react-redux";
import { setOgrenci } from "@/store/ogrenci-slice"
import { useRouter } from "next/router";

const OgrenciPage: React.FC = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setOgrenci({name:e.currentTarget.value}))
        router.push('/ogrenci/bilgi')
    }

    const ogrenciler = [
        "Safa Kadir Tokay",
        "Ahmet Çizmeci",
        "Emre Kenan Karayalçın"
    ]

    return <Layout>
        <div className="flex flex-col">
            Öğrenci İşlemleri Sayfası
            {ogrenciler.map(o => 
                <button key={o} className="border rounded-xl hover:bg-neutral-100 bg-white text-blue-500 p-2 w-48 mt-2" onClick={handleClick} value={o}>{o}</button>
            )}
        </div>
    </Layout>
}

export default OgrenciPage