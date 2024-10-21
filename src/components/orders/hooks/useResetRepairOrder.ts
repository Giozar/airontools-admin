import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import { CustomerType } from '@interfaces/Customer.interface';

export default function useResetRepairOrder() {
	const { resetCompany } = useCompanyContext();
	const { resetCustomer, setCustomerType } = useCustomerContext();
	const { resetOrder } = useOrderContext();
	const resetRepairOrder = () => {
		resetCompany();
		resetCustomer();
		resetOrder();
		setCustomerType('COMPANY' as CustomerType); // valor por defecto
	};

	return {
		resetRepairOrder,
	};
}
