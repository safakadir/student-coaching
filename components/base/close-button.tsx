interface CloseButtonProps {
    className: string,
    onClick: () => void
}

const CloseButton: React.FC<CloseButtonProps> = ({className, onClick}) => {
    return <button className={"bg-gray-400 hover:bg-gray-500 text-white w-5 h-5 text-center text-xs rounded-full p-0.5 "+(className ?? '')}
                onClick={onClick}>X</button>
}

export default CloseButton
