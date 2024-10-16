import '@components/css/SelectInput.css';
import React from 'react';

interface SelectInputProps {
	id: string;
	name: string;
	options: { value: string; label: string }[];
	value?: string; // El valor actual seleccionado (puede ser indefinido)
	label?: string; // Texto del placeholder cuando no se ha seleccionado nada
	setValue: (value: string) => void; // Función para actualizar el valor seleccionado
	defaultOptionIndex?: number; // Índice de la opción por defecto si no hay ningún valor asignado
}

/**
 * Componente reutilizable `SelectInput` que permite la selección de una opción dentro de un conjunto de opciones predefinidas.
 *
 * @param {string} id - Identificador único del elemento `<select>`. Usado para vincular el `label` con el `select`.
 * @param {string} name - Texto que se mostrará en el `label` del campo de selección.
 * @param {Array<{value: string, label: string}>} options - Lista de opciones a mostrar en el menú desplegable, donde cada opción tiene un valor (`value`) y un texto descriptivo (`label`).
 * @param {string} [value] - El valor actualmente seleccionado. Si no se pasa, será indefinido hasta que el usuario seleccione una opción.
 * @param {string} [label] - Texto del placeholder que se muestra cuando no hay una opción seleccionada. Si no se proporciona, el valor por defecto es "Selecciona una opción".
 * @param {(value: string) => void} setValue - Función que se invoca cuando se selecciona una opción, actualizando el valor seleccionado.
 * @param {number} [defaultOptionIndex] - Índice opcional que indica cuál de las opciones debe estar seleccionada por defecto si no se ha proporcionado un valor inicial. Si no se pasa, no se seleccionará ninguna opción por defecto.
 *
 * @returns {JSX.Element} Un campo `select` con las opciones proporcionadas y un `label` asociado.
 */

const SelectInput: React.FC<SelectInputProps> = ({
	id,
	name,
	options,
	value,
	label,
	setValue,
	defaultOptionIndex,
}) => {
	// Al cambiar la selección, actualiza el valor seleccionado
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setValue(e.target.value);
	};

	// Si no se ha proporcionado un valor y hay un defaultOptionIndex válido, selecciona esa opción
	const selectedValue =
		value ||
		(defaultOptionIndex !== undefined && options[defaultOptionIndex]?.value) ||
		'';

	return (
		<div className='select-input'>
			<label htmlFor={id} className='select-input__label'>
				{name}
			</label>
			<select
				id={id}
				value={selectedValue}
				onChange={handleChange}
				className='select-input__select'
			>
				{/* Placeholder cuando no hay selección */}
				<option value=''>{label || 'Selecciona una opción'}</option>

				{/* Mapear las opciones disponibles */}
				{options.map(option => (
					<option
						key={option.value}
						value={option.value}
						className='select-input__option'
					>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;
