import { useRef, useState } from "react"
import Modal from "./Modal";

export default function NewTask({onAdd}){
    const [enteredTask, setEnteredTask] = useState('');
    const modal = useRef();

    function handleChange(event){
     setEnteredTask(event.target.value);
    }

    function handleClick(){
        if(enteredTask.trim() === '')
        {
            modal.current.open();
            return;
        }
        onAdd(enteredTask);
        setEnteredTask('');
    }

    return(
        <>
        <Modal ref={modal}>
            <h1 className="font-bold text-xl text-stone-800">Invalid input</h1>
            <p className="text-stone-700 mt-2">Ooops, you didn't type anything. Please enter a valid task before submitting</p>
        </Modal>
        <div className="flex items-center gap-4">
            <input 
            type="text" 
            value={enteredTask}
            onChange={handleChange}
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"/>
            <button 
            onClick={handleClick}
            className="text-stone-700 hover:text-stone-950">
                Add Task
            </button>
        </div>
        </>
    )
}