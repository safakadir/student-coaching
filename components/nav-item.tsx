interface NavItemProps {
    icon?: string,
    title: string
}

const NavItem: React.FC<NavItemProps> = ({icon, title}) => {
    return <li className="flex px-5 py-2 text-base hover:bg-gray-100 cursor-pointer">
        <div className="pr-3">IC</div>
        <div className="hidden md:block">{title}</div>
    </li>
}

export default NavItem
