// Searchbar component for entering the search term
import { type ChangeEvent } from 'react';

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
		<label htmlFor='searchOrderBar'>
			<input
				id='searchOrderBar'
				value={searchValue}
				onChange={handleInputChange}
				type='search'
				name='searchOrderBar'
				placeholder='Search...'
			/>
		</label>
	);
}
