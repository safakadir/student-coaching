import Layout from "@/components/layout"
import { ogrenciSelector } from "@/store/ogrenci-slice"
import Head from "next/head"
import React from "react"
import { useSelector } from "react-redux"

const DenemePage: React.FC = () => {
    const selectedOgrenci = useSelector(ogrenciSelector)

    return <>
    <Head>
        <title>{selectedOgrenci?.fullname} | Deneme Analizi</title>
    </Head>
    <Layout>
        Öğrenciye özel Deneme Analiz Sayfası
    </Layout>
    </>
}

export default DenemePage