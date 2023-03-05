import { ReactElement } from "react"

interface NavItemProps {
    icon?: string,
    title: string,
    children?: ReactElement<NavItemProps> | ReactElement<NavItemProps>[],
    noclick?: boolean
}

const NavItem: React.FC<NavItemProps> = ({icon, title, children, noclick=false}) => {
    return <li>
        <div className={`flex px-5 py-2 text-base ${!noclick ? 'hover:bg-gray-100 cursor-pointer' : ''}`}>
            <div className="pr-3">IC</div>
            <div className="hidden md:block">{title}</div>
        </div>
        {children && 
            <ul className="pl-6">{children}</ul>
        }
    </li>
}

export default NavItem
