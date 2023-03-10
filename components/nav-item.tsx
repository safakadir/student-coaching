import Link from "next/link"
import { useRouter } from "next/router"
import React, { createElement, ReactElement } from "react"

import menuTitles from "@/constants/menu-titles"
import { IconType } from "react-icons"

interface NavItemContentProps {
    icon?: IconType,
    title?: string
}

interface NavItemProps extends NavItemContentProps {
    href?: string,
    active?: boolean,
    children?: ReactElement<NavItemProps> | ReactElement<NavItemProps>[]
}

const NavItemContent: React.FC<NavItemContentProps> = ({icon, title}) => {
    return <>
        <div className="flex items-center justify-center md:mr-3">{icon ? createElement(icon, {size: '1.4em'}) : <span className="font-bold">&bull;</span>}</div>
        <div className="hidden md:block">{title}</div>
    </>
}

const NavItem: React.FC<NavItemProps> = ({icon, title, href, active=false, children}) => {
    const router = useRouter()

    const activeInternal = active || href===router.pathname 
    const titleInternal = title ?? (href && menuTitles[href])

    const elClassNames = `flex mx-3 mb-1 px-2 py-1 text-base rounded-md h-9 items-center
        ${!activeInternal && href ? ' hover:bg-gray-100' : ''}
        ${activeInternal ? ' bg-gray-200' : ''}`

    return <li>
        {href ?
            <Link href={href} className={elClassNames}>
                <NavItemContent icon={icon} title={titleInternal} />
            </Link>
            :
            <div className={elClassNames}>
                <NavItemContent icon={icon} title={titleInternal} />
            </div>
        }
        
        {children && 
            <ul className="md:pl-6">{children}</ul>
        }
    </li>
}

export default NavItem
