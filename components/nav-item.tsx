import { createElement, ReactElement } from "react"
import { IconType } from "react-icons"

interface NavItemProps {
    icon?: ReactElement,
    title: string,
    children?: ReactElement<NavItemProps> | ReactElement<NavItemProps>[],
    active?: boolean
    noclick?: boolean
}

const NavItem: React.FC<NavItemProps> = ({icon, title, children, active=false, noclick=false}) => {
    return <li>
        <div className={`flex mx-3 mb-1 px-3 py-1 text-base rounded-md
                            ${!active && !noclick ? ' hover:bg-gray-100 cursor-pointer' : ''}
                            ${active ? ' bg-gray-200' : ''}
                        `}>
            <div className="flex items-center justify-center pr-3 w-7">{icon ? icon : <span className="font-bold">&bull;</span>}</div>
            <div className="hidden md:block">{title}</div>
        </div>
        {children && 
            <ul className="md:pl-6">{children}</ul>
        }
    </li>
}

export default NavItem
