import RepairOrderForm from '@components/orders/RepairOrderForm';
import useEditOrder from '@hooks/orders/useEditOrder';

export default function EditRepairOrderPage() {
	const { editOrder } = useEditOrder();
	return <RepairOrderForm actionName='Editar Orden' action={editOrder} />;
}
