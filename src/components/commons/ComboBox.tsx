import DownArrow from '@components/svg/DownArrow';
import { useState } from 'react';

function ComboBox({
	option,
	options,
	onOptionSelected,
}: {
	option: string;
	options: string[];
	onOptionSelected?: (selectedOption: string) => void;
}) {
	const [isOpen, setIsOpen] = useState(false);

	function toggleOpen() {
		setIsOpen(!isOpen);
	}
	function handleOptionClick(action: string) {
		if (onOptionSelected) {
			console.log(action);
			onOptionSelected(action);
			setIsOpen(false);
		}
	}
	return (
		<>
			<button onClick={toggleOpen} className='combobox'>
				<span>{option}</span>
				<span className={`icon ${isOpen ? 'animate' : ''}`}>
					<DownArrow />
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
