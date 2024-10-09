import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useCreateOrder } from '@hooks/orders/useOrders';

export default function RepairProductForm() {
	const { order, setOrder } = useCreateOrder();
	return (
		<>
			<TextInput
				key={'cantidad'}
				id={'cantidad'}
				label={'Cantidad'}
				value={tiempoEntrega}
				placeholder={'Cantidad'}
				onChange={e => setTiempoEntrega(e.target.value)}
			/>
			,
			<TextInput
				key={'modelo'}
				id={'modelo'}
				label={'Modelo'}
				value={tiempoEntrega}
				placeholder={'Modelo de herramienta'}
				onChange={e => setTiempoEntrega(e.target.value)}
			/>
			,
			<TextInput
				key={''}
				id={'marca'}
				label={'Marca'}
				value={tiempoEntrega}
				placeholder={'Marca de herramienta'}
				onChange={e => setTiempoEntrega(e.target.value)}
			/>
			,
			<TextInput
				key={'numerodeserie'}
				id={'numerodeserie'}
				label={'Número de serie'}
				value={tiempoEntrega}
				placeholder={'Número de serie'}
				onChange={e => setTiempoEntrega(e.target.value)}
			/>
			,
			<TextAreaInput
				key={'descripcion'}
				id={'descripcion'}
				label={'Descripción'}
				value={observaciones}
				placeholder={'Descripción del estado de la herramienta'}
				onChange={e => setObservaciones(e.target.value)}
			/>
			,
			<SingleImageChange
				key={'foto'}
				title={'Foto de herramienta'}
				filePreview={rawImage ? URL.createObjectURL(rawImage) : ''}
				setFilePreview={setRawImage}
				capture={true}
			/>
			,
		</>
	);
}
