import '@components/css/LimitInput.css';
import { ChangeEvent, useEffect, useState } from 'react';

interface LimitInputProps {
	limit: number;
	setLimit: (value: number) => void;
}
/**
 * Componente para limitar la cantidad de elementos mostrados.
 *
 * @param {number} limit - El límite actual de elementos.
 * @param {function} setLimit - Función para actualizar el límite.
 * @return {JSX.Element} - Componente de entrada de límite.
 */
export default function LimitInput({ limit, setLimit }: LimitInputProps) {
	const [inputValue, setInputValue] = useState<string>(limit.toString());
	/**
	 * Maneja el cambio en el input asegurando que se mantenga dentro de los límites válidos.
	 * @param {ChangeEvent<HTMLInputElement>} e - Evento de cambio del input
	 */
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (value === '') {
			setInputValue('');
			return;
		}

		const parsedValue = parseInt(value, 10);
		if (!isNaN(parsedValue) && parsedValue >= 1) {
			setLimit(parsedValue);
			setInputValue(value);
		} else {
			setInputValue(limit.toString());
		}
	};
	useEffect(() => {
		setInputValue(limit.toString());
	}, [limit]);

	return (
		<div className='limit-input'>
			<label htmlFor='limit' className='limit-input__label'>
				Mostrar hasta:
			</label>
			<input
				type='number'
				id='limit'
				name='limit'
				min={1}
				value={inputValue}
				onChange={handleInputChange}
				className='limit-input__field'
			/>
		</div>
	);
}
