import TableComponent from '@components/commons/DynamicTable';
import Searchbar from '@components/search/Searchbar';
import EditIcon from '@components/svg/EditIcon';
import PDFIcon from '@components/svg/PDFIcon';
import { airontoolsAPI } from '@configs/api.config';
import { useNavigate } from 'react-router-dom';
import useOrders from './hooks/useOrders';

export default function RepairOrderList() {
	const { fetchOrders, orders } = useOrders({ search: '' });
	const navigate = useNavigate();

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

	return (
		<>
			<Searchbar callback={fetchOrders} />
			<TableComponent data={tableData} />
		</>
	);
}
