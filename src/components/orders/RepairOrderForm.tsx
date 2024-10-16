import DatalistOption from '@components/commons/DatalistOption';
import DateInput from '@components/commons/DateInput';
import DynamicSizeTable from '@components/commons/DynamicSizeTable';
import ModalContent from '@components/commons/ModalContent';
import PhoneInput from '@components/commons/PhoneInput';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import PDFIcon from '@components/svg/PDFIcon';
import { airontoolsAPI } from '@configs/api.config';
import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import { useEffect, useState } from 'react';
import RowComponent from './RepairOrderRowComponent';
import { useOrderProduct } from './hooks/useRepairProductUpdate';
import useResetRepairOrder from './hooks/useResetRepairOrder';

interface RepairOrderFormProps {
	actionName: string;
	action: (e: any) => Promise<void>;
	initialData?: Partial<any>; // Datos iniciales opcionales para edición
}

export default function RepairOrderForm({
	actionName,
	action,
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
		quoteDeliveryTime,
		setQuoteDeliveryTime,
		deliveryRepresentative,
		setDeliveryRepresentative,
		_id,
	} = useOrderContext();

	const { resetRepairOrder } = useResetRepairOrder();

	const productsObservation = products
		.map(product => `${product.model}: ${product.observation}`)
		.filter(observation => observation !== '')
		.join('. '); // obten las observaciones de los productos

	const { name: companyName, setName: setCompanyName } = useCompanyContext();
	const {
		name: customerName,
		setName: setCustomerName,
		phoneNumber,
		setPhoneNumber,
	} = useCustomerContext();

	const { addProduct, removeProduct } = useOrderProduct(0);
	const [openModal, setOpenModal] = useState(true);
	useEffect(() => {
		// console.log(initialData);
	}, [observations, authorizationDate]);

	useEffect(() => {
		console.log('Se creo con éxito para generar');
	}, [_id]);
	return (
		<form onSubmit={action}>
			<DatalistOption
				id={'procedencia'}
				name={'Procedencia'}
				placeholder='Empresa de procedencia'
				options={['hola', 'mundo']}
				value={companyName}
				setValue={setCompanyName}
				required={true}
			/>
			<DatalistOption
				id={'responsable'}
				name={'Responsable'}
				placeholder='Responsable por parte de la empresa'
				options={['hola', 'mundo']}
				value={customerName}
				setValue={setCustomerName}
				required={true}
			/>
			<PhoneInput
				id={'telefono'}
				name={'Teléfono'}
				type='tel'
				placeholder='Número telefónico de la empresa'
				options={['2222-2222-2222', '3333-3333-3333']}
				value={phoneNumber}
				setValue={setPhoneNumber}
			/>
			<TextInput
				id={'tiempo_de_entrega_de_cotizacion'}
				label={'Tiempo de entrega de cotización'}
				placeholder={'Tiempo de entrega de cotización'}
				value={quoteDeliveryTime}
				onChange={e => setQuoteDeliveryTime(e.target.value)}
				required={true}
			/>
			<TextInput
				id={'representante_de_entrega'}
				label={'Representante de entrega'}
				placeholder={'Persona que entrega herramientas'}
				value={deliveryRepresentative}
				onChange={e => setDeliveryRepresentative(e.target.value)}
				required={true}
			/>

			{/* <TextInput
				id={'empleado_que_recibe_herramientas'}
				label={'Empleado que recibe herramientas'}
				placeholder={'Empleado que recibe herramientas'}
				value={receivedBy}
				onChange={e => setReceivedBy(e.target.value)}
			/> */}

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
				value={productsObservation}
				onChange={e => setObservations(e.target.value)}
				disabled={true}
			/>
			{false && (
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
			{false && (
				<DateInput
					label='Fecha de entrega'
					date={deliveryDate}
					setDate={setDeliveryDate}
				/>
			)}
			<button type='submit' onClick={() => setOpenModal(true)}>
				{actionName}
			</button>

			{_id && (
				<ModalContent
					isOpen={openModal}
					onClose={() => setOpenModal(false)}
					title={'Orden de reparación'}
				>
					<h2 style={{ color: 'var(--success)', textAlign: 'center' }}>
						¡Orden de reparación generada con éxito!
					</h2>
					<div>
						<a
							onClick={() => {
								resetRepairOrder();
							}}
							target='_blank'
							href={`${airontoolsAPI}/basic-reports/repair-order/${_id}`}
							rel='noreferrer'
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
						>
							Ver Orden de reparación
							<PDFIcon width={100} height={100} />
						</a>
					</div>
				</ModalContent>
			)}
		</form>
	);
}
