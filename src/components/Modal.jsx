import { createPortal } from "react-dom"
import { forwardRef, useImperativeHandle, useRef } from 'react'

const Modal = forwardRef(function Modal({children}, ref){
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right">
                <button className="px-4 py-2 rounded-md  bg-stone-800 hover:bg-stone-950 text-stone-50">Close</button>
            </form>
        </dialog>, 
        document.getElementById("modal-root")
    );
})
//bg-stone-900/90 is tailwind's way of adding transparency
export default Modal;