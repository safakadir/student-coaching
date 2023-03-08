import Layout from '@/components/layout'
import Head from 'next/head'
//import { Inter } from 'next/font/google'

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <>
  <Head>
    <title>Koçluk Bilsi Sistemi | Arel Akademi</title>
  </Head>
  <Layout>
    <div className="border rounded-2xl mx-auto max-w-lg py-1 px-3 bg-white text-center">

      <h1 className="text-3xl font-bold mb-5">HOŞGELDİNİZ</h1>
      <h3 className="text-xl font-bold">Arel Akademi</h3>
      <h4 className="text-sm mb-5">Koçluk Bilgi Sistemi</h4>
      <p className="text-sm">Uygulamamız geliştirilme aşamasındadır. Yandaki menüden yapım aşamasındaki sayfalar arasında dolaşabilirsiniz.</p>

    </div>
  </Layout>
  </>
}
