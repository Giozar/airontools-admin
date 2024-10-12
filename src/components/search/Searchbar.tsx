import useDebounce from '@hooks/search/useDebounce';
import { Search } from '@interfaces/Search.interface';
import { useState, type ChangeEvent } from 'react';

export default function Searchbar({ callback }: { callback: Function }) {
	const { debouncedSearch } = useDebounce({ callback });
	const [search, setSearch] = useState<string>('');

	function handleInput(event: ChangeEvent<HTMLInputElement>) {
		const searchValue: Search = {
			keywords: event.target.value,
		};

		if (searchValue.keywords.startsWith(' ')) return;
		setSearch(searchValue.keywords);
		debouncedSearch(searchValue.keywords);
	}

	return (
		<label htmlFor='searchProductbar'>
			<input
				id='searchProductbar'
				onInput={handleInput}
				value={search}
				type='search'
				name='searchProductbar'
				placeholder='Buscar...'
			/>
		</label>
	);
}
