import Link from "next/link"
import React, { createElement, ReactElement } from "react"
import { IconType } from "react-icons"

interface NavItemContentProps {
    icon?: ReactElement,
    title: string
}

interface NavItemProps extends NavItemContentProps {
    href?: string,
    active?: boolean,
    children?: ReactElement<NavItemProps> | ReactElement<NavItemProps>[]
}

const NavItemContent: React.FC<NavItemContentProps> = ({icon, title}) => {
    return <>
        <div className="flex items-center justify-center pr-3 w-7">{icon ? icon : <span className="font-bold">&bull;</span>}</div>
        <div className="hidden md:block">{title}</div>
    </>
}

const NavItem: React.FC<NavItemProps> = ({icon, title, href, active=false, children}) => {
    const elClassNames = `flex mx-3 mb-1 px-3 py-1 text-base rounded-md
        ${!active && href ? ' hover:bg-gray-100' : ''}
        ${active ? ' bg-gray-200' : ''}`

    return <li>
        {href ?
            <Link href={href} className={elClassNames}>
                <NavItemContent icon={icon} title={title} />
            </Link>
            :
            <div className={elClassNames}>
                <NavItemContent icon={icon} title={title} />
            </div>
        }
        
        {children && 
            <ul className="md:pl-6">{children}</ul>
        }
    </li>
}

export default NavItem
