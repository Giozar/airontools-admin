import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import { CustomerType } from '@interfaces/Customer.interface';
import { createCustomerService } from '@services/customers/customers.service';
import { createOrderService } from '@services/orders/orders.service';

export default function useCreateOrder() {
	const { orderType, orderStatus, authorizationDate, products } =
		useOrderContext();

	const { name: customerName, phoneNumber } = useCustomerContext();
	const { user } = useAuthContext();
	const createdBy = user?.id;

	const createOrder = async (e: Event) => {
		e.preventDefault();
		try {
			const createdCustomer = await createCustomerService({
				customerType: CustomerType.INDIVIDUAL,
				name: customerName,
				phoneNumber,
				createdBy: createdBy || '',
			});
			console.log(createdCustomer);

			const createdOrder = await createOrderService({
				customer: createdCustomer._id,
				orderType,
				authorizationDate,
				products,
				receivedBy: createdCustomer._id,
				deliveryRepresentative: 'Marco',
				orderStatus,
				createdBy: createdBy || '',
			});
			console.log(createdOrder);
		} catch (error) {
			console.log(error);
		}
	};

	return { createOrder };
}
