import { fileUpload } from '@components/files/helpers/filesUpload.helper';
import useResetRepairOrder from '@components/orders/hooks/useResetRepairOrder';
import { useAlertHelper } from '@contexts/Alert/alert.helper';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import { CustomerType } from '@interfaces/Customer.interface';
import { createCompanyService } from '@services/companies/companies.service';
import { createCustomerService } from '@services/customers/customers.service';
import {
	createOrderService,
	uploadOrderUrlImagesService,
} from '@services/orders/orders.service';

export default function useCreateOrder() {
	const { phoneNumber, customerType } = useCustomerContext();
	const {
		orderType,
		orderStatus,
		authorizationDate,
		products,
		quoteDeliveryTime,
		deliveryRepresentative,
		receivedBy,
		imageRaw,
		company,
		customer,
		setImageUrl,
		setImageRaw,
		setSuccess,
		setId,
	} = useOrderContext();
	const { user } = useAuthContext();
	const createdBy = user?.id;
	const { showSuccess, showError } = useAlertHelper();
	const { resetRepairOrder } = useResetRepairOrder();

	const productsObservation = products
		.map(product => `${product.model}: ${product.observation}`)
		.filter(observation => observation !== '')
		.join('. '); // obten las observaciones de los productos

	const isId = (part: string) => /[a-f0-9]{24}/.test(part); // Verifica si el part es un ID

	const createOrder = async (e: Event) => {
		e.preventDefault();
		if (!createdBy) throw new Error('No usuario para crear herramienta');

		try {
			let companyId = company || '';
			if (!isId(companyId) && customerType === 'Empresa') {
				const createdCompany = await createCompanyService({
					name: companyId,
					createdBy,
				});
				console.log(createdCompany);
				companyId = createdCompany._id;
			}
			let customerId = customer || '';

			if (!isId(customerId)) {
				const createdCustomer = await createCustomerService({
					...(customerType === 'Empresa'
						? { customerType: CustomerType.COMPANY }
						: { customerType: CustomerType.INDIVIDUAL }),
					name: customerId,
					...(companyId && { company: companyId }),
					phoneNumber,
					createdBy,
				});
				console.log(createdCustomer);
				customerId = createdCustomer._id;
			}

			const createdOrder = await createOrderService({
				customer: customerId,
				...(companyId && { company: companyId }),
				orderType,
				authorizationDate,
				products,
				receivedBy,
				deliveryRepresentative,
				orderStatus,
				observations: productsObservation,
				quoteDeliveryTime,
				createdBy,
			});

			if (createdOrder?._id && imageRaw) {
				console.log('Subo archivo');
				const imageUrl = await fileUpload({
					type: 'images',
					feature: `orders/${createdOrder._id}`,
					file: imageRaw,
					setFile: setImageRaw,
					setFileUrl: setImageUrl,
				});
				console.log(imageUrl);
				imageUrl &&
					(await uploadOrderUrlImagesService({
						orderId: createdOrder._id,
						imageUrl,
					}));
			}
			resetRepairOrder();
			setId(createdOrder._id);
			setSuccess(true);
			showSuccess('Orden creada con éxito');
		} catch (error) {
			showError('No se pudo crear la orden', error);
		}
	};

	return { createOrder };
}
