import useDebounce from '@hooks/search/useDebounce';
import { useEffect, useState } from 'react';
import AutoCompleteInput from './AutoCompleteInput';
interface AutocompleteDebouncedSearchProps {
	placeholder?: string;
	label?: string;
	fetchFunction: (searchTerm: string) => Promise<void>;
	options: any[];
	setValue: (value: string) => void;
}
export default function AutocompleteDebouncedSearch({
	label,
	placeholder,
	fetchFunction,
	options,
	setValue,
}: AutocompleteDebouncedSearchProps) {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const { debouncedFetch } = useDebounce(fetchFunction, 300);

	useEffect(() => {
		debouncedFetch(searchTerm);
	}, [searchTerm, debouncedFetch]);

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
