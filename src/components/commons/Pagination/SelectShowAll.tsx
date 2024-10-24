import { useState } from 'react';

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
		<>
			<label htmlFor='FilterAll' className='availability-filter__label'>
				<input
					type='checkbox'
					id='FilterAll'
					className='availability-filter__checkbox'
					checked={isAllResultsSelected}
					onChange={() => handleCheckboxChange('all')}
				/>
				<span className='availability-filter__label-text'>
					Mostrar todos ({searchResultCount})
				</span>
			</label>
			<label htmlFor='FilterCurrent' className='availability-filter__label'>
				<input
					type='checkbox'
					id='FilterCurrent'
					className='availability-filter__checkbox'
					checked={isCurrentPageSelected}
					onChange={() => handleCheckboxChange('current')}
				/>
				<span className='availability-filter__label-text'>
					Seleccionar todo ({currentPageCount})
				</span>
			</label>
		</>
	);
}
//Math.min(limit, totalOrders)
