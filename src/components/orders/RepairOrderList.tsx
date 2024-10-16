import TableComponent from '@components/commons/DynamicTable';
import EditIcon from '@components/svg/EditIcon';
import PDFIcon from '@components/svg/PDFIcon';
import { airontoolsAPI } from '@configs/api.config';
import { Order } from '@interfaces/Order.interface';
import { getAllOrdersService } from '@services/orders/orders.service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RepairOrderList() {
	const [orders, setOrders] = useState<Order[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getOrders = async () => {
			try {
				const fetchedOrders = await getAllOrdersService();
				setOrders(fetchedOrders);
			} catch (error) {
				console.error('Error fetching orders:', error);
			}
		};
		getOrders();
	}, []);

	const tableData = {
		headers: ['No. Orden', 'Fecha', 'Cliente', 'Recibido por', 'PDF', 'Editar'],
		rows: orders
			.map(order => [
				'AT' + order.control,
				new Date(order.createdAt).toLocaleDateString(),
				order.customer?.name || '',
				order.receivedBy?.name || '',
				<a
					key={'pdf'}
					target='_blank'
					href={`${airontoolsAPI}/basic-reports/repair-order/${order._id}`}
					rel='noreferrer'
				>
					<PDFIcon />
				</a>,
				<button
					className='table__button table__button--edit'
					key={`edit-${order._id}`}
					onClick={() => {
						navigate(`editar-orden/${order._id}`);
					}}
				>
					<EditIcon />
				</button>,
			])
			.reverse(),
	};

	return <TableComponent data={tableData} />;
}
