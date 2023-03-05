import Image from "next/image"
import React from "react"
import NavItem from "./nav-item"

const Navbar: React.FC = ()  => {
    return <nav className="h-screen border w-16 md:w-72 xl:w-80">
        <div className="h-16 px-2 md:px-4 flex items-center mb-5 border-bottom">
            <div className="relative w-11 h-11 lg:w-12 lg:h-12">
                <Image className="" src="/logo.png" fill alt="logo" />
            </div>
            <div className="hidden md:block pl-2">
                <div className="lg:text-lg xl:text-xl font-bold">AREL AKADEMİ</div>
                <div className="text-xs xl:text-sm text-neutral-500">Koçluk Bilgi Sistemi</div>
            </div>
        </div>
        <ul>
            <NavItem title="Öğrenci İşlemleri" />
            <NavItem title="Görüşme Takvimi" />
            <NavItem title="Tüm Ödemeler" />
        </ul>

    </nav>
}

export default Navbar
