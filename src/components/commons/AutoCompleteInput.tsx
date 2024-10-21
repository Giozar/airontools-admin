import React, { useEffect, useRef, useState } from 'react';

interface Option {
	id: string; // Cambiado a string
	name: string; // Cambiado a name
}

interface AutocompleteProps {
	options: Option[]; // Cambiado de values a options
	onChange: (value: string) => void; // Cambiado a string
	searchValue: string;
	onSearchChange: (value: string) => void;
	placeholder?: string;
	label?: string;
}

export default function Autocomplete({
	options,
	onChange,
	searchValue,
	onSearchChange,
	placeholder,
	label,
}: AutocompleteProps) {
	const [displayed, setDisplayed] = useState<boolean>(false);
	const [optionFocused, setOptionFocused] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [isNewValue, setIsNewValue] = useState(false);

	const handleInputFocus = () => {
		setDisplayed(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		if (newValue.startsWith(' ')) return;
		onSearchChange(e.target.value);
		setOptionFocused(0); // Reset focused option
		setIsNewValue(false);
	};

	const handleOption = (option: Option) => {
		if (inputRef.current) {
			inputRef.current.value = option.name; // Actualiza el valor del input
		}
		onSearchChange(option.name); // Actualiza el valor de búsqueda
		onChange(option.id); // Llama a onChange con el id
		setDisplayed(false); // Cierra el menú desplegable
		setIsNewValue(false);
	};

	const handleNewOption = () => {
		if (inputRef.current) {
			inputRef.current.value = searchValue; // Actualiza el valor del input
		}
		onChange(searchValue); // Llama a onChange con el id
		setDisplayed(false); // Cierra el menú desplegable
		setIsNewValue(true);
	};

	// Maneja clics fuera del componente
	const handleDocumentClick = (event: MouseEvent) => {
		if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
			setDisplayed(false); // Cierra el menú si se hace clic fuera
		}
	};

	// Configura y limpia el evento de clic global
	useEffect(() => {
		document.addEventListener('click', handleDocumentClick);
		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (options.length === 0 && searchValue)
			if (e.key === 'Enter') handleNewOption();
		if (options.length === optionFocused && searchValue)
			if (e.key === 'Enter') handleNewOption();
		if (options.length === 0) return;
		const selectedOption = options[optionFocused];

		switch (e.key) {
			case 'ArrowUp':
				setOptionFocused(prev => Math.max(prev - 1, 0));
				break;
			case 'ArrowDown':
				setOptionFocused(prev => Math.min(prev + 1, options.length));
				break;
			case 'Enter':
				if (selectedOption) {
					handleOption(selectedOption);
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

	return (
		<div className='datalist-input' style={{ position: 'relative' }}>
			<label htmlFor={label} className='datalist-input__label'>
				{label}
			</label>
			<input
				ref={inputRef}
				value={searchValue}
				onFocus={handleInputFocus}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				className='datalist-input__input'
				required={true}
				style={{ marginBottom: '0px' }}
				placeholder={placeholder}
			/>
			{displayed && (
				<div
					style={{
						border: '1px solid #d9d9d9',
						position: 'absolute',
						top: '4rem',
						zIndex: 1000,
						width: '100%',
						maxHeight: '200px',
						overflowY: 'auto',
					}}
				>
					{options.length > 0 ? (
						<>
							{options.map((option, index) => (
								<div
									key={option.id} // Usa el id
									onMouseDown={() => handleOption(option)}
									style={{
										padding: '8px',
										backgroundColor:
											index === optionFocused
												? 'var(--accent-primary)'
												: 'var(--bg-primary)',
										cursor: 'pointer',
									}}
								>
									{option.name} {/* Muestra el name */}
								</div>
							))}
							<div
								onMouseDown={() => handleNewOption()}
								style={{
									padding: '8px',
									backgroundColor:
										options.length === optionFocused
											? 'var(--accent-primary)'
											: 'var(--bg-primary)',
								}}
							>
								¿Agregar nuevo?
							</div>
						</>
					) : (
						<div
							onMouseDown={() => handleNewOption()}
							style={{
								padding: '8px',
								backgroundColor: 'var(--accent-primary)',
							}}
						>
							No hay coincidencias, ¿Agregar nuevo?
						</div>
					)}
				</div>
			)}
			<br></br>
			<em
				style={{
					margin: '0',
					marginTop: '-0.5rem',
					color: 'var(--warning)',
					fontWeight: 'bold',
				}}
			>
				{isNewValue ? 'Se registrará como nuevo' : ''}
			</em>
		</div>
	);
}
