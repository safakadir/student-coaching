import menuItems from "@/constants/menu-titles"
import { ogrenciSelector } from "@/store/ogrenci-slice"
import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"

const Topbar: React.FC = () => {
    const selectedOgrenci = useSelector(ogrenciSelector)

    const router = useRouter()
    
    return <div className="relative border-b w-full h-16 shadow flex items-center px-3">
        {selectedOgrenci && <span >{selectedOgrenci?.fullname} &gt;&nbsp;</span>}
        <span className="font-bold">{menuItems[router.pathname]}</span>
    </div>
}

export default Topbar
