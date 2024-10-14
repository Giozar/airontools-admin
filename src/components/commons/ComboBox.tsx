import '@components/css/Combobox.css';
import DownArrow from '@components/svg/DownArrow';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function ComboBox({
	option,
	options,
	linkto,
	onOptionSelected,
}: {
	option: string;
	options: string[];
	linkto: string[];
	onOptionSelected?: (selectedOption: string) => void;
}) {
	const [isOpen, setIsOpen] = useState(false);

	function toggleOpen() {
		setIsOpen(!isOpen);
	}

	function handleOptionClick(action: string) {
		if (onOptionSelected) {
			onOptionSelected(action);
			setIsOpen(false);
		}
	}

	return (
		<div className='combobox-container'>
			<button onClick={toggleOpen} className='combobox'>
				<span>{option}</span>
				<span
					className={`combobox__icon ${isOpen ? 'combobox__icon--animate' : ''}`}
				>
					<DownArrow />
				</span>
			</button>
			{isOpen && (
				<ul className='combobox__options'>
					{options.map((action, index) => (
						<li
							key={index}
							className='combobox__option'
							onClick={() => handleOptionClick(action)}
						>
							<Link to={linkto[index]}>{action}</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
