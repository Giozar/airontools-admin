import { ChangeEvent } from 'react';

interface SelectProps {
	title: string;
	size: number;
	onSelect: (value: number) => void;
}

function NumberSelect({ title, size, onSelect }: SelectProps) {
	// Generar un array de números del 1 al tamaño dado
	const options = Array.from({ length: size }, (_, index) => index + 1);

	// Función para manejar el cambio de valor del select
	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		if (event.target.value === '') return;

		const selectedValue = parseInt(event.target.value, 10);
		onSelect(selectedValue);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<label htmlFor='numbers' style={{ fontSize: 'small' }}>
				{title}
			</label>
			<select id='numbers' name='numbers' onChange={handleChange}>
				<option key='default' value=''>
					Por defecto
				</option>
				{options.map(number => (
					<option key={number} value={number}>
						{number}
					</option>
				))}
			</select>
		</div>
	);
}

export default NumberSelect;
