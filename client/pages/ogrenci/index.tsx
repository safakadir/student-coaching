import Layout from "@/components/layout"
import React, { MouseEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setOgrenci } from "@/store/ogrenci-slice"
import { useRouter } from "next/router";
import { Ogrenci } from "@/lib/types/ogrenci-types";
import { usePaginationApi } from "@/hooks/use-pagination-api";
import Head from "next/head";
import TextField from "@/components/base/text-field";
import CloseButton from "@/components/base/close-button";
import OgrenciForm from "@/components/forms/ogrenci-form";
import Popup from "@/components/base/popup";
import { DeepPartial } from "@/lib/types/common";
import { useMutatorApi } from "@/hooks/use-mutator-api";

const OgrenciPage: React.FC = () => {

    const [searchText, setSearchText] = useState<string>('')
    const [formPopup, setFormPopup] = useState<boolean>(false)
    const [formOgrenci, setFormOgrenci] = useState<DeepPartial<Ogrenci>>({})
    const apiResult = usePaginationApi<Ogrenci>('/api/ogrenci')
    const mutator = useMutatorApi<Ogrenci>('/api/ogrenci')
    const studentsPage = apiResult.pageResult
    const students = studentsPage?.data

    const dispatch = useDispatch()
    const router = useRouter()

    const handleClick = (clickedId: string) => {
        const student = students?.find(s => s._id === clickedId)
        if(!student) {
            console.log("Error: couldn't find clicked student")
            return
        }
        dispatch(setOgrenci(student))
        router.push('/ogrenci/bilgi')
    }

    const handleSearchEnter = (searchText: string) => {
        apiResult.search(searchText)
    }

    const handleClear = () => {
        apiResult.reset()
        setSearchText('')
    }

    const handleSave = (ogrenci: DeepPartial<Ogrenci>) => {
        mutator.create(ogrenci)
    }

    useEffect(() => {
        if(!mutator.loading && formPopup) {
            setFormPopup(false)
            apiResult.reload()
        }
    }, [mutator.loading])

    const handleOpenForm = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setFormPopup(true)
    } 

    return <>
    <Head>
        <title>Öğrenci İşlemleri</title>
    </Head>
    <Layout className="flex flex-col">
        <div className="flex justify-end">
            <button className="btn-secondary mb-3" onClick={handleOpenForm}>Yeni Öğrenci</button>
        </div>
        <div className="relative w-full">
            <TextField value={searchText} onChange={(value) => setSearchText(value)} onEnter={handleSearchEnter} 
                placeholder="Öğrenci ara..." />
            {studentsPage?.search && <CloseButton className="absolute right-0 m-2.5" onClick={handleClear} />}
        </div>
        <div className="overflow-x-auto w-full rounded-lg shadow">
            <table className="text-sm text-left text-gray-600 w-full">
                <thead className="bg-slate-200">
                    <tr>
                        <th scope="col" className="whitespace-nowrap px-6 py-4">Öğrenci Adı Soyadı</th>
                        <th scope="col" className="whitespace-nowrap px-6 py-4">İletişim</th>
                        <th scope="col" className="whitespace-nowrap px-6 py-4">Sınıfı</th>
                        <th scope="col" className="whitespace-nowrap px-6 py-4">Alanı</th>
                        <th scope="col" className="whitespace-nowrap px-6 py-4">Okulu</th>
                    </tr>
                    {apiResult.loading &&
                    <tr className="bg-gray-100 h-1.5 overflow-hidden">
                        <td colSpan={5} className="bg-blue-500 h-1.5 w-full origin-[0%_50%] animate-indeterminate"></td>
                    </tr>}
                </thead>
                <tbody>
                    {students?.map(s => 
                    <tr key={s._id} className="bg-white border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleClick(s._id)}>
                        <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium">{s.fullname}</th>
                        <td className="whitespace-nowrap px-6 py-4">{s.contactPhone}</td>
                        <td className="whitespace-nowrap px-6 py-4">{s.term.grade}</td>
                        <td className="whitespace-nowrap px-6 py-4">{s.term.field}</td>
                        <td className="whitespace-nowrap px-6 py-4">{s.term.school}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        {studentsPage &&
        <div className="flex flex-col sm:flex-row text-center sm:justify-between px-6 text-sm text-gray-400 mt-2">
            <span>{studentsPage.totalCount} kayıttan {studentsPage.offset+1}-{studentsPage.offset+studentsPage.data.length} arası</span>
            <div>
                {studentsPage.page > 1 && 
                    <a className="text-blue-400 cursor-pointer" onClick={() => apiResult.gotoPage(studentsPage.page-1)}>&lt; Önceki</a>}
                <span className="mx-2">{studentsPage.page}. sayfa</span>
                {studentsPage.page < Math.ceil(studentsPage.totalCount/studentsPage.limit) && 
                    <a className="text-blue-400 cursor-pointer" onClick={() => apiResult.gotoPage(studentsPage.page+1)}>Sonraki &gt;</a>}
            </div>
        </div>
        }
    </Layout>
    <Popup isOpen={formPopup} onClose={() => setFormPopup(false)}>
        <OgrenciForm onChange={ogrenci => setFormOgrenci(ogrenci)}/>
        {mutator.loading &&
        <div className="bg-gray-100 h-1.5 overflow-hidden">
            <div className="bg-blue-500 h-1.5 w-full origin-[0%_50%] animate-indeterminate"></div>
        </div>
        }
        <div className="flex justify-end gap-3">
            <button className="btn-secondary mt-1" onClick={() => setFormPopup(false)}>Kapat</button>
            <button className="btn-primary mt-1" onClick={() => handleSave(formOgrenci)}>Kaydet</button>
        </div>
    </Popup>
    </>
}

export default OgrenciPage
