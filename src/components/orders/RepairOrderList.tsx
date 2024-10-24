// Importing necessary components, hooks, and libraries
import DownloadButtons from '@components/commons/DownloadButtons';
import TableComponent, { CellColor } from '@components/commons/DynamicTable';
import CircularCheckbox from '@components/commons/form/CircularCheckbox';
import LimitInput from '@components/commons/Pagination/LimitInput';
import Pagination from '@components/commons/Pagination/Pagination';
import SelectShowAll from '@components/commons/Pagination/SelectShowAll';
import Searchbar from '@components/search/Searchbar';
import PDFIcon from '@components/svg/PDFIcon';
import { airontoolsAPI } from '@configs/api.config';
import useDebounce from '@hooks/search/useDebounce';
import { useEffect, useState } from 'react';
import useOrders from './hooks/useOrders';
import './repairOrderlist.css';
// Main component for displaying repair orders list
export default function RepairOrderList() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [checkedRows, setCheckedRows] = useState<string[]>([]);
	const {
		fetchOrders,
		orders,
		totalOrders,
		totalPages,
		setPage,
		limit,
		setLimit,
	} = useOrders();
	const { debouncedFetch } = useDebounce(fetchOrders, 300);

	useEffect(() => {
		debouncedFetch(searchTerm);
	}, [searchTerm, debouncedFetch]);
	useEffect(() => {
		setCheckedRows([]);
	}, [limit]);
	// Maneja la selección/deselección de filas y checkboxes
	const handleToggleCheck = (orderId: string) => {
		if (checkedRows.includes(orderId)) {
			setCheckedRows(checkedRows.filter(id => id !== orderId));
		} else {
			setCheckedRows([...checkedRows, orderId]);
		}
	};

	const handleSelectCurrentPage = () => {
		const currentPageOrderIds = orders.map(order => order._id);
		setCheckedRows(currentPageOrderIds);
	};

	const handleSelectAll = (option: 'clear' | 'current' | 'all') => {
		switch (option) {
			case 'clear':
				setCheckedRows([]);
				break;
			case 'current':
				handleSelectCurrentPage();
				break;
			case 'all':
				setLimit(totalOrders);
				break;
		}
	};

	// Función que determina el color de la fila basado en el estado de la orden
	const getCellColor = (rowIndex: number, colIndex: number) => {
		const statusColumnIndex = 1; // Índice de la columna de 'Estado'
		if (colIndex === statusColumnIndex) {
			const orderStatus = orders[rowIndex].orderStatus;
			switch (orderStatus) {
				case 'Pendiente':
					return CellColor.WARNING;
				case 'Completado':
					return CellColor.SUCCESS;
				case 'Cancelado':
					return CellColor.ERROR;
				default:
					return CellColor.NEUTRAL;
			}
		}
		return CellColor.NONE;
	};

	const tableData = {
		headers: [
			'',
			'Estado',
			'Order No.',
			'Fecha',
			'Cliente',
			'Recibido por',
			'PDF',
		],
		rows: orders.map(order => [
			<CircularCheckbox
				key={`check-${order._id}`}
				id={`check-${order._id}`}
				checked={checkedRows.includes(order._id)}
				onChange={() => handleToggleCheck(order._id)}
			/>,
			order.orderStatus, //si es Pendiente cambiar el color
			`AT${order.control || 'N/A'}`,
			order.createdAt
				? new Date(order.createdAt).toLocaleDateString()
				: 'Fecha no disponible',
			order.customer?.name || 'Cliente desconocido',
			order.receivedBy?.name || 'No recibido',
			<a
				key={`pdf-${order._id}`}
				target='_blank'
				href={`${airontoolsAPI}/basic-reports/repair-order/${order._id}`}
				rel='noreferrer'
			>
				<PDFIcon />
			</a>,
		]),
	};

	return (
		<>
			<div className='repair-order-list'>
				<Searchbar searchValue={searchTerm} onSearchChange={setSearchTerm} />
				<LimitInput limit={limit} setLimit={setLimit} />
				<div className='repair-order-list-item'>
					<SelectShowAll
						currentPageCount={Math.min(limit, totalOrders)}
						searchResultCount={totalOrders}
						handleSelectAll={handleSelectAll}
					/>
					{checkedRows.length <= orders.length && (
						<DownloadButtons
							urls={checkedRows.map(
								selectedOrder =>
									`${airontoolsAPI}/basic-reports/repair-order/${selectedOrder}`,
							)}
							names={checkedRows.map(selectedOrder => `${selectedOrder}`)}
						/>
					)}
				</div>
			</div>
			<TableComponent
				data={tableData}
				setSelectedRow={(index: number) => handleToggleCheck(orders[index]._id)}
				getCellColor={getCellColor}
			/>
			<Pagination totalPages={totalPages} setCurrentPage={setPage} />
		</>
	);
}
