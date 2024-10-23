import AutocompleteDebouncedSearch from '@components/commons/AutocompleteDebouncedSearch';
import DateInput from '@components/commons/DateInput';
import DynamicSizeTable from '@components/commons/DynamicSizeTable';
import ModalContent from '@components/commons/ModalContent';
import PhoneInput from '@components/commons/PhoneInput';
import SelectInput from '@components/commons/SelectInput';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import WebcamCapture from '@components/commons/WebcamCaptureC';
import SingleImageInput from '@components/files/SingleImageInput';
import PDFIcon from '@components/svg/PDFIcon';
import { airontoolsAPI } from '@configs/api.config';
import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import useCompanies from '@hooks/companies/useCompanies';
import useCustomers from '@hooks/customers/useCustomers';
import useFetchUsers from '@hooks/users/useFetchUsers';
import { CustomerType } from '@interfaces/Customer.interface';
import { Order } from '@interfaces/Order.interface';
import { useEffect, useState } from 'react';
import RowComponent from './RepairOrderRowComponent';
import { useOrderProduct } from './hooks/useRepairProductUpdate';
import useResetRepairOrder from './hooks/useResetRepairOrder';

interface RepairOrderFormProps {
	actionName: string;
	action: (e: any) => Promise<void>;
	initialData?: Partial<Order>; // Datos iniciales opcionales para edición
}

export default function RepairOrderForm({
	actionName,
	action,
	initialData,
}: RepairOrderFormProps) {
	const {
		observations,
		setObservations,
		imageUrl,
		imageRaw,
		imageRemoved,
		setImageUrl,
		setImageRaw,
		setImageRemoved,
		deliveryDate,
		setDeliveryDate,
		authorizationDate,
		setAuthorizationDate,
		products,
		setProducts,
		quoteDeliveryTime,
		setQuoteDeliveryTime,
		deliveryRepresentative,
		setDeliveryRepresentative,
		company,
		setCompany,
		customer,
		setCustomer,
		receivedBy,
		setReceivedBy,
		_id,
		setId,
		success,
		setSuccess,
	} = useOrderContext();

	const productsObservation = products
		.map(product => `${product.model}: ${product.observation}`)
		.filter(observation => observation !== '')
		.join('. '); // obten las observaciones de los productos

	const { /* name: companyName, */ setName: setCompanyName } =
		useCompanyContext();
	const {
		// name: customerName,
		setName: setCustomerName,
		phoneNumber,
		setPhoneNumber,
		customerType,
		setCustomerType,
	} = useCustomerContext();
	const [webcamError, setWebcamError] = useState<boolean>(false);

	const { addProduct, removeProduct } = useOrderProduct(0);
	const [openModal, setOpenModal] = useState(true);
	const { resetRepairOrder } = useResetRepairOrder();
	const { userSelectOptions } = useFetchUsers();
	// const { fetchCustomers, customers } = useCustomers();
	// const { debouncedFetch } = useDebounce(fetchCustomers, 300);
	const { fetchCompanies, companies } = useCompanies();
	const { fetchCustomers, customers } = useCustomers();

	const setData = () => {
		if (!initialData) return;
		setId(initialData._id || '');
		setProducts(initialData.products || []);
		setCustomer(initialData.customer?._id || '');
		setCustomerName(initialData.customer?.name || '');
		setCompany(initialData.company?._id || '');
		setCompanyName(initialData.company?.name || '');
		setPhoneNumber(initialData.customer?.phoneNumber || '');
		setDeliveryDate(initialData.deliveryDate || new Date());
		setQuoteDeliveryTime(initialData.quoteDeliveryTime || '');
		if (initialData.authorizationDate)
			setAuthorizationDate(new Date(initialData.authorizationDate));
		setDeliveryRepresentative(initialData.deliveryRepresentative || '');
		setCompany(initialData.company?._id || '');
		setCustomer(initialData.customer?._id || '');
		setReceivedBy(initialData.receivedBy?._id || '');
		setImageUrl(initialData?.imageUrl || '');
	};

	useEffect(() => {}, [observations, authorizationDate]);

	useEffect(() => {
		resetRepairOrder();
	}, []);

	useEffect(() => {
		setData();
	}, [initialData]);

	useEffect(() => {}, [_id]);

	const customerTypeOptions = Object.values(CustomerType).map(type => ({
		value: type,
		label: type,
	}));

	useEffect(() => {
		if (customerType === 'Individual') {
			setCompany('');
		}
	}, [customerType]);

	return (
		<form onSubmit={action}>
			<SelectInput
				id='customerTypeSelect'
				name='Tipo de entidad'
				options={customerTypeOptions}
				value={customerType}
				setValue={value => setCustomerType(value as CustomerType)}
				defaultOptionIndex={1}
				label='Selecciona un tipo de cliente'
			/>

			{customerType === 'Empresa' && (
				<AutocompleteDebouncedSearch
					label='Procedencia'
					placeholder='Empresa de procedencia'
					value={company || ''}
					setValue={setCompany}
					fetchFunction={fetchCompanies}
					options={companies}
				/>
			)}
			<AutocompleteDebouncedSearch
				key={'customer'}
				label='Responsable'
				placeholder='Cliente responsable'
				value={customer || ''}
				setValue={setCustomer}
				fetchFunction={(searchTerm: string) =>
					fetchCustomers({
						companyId: company,
						searchTerm,
						customerType,
					})
				}
				options={customers}
			/>

			<PhoneInput
				id={'telefono'}
				name={'Teléfono'}
				type='tel'
				placeholder='Número telefónico de la empresa'
				options={['2222-2222-2222', '3333-3333-3333']}
				value={phoneNumber}
				setValue={setPhoneNumber}
				required={true}
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
			<SelectInput
				id={'empleado_que_recibe_herramientas'}
				name={'Empleado que recibe herramientas'}
				label='Selecciona el empleado'
				options={userSelectOptions()}
				value={receivedBy}
				setValue={setReceivedBy}
			/>

			<h2>Datos de la herramienta</h2>
			<DynamicSizeTable
				columns={7}
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
			{webcamError && (
				<SingleImageInput
					title='Foto general de las herramientas'
					url={imageUrl} // Verifica si existe una imagen en la primera posición
					file={imageRaw}
					setFile={setImageRaw}
					setUrl={setImageUrl}
					setUrlRemoved={setImageRemoved}
					urlRemoved={imageRemoved}
					key='fotos-herramientas'
					size='large'
				/>
			)}

			<WebcamCapture setFile={setImageRaw} setError={setWebcamError} />
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

			{success && _id && (
				<ModalContent
					isOpen={openModal}
					onClose={() => {
						setOpenModal(false);
						setSuccess(false);
					}}
					title={'Orden de reparación'}
				>
					<h2 style={{ color: 'var(--success)', textAlign: 'center' }}>
						¡Orden de reparación generada con éxito!
					</h2>
					<div>
						<a
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
