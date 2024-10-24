import '@components/css/Filters.css';
import DownArrow from '@components/svg/DownArrow';
import { useState } from 'react';

interface FiltersProps {
	currentPageCount: number;
	searchResultCount: number;
	handleFilters: (value: 'clear' | 'current' | 'all') => void;
}

export default function Filters({
	currentPageCount,
	searchResultCount,
	handleFilters,
}: FiltersProps) {
	// Estados para manejar el marcado de cada checkbox
	const [isCustomSelected, setIsCustomSelected] = useState(true);
	const [isCurrentPageSelected, setIsCurrentPageSelected] = useState(false);
	const [isAllResultsSelected, setIsAllResultsSelected] = useState(false);

	// Función para manejar los cambios en los checkboxes
	const handleCheckboxChange = (type: 'custom' | 'current' | 'all') => {
		switch (type) {
			case 'custom':
				if (isCustomSelected) {
					handleFilters('clear'); // Si ya está marcado y se desmarca, limpiamos.
				} else {
					handleFilters('clear'); // Reiniciar y aplicar lógica de personalizada según sea necesario.
				}
				setIsCustomSelected(!isCustomSelected); // Cambiar el estado del checkbox.
				break;
			case 'current':
				if (isCurrentPageSelected) {
					handleFilters('clear'); // Limpiar si se desmarca.
				} else {
					handleFilters('current'); // Seleccionar la página actual.
				}
				setIsCurrentPageSelected(!isCurrentPageSelected);
				break;
			case 'all':
				if (isAllResultsSelected) {
					handleFilters('clear'); // Limpiar si se desmarca.
				} else {
					handleFilters('all'); // Seleccionar todos los resultados.
				}
				setIsAllResultsSelected(!isAllResultsSelected);
				break;
			default:
				break;
		}
	};

	return (
		<div className='availability-filter'>
			<div className='availability-filter__relative'>
				<details className='availability-filter__details'>
					<summary className='availability-filter__summary'>
						<span className='availability-filter__text'>Selección</span>
						<span className='availability-filter__icon'>
							<DownArrow />
						</span>
					</summary>

					<div className='availability-filter__options'>
						<div className='availability-filter__box'>
							<ul className='availability-filter__list'>
								<li className='availability-filter__item'>
									<label
										htmlFor='FilterCustom'
										className='availability-filter__label'
									>
										<input
											type='checkbox'
											id='FilterCustom'
											className='availability-filter__checkbox'
											checked={isCustomSelected}
											onChange={() => handleCheckboxChange('custom')}
										/>
										<span className='availability-filter__label-text'>
											Selección personalizada
										</span>
									</label>
								</li>

								<li className='availability-filter__item'>
									<label
										htmlFor='FilterCurrent'
										className='availability-filter__label'
									>
										<input
											type='checkbox'
											id='FilterCurrent'
											className='availability-filter__checkbox'
											checked={isCurrentPageSelected}
											onChange={() => handleCheckboxChange('current')}
										/>
										<span className='availability-filter__label-text'>
											Página Actual ({currentPageCount})
										</span>
									</label>
								</li>

								<li className='availability-filter__item'>
									<label
										htmlFor='FilterAll'
										className='availability-filter__label'
									>
										<input
											type='checkbox'
											id='FilterAll'
											className='availability-filter__checkbox'
											checked={isAllResultsSelected}
											onChange={() => handleCheckboxChange('all')}
										/>
										<span className='availability-filter__label-text'>
											Resultados de Búsqueda ({searchResultCount})
										</span>
									</label>
								</li>
							</ul>
						</div>
					</div>
				</details>
			</div>
		</div>
	);
}
