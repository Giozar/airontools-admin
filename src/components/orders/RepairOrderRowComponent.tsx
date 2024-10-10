import NumberInput from '@components/commons/NumberInput';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useOrderContext } from '@contexts/order/OrderContext';
import { RepairProduct } from '@interfaces/RepairProduct.interface';
import React from 'react';

interface RowComponentProps {
	index: number;
}

const RowComponent: React.FC<RowComponentProps> = ({ index }) => {
	const { products, setProducts } = useOrderContext();
	const product = products[index];

	const handleChange = (field: keyof RepairProduct, value: string) => {
		const newProduct = [...products];
		newProduct[index] = { ...newProduct[index], [field]: value };
		setProducts(newProduct);
	};
	const setFilePreview = (value: File | null) => {
		const newProduct = [...products];
		newProduct[index] = { ...newProduct[index], ['rawImage']: value };
		setProducts(newProduct);
	};

	return (
		<>
			<td>
				<NumberInput
					id={`cantidad-${index}`}
					label='Cantidad'
					value={product.quantity + ''}
					placeholder='Cantidad'
					onChange={e => handleChange('quantity', e.target.value)}
					min={'0'}
					max={'1000000'}
				/>
			</td>
			<td>
				<TextInput
					id={`marca-${index}`}
					label='Marca'
					value={product.brand}
					placeholder='Marca de herramienta'
					onChange={e => handleChange('brand', e.target.value)}
				/>
			</td>
			<td>
				<TextInput
					id={`modelo-${index}`}
					label='Modelo'
					value={product.model}
					placeholder='Modelo de herramienta'
					onChange={e => handleChange('model', e.target.value)}
				/>
			</td>
			<td>
				<TextInput
					id={`numerodeserie-${index}`}
					label='Número de serie'
					value={product.serialNumber || ''}
					placeholder='Número de serie'
					onChange={e => handleChange('serialNumber', e.target.value)}
				/>
			</td>
			<td>
				<TextAreaInput
					id={`descripcion-${index}`}
					label='Descripción'
					value={product.description}
					placeholder='Descripción del estado de la herramienta'
					onChange={e => handleChange('description', e.target.value)}
				/>
			</td>
			<td>
				<TextAreaInput
					id={`observacion-${index}`}
					label='Observación'
					value={product.observation || ''}
					placeholder='Observación sobre la herramienta'
					onChange={e => handleChange('observation', e.target.value)}
				/>
			</td>
			<SingleImageChange
				key={'foto'}
				title={'Foto de herramienta'}
				filePreview={
					product.rawImage ? URL.createObjectURL(product.rawImage) : ''
				}
				setFilePreview={setFilePreview}
				capture={true}
			/>
		</>
	);
};

export default RowComponent;
