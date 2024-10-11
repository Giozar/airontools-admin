import TableComponent from '@components/commons/DynamicTable';
import EditIcon from '@components/svg/EditIcon';
import EyeIcon from '@components/svg/EyeIcon';
import TrashIcon from '@components/svg/TrashIcon';
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
		headers: [
			'ID',
			'Fecha',
			'Tipo',
			'Cliente',
			'Recibido por',
			'Ver',
			'Editar',
			'Borrar',
		],
		rows: orders.map(order => [
			order._id,
			new Date(order.createdAt).toLocaleDateString(),
			order.orderType,
			order.customer,
			order.receivedBy,
			<button
				className='table__button table__button--view'
				key={`view-${order._id}`}
			>
				<EyeIcon />
			</button>,
			<button
				className='table__button table__button--edit'
				key={`edit-${order._id}`}
				onClick={() => {
					navigate('editar-orden');
				}}
			>
				<EditIcon />
			</button>,
			<button key={`delete-${order._id}`}>
				<TrashIcon />
			</button>,
		]),
	};

	return <TableComponent data={tableData} />;
}
