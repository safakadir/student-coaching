import Image from "next/image"
import React from "react"
import NavItem from "./nav-item"

import { FaBook, FaCalendarAlt, FaChartBar, FaListAlt, FaMoneyBill, FaMoneyCheckAlt, FaUserFriends, FaUserGraduate } from 'react-icons/fa'


const Navbar: React.FC = ()  => {
    return <nav className="h-screen border-r w-16 md:w-72 xl:w-80 shadow-md">
        
        <div className="relative h-16 px-2 md:px-4 flex items-center mb-6 border-b shadow">
            <div className="relative w-11 h-11 lg:w-12 lg:h-12">
                <Image src="/logo.png" fill alt="logo" />
            </div>
            <div className="hidden md:block pl-2">
                <div className="lg:text-lg xl:text-xl font-bold">AREL AKADEMİ</div>
                <div className="text-xs xl:text-sm">Koçluk Bilgi Sistemi</div>
            </div>
        </div>

        <ul>
            <NavItem title="Öğrenci İşlemleri" icon={<FaListAlt />} />
            <NavItem title="Ahmet Çizmeci" icon={<FaUserGraduate />} active >
                <NavItem title="Kaynak Takibi" icon={<FaBook />} />
                <NavItem title="Deneme Analizi" icon={<FaChartBar />} active />
                <NavItem title="Görüşmeler" icon={<FaUserFriends />} />
                <NavItem title="Ödemeler" icon={<FaMoneyBill />} />
            </NavItem>
            <NavItem title="Görüşme Takvimi" icon={<FaCalendarAlt />} />
            <NavItem title="Tüm Ödemeler" icon={<FaMoneyCheckAlt />} />
        </ul>

    </nav>
}

export default Navbar
