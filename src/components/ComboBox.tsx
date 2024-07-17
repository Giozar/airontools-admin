import { useState } from "react";
/*
function ComboBox({ option }: { option: string }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }
    return (
    <>
        <button onClick={toggleOpen} className='combobox'>
            <span>{option}</span>
            <span className={`icon ${isOpen ? 'animate' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
                </svg>
            </span>
        </button>
        {isOpen && (
            <ul className='comboboxOptions'>
                {["Ver", "Crear", "Actualizar", "Eliminar"].map((action, index) => (
                    <li key={index}><a href={`#${action} ${option}`}>{action} {option}</a></li>
                ))}
            </ul>
        )}
    </>
    );
}*/

function ComboBox({ option, options,onOptionSelected }: { option: string,options : string[], onOptionSelected: (selectedOption: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }
    function handleOptionClick(action: string) {
        onOptionSelected(action); 
        setIsOpen(false);
      }
    return (
    <>
        <button onClick={toggleOpen} className='combobox'>
            <span>{option}</span>
            <span className={`icon ${isOpen ? 'animate' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
                </svg>
            </span>
        </button>
        {isOpen && (
            <ul className='comboboxOptions'>
                {options.map((action, index) => (
                    <li key={index} onClick={() => handleOptionClick(action)}>
                        <a href={`#${action} ${option}`}>{action}</a>
                    </li>
                ))}
            </ul>
        )}
    </>
    );
}
export default ComboBox;