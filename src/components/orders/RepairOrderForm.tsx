import DatalistOption from '@components/commons/DatalistOption';
import DateInput from '@components/commons/DateInput';
import DynamicSizeTable from '@components/commons/DynamicSizeTable';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import { useEffect } from 'react';
import RowComponent from './RepairOrderRowComponent';
import { useOrderProduct } from './useRepairProductUpdate';

interface RepairOrderFormProps {
	actionName: string;
	action: (e: any) => Promise<void>;
	initialData?: Partial<any>; // Datos iniciales opcionales para edición
}

export default function RepairOrderForm({
	actionName,
	action,
	// TODO: Manejar el dato inicial si existe, initialData,
}: RepairOrderFormProps) {
	const {
		observations,
		setObservations,
		images,
		imageRaw,
		setImageRaw,
		deliveryDate,
		setDeliveryDate,
		authorizationDate,
		setAuthorizationDate,
		products,
	} = useOrderContext();

	const observation = products
		.map(product => product.observation)
		.filter(observation => observation !== '')
		.join('. '); //obten las observaciones de los productos

	const { name: companyName, setName: setCompanyName } = useCompanyContext();
	const {
		name: customerName,
		setName: setCustomerName,
		phoneNumber,
		setPhoneNumber,
	} = useCustomerContext();

	const { addProduct, removeProduct } = useOrderProduct(0);

	useEffect(() => {}, [observations, authorizationDate]);

	return (
		<form onSubmit={action}>
			<button type='submit'>{actionName}</button>
			<DatalistOption
				id={'procedencia'}
				name={'Procedencia'}
				placeholder='Empresa de procedencia'
				options={['hola', 'mundo']}
				value={companyName}
				setValue={setCompanyName}
			/>
			<DatalistOption
				id={'responsable'}
				name={'Responsable'}
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
			<h2>Datos de la herramienta</h2>
			<DynamicSizeTable
				headers={['', '', '', '', '', '', '']}
				maxRows={9}
				RowComponent={RowComponent}
				vertical={true}
				add={addProduct}
				remove={removeProduct}
			/>
			<TextAreaInput
				id={'observaciones'}
				label={'Observaciones'}
				value={observation}
				onChange={e => setObservations(e.target.value)}
			/>
			{observation && (
				<DateInput
					label='Fecha de autorización'
					date={authorizationDate}
					setDate={setAuthorizationDate}
				/>
			)}
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
			{observation && (
				<DateInput
					label='Fecha de entrega'
					date={deliveryDate}
					setDate={setDeliveryDate}
				/>
			)}
		</form>
	);
}
