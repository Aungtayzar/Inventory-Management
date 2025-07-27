import { cloneElement, createContext, useContext, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { byPrefixAndName } from "@awesome.me/kit-902717d12c";
const ModalContext = createContext();
function Modal({ children }) {
    const [openName, setOpenName] = useState("");
    const close = () => setOpenName("");
    const open = setOpenName;
    return (
        <ModalContext.Provider value={{ openName, open, close }}>
            {children}
        </ModalContext.Provider>
    );
}

function Open({ children, opens: openName }) {
    const { open } = useContext(ModalContext);
    return cloneElement(children, { onClick: () => open(openName) });
}

function Window({ children, name }) {
    const { openName, close } = useContext(ModalContext);
    if (name !== openName) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
                <button
                    onClick={close}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-semibold"
                >
                    &times;
                </button>
                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </div>
        </div>
    );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
