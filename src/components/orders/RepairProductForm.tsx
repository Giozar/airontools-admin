import DynamicSizeTable from '@components/commons/DynamicSizeTable';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useOtherProductContext } from '@contexts/otherProduct/OtherProductContext';
import { useRepairProductContext } from '@contexts/repairProduct/RepairProductContext';
import RowComponent from './RepairOrderRowComponent';

export default function RepairProductForm() {
	const {
		quantity,
		setQuantity,
		serialNumber,
		setSerialNumber,
		observation,
		setObservation,
	} = useRepairProductContext();
	const { brand, setBrand, model, setModel, description, setDescription } =
		useOtherProductContext();

	return (
		<>
			<DynamicSizeTable
				headers={['', '', '', '', '', '']}
				maxRows={5}
				RowComponent={RowComponent}
				vertical={true}
			/>
			<TextInput
				key={'cantidad'}
				id={'cantidad'}
				label={'Cantidad'}
				value={quantity + ''}
				placeholder={'Cantidad'}
				onChange={e => setQuantity(parseInt(e.target.value))}
			/>

			<TextInput
				key={''}
				id={'marca'}
				label={'Marca'}
				value={brand}
				placeholder={'Marca de herramienta'}
				onChange={e => setBrand(e.target.value)}
			/>

			<TextInput
				key={'modelo'}
				id={'modelo'}
				label={'Modelo'}
				value={model}
				placeholder={'Modelo de herramienta'}
				onChange={e => setModel(e.target.value)}
			/>

			<TextInput
				key={'numerodeserie'}
				id={'numerodeserie'}
				label={'Número de serie'}
				value={serialNumber}
				placeholder={'Número de serie'}
				onChange={e => setSerialNumber(e.target.value)}
			/>

			<TextAreaInput
				key={'descripcion'}
				id={'descripcion'}
				label={'Descripción'}
				value={description}
				placeholder={'Descripción del estado de la herramienta'}
				onChange={e => setDescription(e.target.value)}
			/>

			<TextAreaInput
				key={'observacion'}
				id={'observacion'}
				label={'Observación'}
				value={observation}
				placeholder={'Descripción del estado de la herramienta'}
				onChange={e => setObservation(e.target.value)}
			/>

			{/* <SingleImageChange
				key={'foto'}
				title={'Foto de herramienta'}
				filePreview={rawImage ? URL.createObjectURL(rawImage) : ''}
				setFilePreview={setRawImage}
				capture={true}
			/> */}
		</>
	);
}
