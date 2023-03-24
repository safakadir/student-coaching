import React, { PropsWithChildren, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { clearOgrenci } from '@/store/ogrenci-slice'

import Navbar from "./navbar"
import Topbar from "./topbar"

interface LayoutProps extends PropsWithChildren {
    className?: string
}

const Layout: React.FC<LayoutProps> = ({children, className=""}) => {
    const router = useRouter()
    const dispatch = useDispatch()
  
    useEffect(() => {
        if(!router.pathname.includes('/ogrenci/')) {
            dispatch(clearOgrenci())
        }
    }, [router.pathname])
  
    return <div className="flex w-full">
        <Navbar />
        <div className="grow overflow-hidden">
            <Topbar />
            <main className={`bg-slate-100 p-6 w-full h-screen ${className}`} >
                {children}
            </main>
        </div>
    </div>
}

export default Layout
