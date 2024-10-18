import { fileUpload } from '@components/files/helpers/filesUpload.helper';
import useResetRepairOrder from '@components/orders/hooks/useResetRepairOrder';
import { useAlertHelper } from '@contexts/Alert/alert.helper';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCompanyContext } from '@contexts/company/CompanyContext';
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
	const { name: companyName } = useCompanyContext();
	const { name: customerName, phoneNumber } = useCustomerContext();
	const {
		orderType,
		orderStatus,
		authorizationDate,
		products,
		quoteDeliveryTime,
		deliveryRepresentative,
		receivedBy,
		imageRaw,
		setImages,
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

	const createOrder = async (e: Event) => {
		e.preventDefault();
		if (!createdBy) throw new Error('No usuario para crear herramienta');

		try {
			const createdCompany = await createCompanyService({
				name: companyName,
				createdBy,
			});
			console.log(createdCompany);

			const createdCustomer = await createCustomerService({
				customerType: CustomerType.INDIVIDUAL,
				name: customerName,
				company: createdCompany._id,
				phoneNumber,
				createdBy,
			});
			console.log(createdCustomer);

			const createdOrder = await createOrderService({
				customer: createdCustomer._id,
				company: createdCompany._id,
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
			console.log(createdOrder);
			resetRepairOrder();
			setSuccess(true);
			setId(createdOrder._id);

			if (createdOrder?._id && imageRaw) {
				console.log('Subo archivo');
				const imageUrls = await fileUpload({
					type: 'images',
					feature: `orders/${createdOrder._id}`,
					file: imageRaw,
					setFile: setImageRaw,
					setFileUrl: (url: string) => {
						if (setImages) {
							setImages([url]);
						}
					},
				});
				imageUrls &&
					(await uploadOrderUrlImagesService({
						orderId: createdOrder._id,
						imageUrls: [imageUrls],
					}));
			}
			showSuccess('Orden creada con éxito');
		} catch (error) {
			showError('No se pudo crear la orden', error);
		}
	};

	return { createOrder };
}
