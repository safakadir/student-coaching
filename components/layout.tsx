import React, { PropsWithChildren } from "react"
import Navbar from "./navbar"
import Topbar from "./topbar"

const Layout: React.FC<PropsWithChildren> = ({children}) => {
    return <div className="flex w-full">
        <Navbar />
        <div className="w-full">
            <Topbar />
            <main>
                {children}
            </main>
        </div>
    </div>
}

export default Layout
