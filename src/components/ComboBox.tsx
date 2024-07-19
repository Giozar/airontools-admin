import { useState } from "react";
import DownArrow from "./svg/DownArrow";

function ComboBox({ option, options,onOptionSelected }: { option: string,options : string[], onOptionSelected?: (selectedOption: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }
    function handleOptionClick(action: string) {
        if(onOptionSelected){
           onOptionSelected(action);
           setIsOpen(false);
        }
      }
    return (
    <>
        <button onClick={toggleOpen} className='combobox'>
            <span>{option}</span>
            <span className={`icon ${isOpen ? 'animate' : ''}`}>
                <DownArrow/>
            </span>
        </button>
        {isOpen && (
            <ul className='comboboxOptions'>
                {options.map((action, index) => (
                    <li key={index} onClick={() => handleOptionClick(action)}>
                        <span>{action}</span>
                    </li>
                ))}
            </ul>
        )}
    </>
    );
}
export default ComboBox;