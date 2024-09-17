import TrashIcon from '@components/svg/TrashIcon';

interface DynamicInputsProps {
	label: string;
	setValues: (values: string[]) => void; // Función para actualizar el estado externo
	values: string[]; // Array de valores
	placeholder: string;
}

const DynamicInputs = ({
	label,
	setValues,
	values,
	placeholder,
}: DynamicInputsProps) => {
	// Añadir un nuevo input vacío
	const handleAdd = () => {
		setValues([...values, '']);
	};

	// Eliminar un input específico
	const handleRemove = (index: number) => {
		setValues(values.filter((_, i) => i !== index));
	};

	// Cambiar el valor de un input específico
	const handleChange = (index: number, value: string) => {
		setValues(values.map((val, i) => (i === index ? value : val)));
	};

	return (
		<div className='dynamic-inputs'>
			<label>{label}</label>
			{values.map((value, index) => (
				<div key={index} className='input-group'>
					<input
						type='text'
						value={value}
						onChange={e => handleChange(index, e.target.value)}
						placeholder={placeholder}
					/>
					<button
						onClick={() => handleRemove(index)}
						type='button'
						className='delete'
					>
						<TrashIcon />
					</button>
				</div>
			))}
			<button onClick={handleAdd} type='button' className='add'>
				Añadir {label}
			</button>
		</div>
	);
};

export default DynamicInputs;
