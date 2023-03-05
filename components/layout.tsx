import React, { PropsWithChildren } from "react"
import Navbar from "./navbar"
import Topbar from "./topbar"

const Layout: React.FC<PropsWithChildren> = ({children}) => {
    return <div className="flex w-full">
        <Navbar />
        <div className="w-full">
            <Topbar />
            <main className="bg-slate-100 p-6 w-full h-screen">
                {children}
            </main>
        </div>
    </div>
}

export default Layout
