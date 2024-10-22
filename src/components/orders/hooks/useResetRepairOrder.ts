import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';

export default function useResetRepairOrder() {
	const { resetCompany } = useCompanyContext();
	const { resetCustomer } = useCustomerContext();
	const { resetOrder } = useOrderContext();
	const resetRepairOrder = () => {
		resetCompany();
		resetCustomer();
		resetOrder();
	};

	return {
		resetRepairOrder,
	};
}
