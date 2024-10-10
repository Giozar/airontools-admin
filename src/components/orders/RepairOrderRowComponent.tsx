import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import React from 'react';

interface RowComponentProps {
	index: number;
}

const RowComponent: React.FC<RowComponentProps> = ({ index }) => {
	const [quantity, setQuantity] = React.useState('');
	const [brand, setBrand] = React.useState('');
	const [model, setModel] = React.useState('');
	const [serialNumber, setSerialNumber] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [observation, setObservation] = React.useState('');

	return (
		<>
			<td>
				<TextInput
					id={`cantidad-${index}`}
					label='Cantidad'
					value={quantity}
					placeholder='Cantidad'
					onChange={e => setQuantity(e.target.value)}
				/>
			</td>
			<td>
				<TextInput
					id={`marca-${index}`}
					label='Marca'
					value={brand}
					placeholder='Marca de herramienta'
					onChange={e => setBrand(e.target.value)}
				/>
			</td>
			<td>
				<TextInput
					id={`modelo-${index}`}
					label='Modelo'
					value={model}
					placeholder='Modelo de herramienta'
					onChange={e => setModel(e.target.value)}
				/>
			</td>
			<td>
				<TextInput
					id={`numerodeserie-${index}`}
					label='Número de serie'
					value={serialNumber}
					placeholder='Número de serie'
					onChange={e => setSerialNumber(e.target.value)}
				/>
			</td>
			<td>
				<TextAreaInput
					id={`descripcion-${index}`}
					label='Descripción'
					value={description}
					placeholder='Descripción del estado de la herramienta'
					onChange={e => setDescription(e.target.value)}
				/>
			</td>
			<td>
				<TextAreaInput
					id={`observacion-${index}`}
					label='Observación'
					value={observation}
					placeholder='Observación sobre la herramienta'
					onChange={e => setObservation(e.target.value)}
				/>
			</td>
		</>
	);
};

export default RowComponent;
