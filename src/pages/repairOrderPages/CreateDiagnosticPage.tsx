import DiagnosticForm from '@components/orders/DiagnosticForm';
import useEditOrder from '@hooks/orders/useEditOrder';
import useFetchOrder from '@hooks/orders/useFetchOrder';
import { useParams } from 'react-router-dom';

export default function CreateDiagnosticPage() {
	const { editOrder } = useEditOrder();
	const { orderId } = useParams();
	const { order } = useFetchOrder({ id: orderId || '' });

	return (
		<>
			<h2>Dar Diagnóstico</h2>
			<DiagnosticForm
				actionName='Guardar Diagnóstico'
				action={editOrder}
				initialData={order}
			/>
		</>
	);
}
