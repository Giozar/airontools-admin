import useDebounce from '@hooks/search/useDebounce';
import React, { useEffect, useRef, useState } from 'react';

interface Option {
	id: string; // Cambiado a string
	name: string; // Cambiado a name
}

interface AutocompleteProps {
	options: Option[]; // Cambiado de values a options
	onChange: (value: string) => void; // Cambiado a string
	fetchFunc: any;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
	options,
	onChange,
	fetchFunc,
}) => {
	const [searchText, setSearchText] = useState<string>('');
	const [displayed, setDisplayed] = useState<boolean>(false);
	const [optionFocused, setOptionFocused] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { debouncedFetch } = useDebounce(fetchFunc, 300);

	useEffect(() => {
		if (searchText) {
			debouncedFetch(searchText);
		}
	}, [searchText, debouncedFetch]);

	const handleInputFocus = () => {
		setDisplayed(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
		setOptionFocused(0); // Reset focused option
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const filteredOptions = options.filter(option =>
			option.name.toLowerCase().includes(searchText.toLowerCase()),
		);

		if (filteredOptions.length === 0) return;
		const selectedOption = filteredOptions[optionFocused];

		switch (e.key) {
			case 'ArrowUp':
				setOptionFocused(prev => Math.max(prev - 1, 0));
				break;
			case 'ArrowDown':
				setOptionFocused(prev =>
					Math.min(prev + 1, filteredOptions.length - 1),
				);
				break;
			case 'Enter':
				if (selectedOption) {
					setSearchText(selectedOption.name);
					setDisplayed(false);
					onChange(selectedOption.name); // Llama a onChange con el name
				}
				break;
			case 'Escape':
				setDisplayed(false);
				break;
			default:
				if (!displayed) {
					setDisplayed(true);
				}
		}
	};

	const filteredOptions = options.filter(option =>
		option.name.toLowerCase().includes(searchText.toLowerCase()),
	);

	return (
		<div style={{ position: 'relative' }}>
			<input
				ref={inputRef}
				value={searchText}
				onFocus={handleInputFocus}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				style={{ width: '300px', padding: '8px' }}
			/>
			{displayed && (
				<div
					style={{
						border: '1px solid #d9d9d9',
						position: 'absolute',
						zIndex: 1000,
						width: '100%',
						maxHeight: '200px',
						overflowY: 'auto',
					}}
				>
					{filteredOptions.length > 0 ? (
						filteredOptions.map((option, index) => (
							<div
								key={option.id} // Usa el id
								onMouseDown={() => {
									setSearchText(option.name); // Usa name
									setDisplayed(false);
									onChange(option.name); // Llama a onChange con name
								}}
								style={{
									padding: '8px',
									backgroundColor: index === optionFocused ? 'grey' : 'black',
									cursor: 'pointer',
								}}
							>
								{option.name} {/* Muestra el name */}
							</div>
						))
					) : (
						<div style={{ padding: '8px' }}>No results found</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Autocomplete;
