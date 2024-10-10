import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import { useOtherProductContext } from '@contexts/otherProduct/OtherProductContext';
import { useRepairProductContext } from '@contexts/repairProduct/RepairProductContext';

export default function useCreateOrder() {
	const { observations, imageRaw, deliveryDate, authorizationDate } =
		useOrderContext();
	const { name: companyName } = useCompanyContext();
	const { name: customerName, phoneNumber } = useCustomerContext();

	const { quantity, serialNumber, observation } = useRepairProductContext();
	const { brand, model } = useOtherProductContext();
	const createOrder = async (e: Event) => {
		e.preventDefault();
		console.log(
			observations,
			customerName,
			phoneNumber,
			companyName,
			imageRaw,
			brand,
			model,
			quantity,
			serialNumber,
			observation,
			deliveryDate,
			authorizationDate,
		);
	};

	return { createOrder };
}
