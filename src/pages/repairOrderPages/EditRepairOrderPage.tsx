import RepairOrderForm from '@components/orders/RepairOrderForm';
import useEditOrder from '@hooks/orders/useEditOrder';
import useFetchOrder from '@hooks/orders/useFetchOrder';
import { useState } from 'react';

export default function EditRepairOrderPage() {
	const { editOrder } = useEditOrder();
	const [id] = useState(() => {
		const savedId = localStorage.getItem('OrderToEdit');
		return savedId || '';
	});
	const { order } = useFetchOrder({ id });

	return (
		<RepairOrderForm
			actionName='Editar Orden'
			action={editOrder}
			initialData={order}
		/>
	);
}
