import Image from "next/image"
import Link from "next/link"
import React from "react"
import NavItem from "./nav-item"

import { FaBook, FaCalendarAlt, FaChartBar, FaHome, FaIdCard, FaListAlt, FaMoneyBill, FaMoneyCheckAlt, FaUserFriends, FaUserGraduate } from 'react-icons/fa'
import { useRouter } from "next/router"
import { ogrenciSelector } from "@/store/ogrenci-slice"
import { useSelector } from "react-redux"

const Navbar: React.FC = ()  => {
    const router = useRouter()

    const selectedOgrenci = useSelector(ogrenciSelector)

    return <nav className="h-screen border-r w-16 md:w-72 xl:w-80">
        
        <Link href="/" className="relative h-16 px-2 md:px-4 flex items-center mb-6 border-b shadow">
            <div className="relative w-11 h-11 lg:w-12 lg:h-12">
                <Image src="/logo.png" fill alt="logo" />
            </div>
            <div className="hidden md:block pl-2">
                <div className="lg:text-lg xl:text-xl font-bold">AREL AKADEMİ</div>
                <div className="text-xs xl:text-sm">Koçluk Bilgi Sistemi</div>
            </div>
        </Link>

        <ul>
            <NavItem href="/" icon={<FaHome />} />
            <NavItem href="/ogrenci" icon={<FaListAlt />} />
            { selectedOgrenci && 
            <NavItem title={selectedOgrenci.fullname} icon={<FaUserGraduate />} active={router.pathname.includes('/ogrenci/')} >
                <NavItem href="/ogrenci/bilgi" icon={<FaIdCard />} />
                <NavItem href="/ogrenci/kaynaktakip" icon={<FaBook />} />
                <NavItem href="/ogrenci/deneme" icon={<FaChartBar />} />
                <NavItem href="/ogrenci/gorusme" icon={<FaUserFriends />} />
                <NavItem href="/ogrenci/odeme" icon={<FaMoneyBill />} />
            </NavItem>
            }
            <NavItem href="/gorusme" icon={<FaCalendarAlt />} />
            <NavItem href="/odeme" icon={<FaMoneyCheckAlt />} />
        </ul>

    </nav>
}

export default Navbar
