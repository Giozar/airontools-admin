import DatalistOption from '@components/commons/DatalistOption';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';

interface RepairOrderFormProps {
	actionName: string;
	action: (e: any) => Promise<void>;
	initialData?: Partial<any>; // Datos iniciales opcionales para edición
}

export default function RepairOrderForm({
	actionName,
	action,
	initialData,
}: RepairOrderFormProps) {
	const {
		observations,
		setObservations,
		images,
		setImages,
		imageRaw,
		setImageRaw,
		deliveryDate,
		setDeliveryDate,
	} = useOrderContext();
	const { name: companyName, setName: setCompanyName } = useCompanyContext();
	const {
		name: customerName,
		setName: setCustomerName,
		phoneNumber,
		setPhoneNumber,
	} = useCustomerContext();
	return (
		<form onSubmit={action}>
			<button type='submit'>{actionName}</button>
			<DatalistOption
				id={'procedencia'}
				name={'Procedencia'}
				type='text'
				placeholder='Empresa de procedencia'
				options={['hola', 'mundo']}
				value={companyName}
				setValue={setCompanyName}
			/>
			<DatalistOption
				id={'responsable'}
				name={'Responsable'}
				type='text'
				placeholder='Responsable por parte de la empresa'
				options={['hola', 'mundo']}
				value={customerName}
				setValue={setCustomerName}
			/>
			<DatalistOption
				id={'telefono'}
				name={'Teléfono'}
				type='tel'
				placeholder='Número telefónico de la empresa'
				options={['2222-2222-2222', '3333-3333-3333']}
				value={phoneNumber}
				setValue={setPhoneNumber}
			/>
			<TextAreaInput
				id={'observaciones'}
				label={'Observaciones'}
				value={observations}
				onChange={e => setObservations(e.target.value)}
			/>
			{/* <TextInput
				id={'tiempoEntrega'}
				label={'Tiempo de entrega'}
				value={tiempoEntrega}
				placeholder={'Tiempo de entrega'}
				onChange={e => setTiempoEntrega(e.target.value)}
			/>
			*/}
			Fecha de autorización: {Date().toString()}
			<SingleImageChange
				title={'Foto general de herramientas'}
				filePreview={
					imageRaw ? URL.createObjectURL(imageRaw) : images ? images[0] : ''
				}
				setFilePreview={file => {
					if (file) setImageRaw(file);
				}}
				capture={true}
				size='large'
			/>
			<h2>Datos de la herramienta</h2>
		</form>
	);
}
