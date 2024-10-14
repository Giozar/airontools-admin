import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import { CustomerType } from '@interfaces/Customer.interface';
import { createCompanyService } from '@services/companies/companies.service';
import { createCustomerService } from '@services/customers/customers.service';
import { createOrderService } from '@services/orders/orders.service';

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
		setId,
	} = useOrderContext();
	const { user } = useAuthContext();
	const createdBy = user?.id;

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
				receivedBy: createdBy,
				deliveryRepresentative,
				orderStatus,
				observations: productsObservation,
				quoteDeliveryTime,
				createdBy,
			});
			setId(createdOrder._id);
			console.log(createdOrder);
		} catch (error) {
			console.log(error);
		}
	};

	return { createOrder };
}
