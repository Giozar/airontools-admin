import useDebounce from '@hooks/search/useDebounce';
import { useEffect, useState } from 'react';
import AutoCompleteInput from './AutoCompleteInput';
interface AutocompleteDebouncedSearchProps {
	placeholder?: string;
	label?: string;
	fetchFunction: (searchTerm: string) => Promise<void>;
	options: any[];
	setValue: (value: string) => void;
	value: string;
}
export default function AutocompleteDebouncedSearch({
	label,
	placeholder,
	fetchFunction,
	options,
	setValue,
	value,
}: AutocompleteDebouncedSearchProps) {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [lastSearchTerm, setLastSearchTerm] = useState<string>('-');
	const { debouncedFetch } = useDebounce(fetchFunction, 300);

	useEffect(() => {
		if (lastSearchTerm !== searchTerm) {
			setLastSearchTerm(searchTerm);
			debouncedFetch(searchTerm);
		}
	}, [searchTerm, debouncedFetch]);

	// Efecto para resetear el searchTerm cuando value cambia a ''
	useEffect(() => {
		if (value === '') {
			setSearchTerm(''); // Resetea el searchTerm si el valor del padre es ''
		}
	}, [value]);

	return (
		<AutoCompleteInput
			onChange={setValue}
			options={options.map(option => ({
				id: option._id,
				name: option.name,
			}))}
			searchValue={searchTerm}
			onSearchChange={setSearchTerm}
			placeholder={placeholder}
			label={label}
		/>
	);
}
