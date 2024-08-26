import { ChangeEvent } from 'react';

interface SelectProps {
	title: string;
	size: number;
	onSelect: (value: number) => void;
}

const NumberSelect: React.FC<SelectProps> = ({ title, size, onSelect }) => {
	// Generar un array de números del 1 al tamaño dado
	const options = Array.from({ length: size }, (_, index) => index + 1);
	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		if (event.target.value === '') return;
		const selectedValue = parseInt(event.target.value, 10);
		onSelect(selectedValue);
	};
	return (
		<>
			<label htmlFor='numbers'>{title}</label>
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
		</>
	);
};

export default NumberSelect;
