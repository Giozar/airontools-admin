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
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		handleSelectAll(Number(event.target.value));
	};

	return (
		<div className='select-all'>
			<select
				className='select-all__select'
				onChange={handleChange}
				defaultValue=''
			>
				<option value=''>Selección personalizada</option>
				<option value={currentPageCount}>
					Página Actual ({currentPageCount})
				</option>
				<option value={searchResultCount}>
					Resultados de Búsqueda ({searchResultCount})
				</option>
			</select>
		</div>
	);
}
