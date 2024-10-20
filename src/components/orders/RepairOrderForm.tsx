import AutocompleteDebouncedSearch from '@components/commons/AutocompleteDebouncedSearch';
import DateInput from '@components/commons/DateInput';
import DynamicSizeTable from '@components/commons/DynamicSizeTable';
import ModalContent from '@components/commons/ModalContent';
import PhoneInput from '@components/commons/PhoneInput';
import SelectInput from '@components/commons/SelectInput';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import SingleImageInput from '@components/files/SingleImageInput';
import PDFIcon from '@components/svg/PDFIcon';
import { airontoolsAPI } from '@configs/api.config';
import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import useCompanies from '@hooks/companies/useCompanies';
import useCustomers from '@hooks/customers/useCustomers';
import useFetchUsers from '@hooks/users/useFetchUsers';
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
		images,
		imageRaw,
		imageRemoved,
		setImages,
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
		setCompany,
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

	const { setName: setCompanyName } = useCompanyContext();
	const {
		setName: setCustomerName,
		phoneNumber,
		setPhoneNumber,
	} = useCustomerContext();

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
		setCustomerName(initialData.customer?.name || '');
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
		setImages(initialData?.images || []);
	};

	useEffect(() => {}, [observations, authorizationDate]);

	useEffect(() => {
		resetRepairOrder();
	}, []);

	useEffect(() => {
		setData();
	}, [initialData]);

	useEffect(() => {
		console.log('Se creo con éxito para generar');
	}, [_id]);

	return (
		<form onSubmit={action}>
			<AutocompleteDebouncedSearch
				key={'procedencia'}
				label='Procedencia'
				placeholder='Empresa de procedencia'
				setValue={setCompany}
				fetchFunction={fetchCompanies}
				options={companies}
			/>
			<AutocompleteDebouncedSearch
				key={'responsable'}
				label='Responsable'
				placeholder='Empleado responsable'
				setValue={setCustomer}
				fetchFunction={fetchCustomers}
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
			<SingleImageInput
				title='Foto general de las herramientas'
				url={images.length > 0 ? images[0] : null} // Verifica si existe una imagen en la primera posición
				file={imageRaw}
				setFile={setImageRaw}
				setUrl={(value: string | null) => {
					// Si el valor es nulo, limpiamos el array, de lo contrario, actualizamos el primer valor del array
					setImages(value ? [value] : []);
				}}
				setUrlRemoved={setImageRemoved}
				urlRemoved={imageRemoved}
				key='fotos-herramientas'
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
