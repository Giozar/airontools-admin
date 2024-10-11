import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import { CustomerType } from '@interfaces/Customer.interface';
import { createCustomerService } from '@services/customers/customers.service';
import { createOrderService } from '@services/orders/orders.service';

export default function useCreateOrder() {
	const {
		orderType,
		orderStatus,
		observations,
		imageRaw,
		deliveryDate,
		authorizationDate,
		products,
	} = useOrderContext();

	const { name: companyName } = useCompanyContext();
	const { name: customerName, phoneNumber } = useCustomerContext();
	// const { findOrCreateProduct } = useOrderProductService();
	const { user } = useAuthContext();
	const createdBy = user?.id;

	const createOrder = async (e: Event) => {
		e.preventDefault();
		try {
			// const response = await findOrCreateProduct(products[0]);
			// console.log(response);
			const response = await createCustomerService({
				customerType: CustomerType.INDIVIDUAL,
				name: customerName,
				phoneNumber,
				createdBy: createdBy || '',
			});
			console.log(response);
			const response2 = await createOrderService({
				customer: response._id,
				orderType,
				authorizationDate,
				products,
				receivedBy: response._id,
				deliveryRepresentative: 'Marco',
				orderStatus,
				createdBy: createdBy || '',
			});
			console.log(response2);
		} catch (error) {
			console.log(error);
		}
		console.log(
			observations,
			customerName,
			phoneNumber,
			companyName,
			imageRaw,
			deliveryDate,
			authorizationDate,
			products,
		);
	};

	return { createOrder };
}
