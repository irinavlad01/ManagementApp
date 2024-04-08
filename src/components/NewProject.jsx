import { useRef } from "react"
import Input from "./Input"
import Modal from "./Modal";

export default function NewProject({onCancel, onAdd}){
    const modal = useRef();
    const title = useRef('');
    const description = useRef('');
    const dueDate = useRef('');

    function handleSave(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === ''){
            modal.current.open();
            return; //the content after this if block is not executed if we do find an unvalidated input
        }

        onAdd({
            title: enteredTitle, 
            description: enteredDescription, 
            dueDate: enteredDueDate
        })
    }

    return (
        <>
        <Modal ref={modal}>
            <h2 className="font-bold text-xl text-stone-800">Invalid input</h2>
            <p className="text-stone-700 mt-2">Ooops, looks like you forgot to enter a value.</p>
            <p className="text-stone-700">Please make sure you enter a valid value in the input field.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-centered justify-end gap-4 my-4">
                <li>
                    <button 
                    className="px-3 py-2 text-stone-700 hover:text-stone-950" 
                    onClick={onCancel}>
                        Cancel
                    </button>
                </li>
                <li>
                    <button 
                    className="px-6 py-2 rounded-md  bg-stone-800 hover:bg-stone-950 text-stone-50"
                    onClick={handleSave}>
                        Save
                    </button>
                </li>
            </menu>
            <div>
                <Input type="text" label="Title" ref={title}/>
                <Input label="Description" textarea ref={description}/>
                <Input type="date" label="Due Date" ref={dueDate}/>
            </div>
        </div>
        </>
    )
}