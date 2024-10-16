import RepairOrderForm from '@components/orders/RepairOrderForm';
import useEditOrder from '@hooks/orders/useEditOrder';
import useFetchOrder from '@hooks/orders/useFetchOrder';
import { useParams } from 'react-router-dom';

export default function EditRepairOrderPage() {
	const { editOrder } = useEditOrder();
	const { orderId } = useParams();
	const { order } = useFetchOrder({ id: orderId || '' });

	return (
		<>
			<h2>Editar orden</h2>
			<RepairOrderForm
				actionName='Editar Orden'
				action={editOrder}
				initialData={order}
			/>
		</>
	);
}
