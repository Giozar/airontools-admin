// Importing necessary components, hooks, and libraries
import TableComponent from '@components/commons/DynamicTable';
import Searchbar from '@components/search/Searchbar';
import EditIcon from '@components/svg/EditIcon';
import PDFIcon from '@components/svg/PDFIcon';
import { airontoolsAPI } from '@configs/api.config';
import useDebounce from '@hooks/search/useDebounce';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrders from './hooks/useOrders';

// Main component for displaying repair orders list
export default function RepairOrderList() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const { fetchOrders, orders } = useOrders();
	const { debouncedFetch } = useDebounce(fetchOrders, 300);
	const navigate = useNavigate();

	useEffect(() => {
		debouncedFetch(searchTerm);
	}, [searchTerm, debouncedFetch]);

	const handleEditOrder = useCallback(
		(orderId: string) => {
			navigate(`editar-orden/${orderId}`);
		},
		[navigate],
	);

	const tableData = {
		headers: ['Order No.', 'Date', 'Customer', 'Received By', 'PDF', 'Edit'],
		rows: orders
			.map(order => [
				`AT${order.control}`,
				new Date(order.createdAt).toLocaleDateString(),
				order.customer?.name || '',
				order.receivedBy?.name || '',
				<a
					key={`pdf-${order._id}`}
					target='_blank'
					href={`${airontoolsAPI}/basic-reports/repair-order/${order._id}`}
					rel='noreferrer'
				>
					<PDFIcon />
				</a>,
				<button
					key={`edit-${order._id}`}
					className='table__button table__button--edit'
					onClick={() => handleEditOrder(order._id)}
				>
					<EditIcon />
				</button>,
			])
			.reverse(),
	};

	return (
		<>
			<Searchbar searchValue={searchTerm} onSearchChange={setSearchTerm} />
			<TableComponent data={tableData} />
		</>
	);
}
