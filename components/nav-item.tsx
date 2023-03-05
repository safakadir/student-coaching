import { ReactElement } from "react"

interface NavItemProps {
    icon?: string,
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
            <div className="pr-3">IC</div>
            <div className="hidden md:block">{title}</div>
        </div>
        {children && 
            <ul className="pl-6">{children}</ul>
        }
    </li>
}

export default NavItem
