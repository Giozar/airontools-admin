import '@components/css/selectShowAll.css';
import { useState } from 'react';
import CircularCheckbox from '../form/CircularCheckbox';

interface SelectShowAllProps {
	currentPageCount: number;
	searchResultCount: number;
	handleSelectAll: (value: 'clear' | 'current' | 'all') => void;
}
export default function SelectShowAll({
	currentPageCount,
	searchResultCount,
	handleSelectAll,
}: SelectShowAllProps) {
	const [isCurrentPageSelected, setIsCurrentPageSelected] = useState(false);
	const [isAllResultsSelected, setIsAllResultsSelected] = useState(false);

	const handleCheckboxChange = (type: 'clear' | 'current' | 'all') => {
		switch (type) {
			case 'current':
				if (isCurrentPageSelected) {
					handleSelectAll('clear'); // Limpiar si se desmarca.
				} else {
					handleSelectAll('current'); // Seleccionar la página actual.
				}
				setIsCurrentPageSelected(!isCurrentPageSelected);
				break;
			case 'all':
				if (isAllResultsSelected) {
					handleSelectAll('clear'); // Limpiar si se desmarca.
				} else {
					handleSelectAll('all'); // Seleccionar todos los resultados.
				}
				setIsAllResultsSelected(!isAllResultsSelected);
				break;
			default:
				break;
		}
	};
	return (
		<div className='select-show-all'>
			<CircularCheckbox
				key={`FilterAll`}
				id={`FilterAll`}
				checked={isAllResultsSelected}
				onChange={() => handleCheckboxChange('all')}
				label={`Mostrar todos (${searchResultCount})`}
			/>
			<CircularCheckbox
				key={'FilterCurrent'}
				id={'FilterCurrent'}
				checked={isCurrentPageSelected}
				onChange={() => handleCheckboxChange('current')}
				label={`Seleccionar todo (${currentPageCount})`}
			/>
		</div>
	);
}
