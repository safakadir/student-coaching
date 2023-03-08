import Layout from "@/components/layout"
import { ogrenciSelector } from "@/store/ogrenci-slice"
import Head from "next/head"
import React from "react"
import { useSelector } from "react-redux"

const OgrOdemePage: React.FC = () => {
    const selectedOgrenci = useSelector(ogrenciSelector)

    return <>
    <Head>
        <title>{selectedOgrenci?.fullname} | Ödemeler</title>
    </Head>
    <Layout>
        Öğrenciye özel Ödeme Sayfası
    </Layout>
    </>
}

export default OgrOdemePage