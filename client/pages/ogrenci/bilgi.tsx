import Layout from "@/components/layout"
import { ogrenciSelector } from "@/store/ogrenci-slice"
import Head from "next/head"
import React from "react"
import { useSelector } from "react-redux"

const OgrenciBilgiPage: React.FC = () => {
    const selectedOgrenci = useSelector(ogrenciSelector)

    return <>
    <Head>
        <title>{selectedOgrenci?.fullname} | Genel Bilgiler</title>
    </Head>
    <Layout>
        <h1 className="text-2xl font-bold my-7">{selectedOgrenci?.fullname}</h1>
        <h3 className="text-base my-2"><span className="font-bold">Öğrenci İletişim:</span> {selectedOgrenci?.contactPhone}</h3>
        <h3 className="text-base my-2"><span className="font-bold">Doğum Günü:</span> {selectedOgrenci?.birthDate}</h3>
        <h3 className="text-base my-2"><span className="font-bold">Okul:</span> {selectedOgrenci?.term.school}</h3>
        <h2 className="text-xl my-4"><span className="font-bold">Güncel Dönem:</span> {selectedOgrenci?.term.key}</h2>
        <h2 className="text-xl my-4"><span className="font-bold">Sınıf:</span> {selectedOgrenci?.term.grade}</h2>
        <h2 className="text-xl my-4"><span className="font-bold">Alan:</span> {selectedOgrenci?.term.field}</h2>
    </Layout>
    </>
}

export default OgrenciBilgiPage