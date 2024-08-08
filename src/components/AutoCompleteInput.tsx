import '@components/css/autocompleteInput.css';
import React, { useEffect, useRef, useState } from 'react';
interface Option {
	id: string;
	name: string;
}

interface AutoCompleteInputProps {
	inputName: string;
	options: Option[];
	onSelect: (value: string) => void; // Callback para manejar la selección
	clearInput?: boolean;
}

function AutoCompleteInput({
	inputName,
	options,
	onSelect,
	clearInput,
}: AutoCompleteInputProps) {
	const [, setInputValue] = useState<string>('');
	const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
	const inputRef = useRef<HTMLInputElement>(null);
	const optionsRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (inputRef.current === null) return;
		inputRef.current.value = '';
	}, [clearInput]);

	// Maneja el cambio en el input
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.toLowerCase();
		setInputValue(value);
		setFilteredOptions(
			options.filter(option => option.name.toLowerCase().includes(value)),
		);
	};

	// Maneja el enfoque en el input
	const handleInputFocus = () => {
		setFilteredOptions(options);
	};

	// Maneja la selección de una opción
	const handleOptionClick = (option: Option) => {
		if (inputRef.current) {
			inputRef.current.value = option.name;
			setInputValue(option.name);
		}
		setFilteredOptions([]);
		onSelect(option.id);
	};

	// Maneja clics fuera del componente
	const handleDocumentClick = (event: MouseEvent) => {
		if (
			inputRef.current &&
			optionsRef.current &&
			!inputRef.current.contains(event.target as Node) &&
			!optionsRef.current.contains(event.target as Node)
		) {
			setFilteredOptions([]);
		}
	};

	// Configura y limpia el evento de clic global
	useEffect(() => {
		document.addEventListener('click', handleDocumentClick);
		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	const renderOptions = () => (
		<div ref={optionsRef} className='options-container'>
			{filteredOptions.map((option, index) => (
				<div
					key={index}
					className='option-item'
					onClick={() => handleOptionClick(option)}
				>
					{option.name}
				</div>
			))}
		</div>
	);

	return (
		<div className='autocomplete'>
			<div className='autocomplete-input'>
				<label htmlFor={inputName}>{inputName}</label>
				<input
					id={inputName}
					type='text'
					ref={inputRef}
					placeholder={`Buscar ${inputName}`}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
				/>
				{renderOptions()}
			</div>
		</div>
	);
}

export default AutoCompleteInput;
