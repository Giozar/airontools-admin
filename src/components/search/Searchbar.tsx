import { ChangeEvent } from 'react';
import './searchbar.css';
interface SearchbarProps {
	searchValue: string;
	onSearchChange: (value: string) => void;
}

export default function Searchbar({
	searchValue,
	onSearchChange,
}: SearchbarProps) {
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		if (newValue.startsWith(' ')) return;
		onSearchChange(newValue);
	};

	return (
		<label className='searchbar'>
			<input
				className='searchbar__input'
				id='searchOrderBar'
				value={searchValue}
				onChange={handleInputChange}
				type='search'
				name='searchOrderBar'
				placeholder='Buscar...'
			/>
		</label>
	);
}
