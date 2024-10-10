import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';

export default function useCreateOrder() {
	const {
		observations,
		setObservations,
		imageRaw,
		setImageRaw,
		deliveryDate,
		setDeliveryDate,
	} = useOrderContext();
	const { name: companyName, setName: setCompanyName } = useCompanyContext();
	const {
		name: customerName,
		setName: setCustomerName,
		phoneNumber,
		setPhoneNumber,
	} = useCustomerContext();
	const createOrder = async (e: Event) => {
		e.preventDefault();
		console.log(observations, customerName, phoneNumber, companyName);
	};

	return { createOrder };
}
