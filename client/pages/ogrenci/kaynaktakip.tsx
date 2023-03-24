import Layout from "@/components/layout"
import { ogrenciSelector } from "@/store/ogrenci-slice"
import Head from "next/head"
import React from "react"
import { useSelector } from "react-redux"

const KaynakTakipPage: React.FC = () => {
    const selectedOgrenci = useSelector(ogrenciSelector)

    return <>
    <Head>
        <title>{selectedOgrenci?.fullname} | Kaynak Takip</title>
    </Head>
    <Layout>
        Öğrenciye özel Kaynak Takip (Çetele) Sayfası
    </Layout>
    </>
}

export default KaynakTakipPage