import Layout from "@/components/layout"
import { ogrenciSelector } from "@/store/ogrenci-slice"
import Head from "next/head"
import React from "react"
import { useSelector } from "react-redux"

const OgrGorusmePage: React.FC = () => {
    const selectedOgrenci = useSelector(ogrenciSelector)

    return <>
    <Head>
        <title>{selectedOgrenci?.fullname} | Görüşmeler</title>
    </Head>
    <Layout>
        Öğrenciye özel Görüşme Sayfası
    </Layout>
    </>
}

export default OgrGorusmePage