import React from "react"

const Navbar: React.FC = ()  => {
    return <nav className="h-screen border w-16 md:w-72">
        <div className="h-14 p-3 flex items-center justify-center">
            LOGO: <span className="hidden md:visible">TITLE</span>
        </div>
        <ul className="p-3">
            <li>1st <span className="hidden md:visible">Item</span></li>
            <li>2st <span className="hidden md:visible">Item</span></li>
            <li>3st <span className="hidden md:visible">Item</span></li>
        </ul>

    </nav>
}

export default Navbar
