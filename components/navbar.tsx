import Image from "next/image"
import Link from "next/link"
import React from "react"
import NavItem from "./nav-item"

import { FaBook, FaCalendarAlt, FaChartBar, FaHome, FaListAlt, FaMoneyBill, FaMoneyCheckAlt, FaUserFriends, FaUserGraduate } from 'react-icons/fa'


const Navbar: React.FC = ()  => {
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
            <NavItem href="/" title="Anasayfa" icon={<FaHome />} />
            <NavItem href="/ogrenci" title="Öğrenci İşlemleri" icon={<FaListAlt />} />
            <NavItem title="Ahmet Çizmeci" icon={<FaUserGraduate />} active >
                <NavItem href="/ogrenci/kaynaktakip" title="Kaynak Takibi" icon={<FaBook />} />
                <NavItem href="/ogrenci/deneme" title="Deneme Analizi" icon={<FaChartBar />} active />
                <NavItem href="/ogrenci/gorusme" title="Görüşmeler" icon={<FaUserFriends />} />
                <NavItem href="/ogrenci/odeme" title="Ödemeler" icon={<FaMoneyBill />} />
            </NavItem>
            <NavItem href="/gorusme" title="Görüşme Takvimi" icon={<FaCalendarAlt />} />
            <NavItem href="/odeme" title="Tüm Ödemeler" icon={<FaMoneyCheckAlt />} />
        </ul>

    </nav>
}

export default Navbar
