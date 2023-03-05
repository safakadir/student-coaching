import menuItems from "@/constants/menu-titles"
import { useRouter } from "next/router"
import React from "react"

const Topbar: React.FC = () => {
    const router = useRouter()
    
    return <div className="relative border-b w-full h-16 shadow flex items-center">
        <span className="font-bold mx-3">{menuItems[router.pathname]}</span>
    </div>
}

export default Topbar
