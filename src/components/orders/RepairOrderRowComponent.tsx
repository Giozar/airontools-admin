import NumberInput from '@components/commons/NumberInput';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useOrderProduct } from './hooks/useRepairProductUpdate';

interface RowComponentProps {
	index: number;
}

const RowComponent = ({ index }: RowComponentProps) => {
	const { updateProduct, product } = useOrderProduct(index);
	if (!product) return;
	const {
		quantity,
		brand,
		model,
		serialNumber,
		description,
		observation,
		rawImage,
	} = product;

	return (
		<>
			<td>
				<NumberInput
					id={`cantidad-${index}`}
					label='Cantidad'
					value={quantity}
					placeholder='Cantidad'
					onChange={e => updateProduct({ quantity: parseInt(e.target.value) })}
					min={'0'}
					max={'1000000'}
					required={true}
				/>
			</td>
			<td>
				<TextInput
					id={`marca-${index}`}
					label='Marca'
					value={brand}
					placeholder='Marca de herramienta'
					onChange={e => updateProduct({ brand: e.target.value })}
					required={true}
				/>
			</td>
			<td>
				<TextInput
					id={`modelo-${index}`}
					label='Modelo'
					value={model}
					placeholder='Modelo de herramienta'
					onChange={e => updateProduct({ model: e.target.value })}
					required={true}
				/>
			</td>
			<td>
				<TextInput
					id={`numerodeserie-${index}`}
					label='Número de serie'
					value={serialNumber || ''}
					placeholder='Número de serie'
					onChange={e => updateProduct({ serialNumber: e.target.value })}
				/>
			</td>
			<td>
				<TextAreaInput
					id={`descripcion-${index}`}
					label='Descripción'
					value={description}
					placeholder='Descripción del estado de la herramienta'
					onChange={e => updateProduct({ description: e.target.value })}
				/>
			</td>
			<td>
				<TextAreaInput
					id={`observacion-${index}`}
					label='Observación'
					value={observation || ''}
					placeholder='Observación sobre la herramienta'
					onChange={e => updateProduct({ observation: e.target.value })}
				/>
			</td>
			<td>
				<SingleImageChange
					title='Foto de herramienta'
					filePreview={rawImage ? URL.createObjectURL(rawImage) : ''}
					setFilePreview={file => updateProduct({ rawImage: file })}
					capture={true}
				/>
			</td>
		</>
	);
};

export default RowComponent;
