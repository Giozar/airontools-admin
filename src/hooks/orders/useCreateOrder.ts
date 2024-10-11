import { useOrderProductService } from '@components/orders/useProductService';
import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';

export default function useCreateOrder() {
	const { observations, imageRaw, deliveryDate, authorizationDate, products } =
		useOrderContext();
	const { name: companyName } = useCompanyContext();
	const { name: customerName, phoneNumber } = useCustomerContext();

	const { findOrCreateProduct, isLoading, error } = useOrderProductService();

	const createOrder = async (e: Event) => {
		e.preventDefault();
		try {
			const response = await findOrCreateProduct(products[0]);
			console.log(response);
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
