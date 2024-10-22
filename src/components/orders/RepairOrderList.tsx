// Importing necessary components, hooks, and libraries
import TableComponent from '@components/commons/DynamicTable';
import Searchbar from '@components/search/Searchbar';
import EditIcon from '@components/svg/EditIcon';
import PDFIcon from '@components/svg/PDFIcon';
import { airontoolsAPI } from '@configs/api.config';
import useDebounce from '@hooks/search/useDebounce';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrders from './hooks/useOrders';
import RepairOrderPagination from './RepairOrderPagination';

// Main component for displaying repair orders list
export default function RepairOrderList() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [checkedRows, setCheckedRows] = useState<number[]>([]);

	const { fetchOrders, orders, totalPages, setPage, limit, setLimit } =
		useOrders();
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
	// Maneja la selección/deselección de filas y checkboxes
	const handleToggleCheck = (index: number) => {
		if (checkedRows.includes(index)) {
			setCheckedRows(checkedRows.filter(i => i !== index));
		} else {
			setCheckedRows([...checkedRows, index]);
		}
	};
	const tableData = {
		headers: [
			'Order No.',
			'Fecha',
			'Cliente',
			'Recibido por',
			'PDF',
			'Editar Orden',
			'',
		],
		rows: orders.map((order, index) => [
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
			<input
				key={`check-${order._id}`}
				type='checkbox'
				name='checkOrder'
				checked={checkedRows.includes(index)} // Muestra si está seleccionado
				onChange={() => handleToggleCheck(index)} // Cambia el estado al hacer clic
			/>,
		]),
	};

	return (
		<>
			<Searchbar searchValue={searchTerm} onSearchChange={setSearchTerm} />
			<label htmlFor='limit'>Mostrar hasta: </label>
			<input
				type='number'
				name='limit'
				min={1}
				value={limit}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setLimit(parseInt(e.target.value))
				}
			/>
			<TableComponent data={tableData} setSelectedRow={handleToggleCheck} />
			<RepairOrderPagination totalPages={totalPages} setCurrentPage={setPage} />
		</>
	);
}
