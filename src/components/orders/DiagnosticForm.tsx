import DateInput from '@components/commons/DateInput';
import ModalContent from '@components/commons/ModalContent';
import TextInput from '@components/commons/TextInput';
import PDFIcon from '@components/svg/PDFIcon';
import { airontoolsAPI } from '@configs/api.config';
import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import { Order } from '@interfaces/Order.interface';
import { useEffect, useState } from 'react';
import DiagnosticRowComponent from './DiagnosticRowComponent';
import useResetRepairOrder from './hooks/useResetRepairOrder';

interface RepairOrderFormProps {
	actionName: string;
	action: (e: any) => Promise<void>;
	initialData?: Partial<Order>; // Datos iniciales opcionales para edición
}

export default function DiagnosticForm({
	actionName,
	action,
	initialData,
}: RepairOrderFormProps) {
	const {
		observations,
		setImageUrl,
		setDeliveryDate,
		authorizationDate,
		setAuthorizationDate,
		products,
		setProducts,
		quoteDeliveryTime,
		setQuoteDeliveryTime,
		setDeliveryRepresentative,
		setCompany,
		setCustomer,
		setReceivedBy,
		_id,
		setId,
		success,
		setSuccess,
	} = useOrderContext();

	const { /* name: companyName, */ setName: setCompanyName } =
		useCompanyContext();
	const {
		// name: customerName,
		setName: setCustomerName,
		setPhoneNumber,
		customerType,
	} = useCustomerContext();

	const [openModal, setOpenModal] = useState(true);
	const { resetRepairOrder } = useResetRepairOrder();
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

	useEffect(() => {
		if (customerType === 'Individual') {
			setCompany('');
		}
	}, [customerType]);

	return (
		<form onSubmit={action}>
			<h2>Datos de la herramienta</h2>
			{products.map((_product, index) => (
				<DiagnosticRowComponent index={index} />
			))}
			{false && (
				<DateInput
					label='Fecha de autorización'
					date={authorizationDate}
					setDate={setAuthorizationDate}
				/>
			)}
			<TextInput
				id={'tiempo_de_entrega_de_cotizacion'}
				label={'Tiempo de entrega de cotización'}
				placeholder={'Tiempo de entrega de cotización, (1 semana, 1 mes...)'}
				value={quoteDeliveryTime}
				onChange={e => setQuoteDeliveryTime(e.target.value)}
				required={true}
			/>
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
					title={'Diagnóstico de herramienta'}
				>
					<h2 style={{ color: 'var(--success)', textAlign: 'center' }}>
						¡Diagnóstico guardado con éxito!
					</h2>
					<div
						style={{ display: 'flex', justifyContent: 'center', gap: '10rem' }}
					>
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
							Ver diagnostico
							<PDFIcon width={100} height={100} />
						</a>
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
							Enviar por correo
							<PDFIcon width={100} height={100} />
						</a>
					</div>
				</ModalContent>
			)}
		</form>
	);
}
