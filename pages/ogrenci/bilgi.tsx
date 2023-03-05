import Layout from "@/components/layout"
import { ogrenciSelector } from "@/store/ogrenci-slice"
import React from "react"
import { useSelector } from "react-redux"

const OgrenciBilgiPage: React.FC = () => {
    const selectedOgrenci = useSelector(ogrenciSelector)

    return <Layout>
        Öğrenci Bilgi Sayfası
        <h1 className="text-2xl font-bold">{selectedOgrenci?.name}</h1>
    </Layout>
}

export default OgrenciBilgiPage