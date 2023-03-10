import React, { PropsWithChildren } from "react"

interface PopupProps extends PropsWithChildren {
  isOpen: boolean,
  onClose: () => void
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
    return <>{isOpen && 
        <div className="fixed inset-0 z-40 flex justify-center items-center">
            <div
                className="absolute inset-0 bg-gray-900 opacity-50"
                onClick={onClose}
            ></div>
            <div className="relative bg-white z-50 p-4 rounded-lg shadow-md">
                {children}
            </div>
        </div>
    }</>
};

export default Popup
