import '@components/css/SelectAll.css';
interface SelectAllProps {
	currentPageCount: number;
	searchResultCount: number;
	handleSelectAll: (value: number) => void;
}
export default function SelectAll({
	currentPageCount,
	searchResultCount,
	handleSelectAll,
}: SelectAllProps) {
	return (
		<div className='select-all'>
			<h3 className='select-all__title'>Seleccionar Todos</h3>
			<div className='select-all__options'>
				<label className='select-all__option'>
					<input
						type='radio'
						name='selectAll'
						value='currentPage'
						className='select-all__input'
						onChange={() => handleSelectAll(currentPageCount)}
					/>
					<span className='select-all__label'>
						Página Actual ({currentPageCount})
					</span>
				</label>
				<label className='select-all__option'>
					<input
						type='radio'
						name='selectAll'
						value='searchResults'
						className='select-all__input'
						onChange={() => handleSelectAll(searchResultCount)}
					/>
					<span className='select-all__label'>
						Resultados de Búsqueda ({searchResultCount})
					</span>
				</label>
			</div>
		</div>
	);
}
