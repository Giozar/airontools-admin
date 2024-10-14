import RepairOrderForm from '@components/orders/RepairOrderForm';
import useCreateOrder from '@hooks/orders/useCreateOrder';

export default function CreateRepairOrderPage() {
	const { createOrder } = useCreateOrder();
	return <RepairOrderForm actionName='Guardar Orden' action={createOrder} />;
}
