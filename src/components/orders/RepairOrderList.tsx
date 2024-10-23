// Importing necessary components, hooks, and libraries
import DownloadButtons from '@components/commons/DownloadButtons';
import TableComponent from '@components/commons/DynamicTable';
import CircularCheckbox from '@components/commons/form/CircularCheckbox';
import LimitInput from '@components/commons/Pagination/LimitInput';
import Pagination from '@components/commons/Pagination/Pagination';
import SelectAll from '@components/commons/Pagination/SelectAll';
import Searchbar from '@components/search/Searchbar';
import PDFIcon from '@components/svg/PDFIcon';
import { airontoolsAPI } from '@configs/api.config';
import useDebounce from '@hooks/search/useDebounce';
import { useEffect, useState } from 'react';
import useOrders from './hooks/useOrders';

// Main component for displaying repair orders list
export default function RepairOrderList() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [checkedRows, setCheckedRows] = useState<number[]>([]);

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

	//const navigate = useNavigate();

	useEffect(() => {
		debouncedFetch(searchTerm);
	}, [searchTerm, debouncedFetch]);

	/*const handleEditOrder = useCallback(
		(orderId: string) => {
			navigate(`editar-orden/${orderId}`);
		},
		[navigate],
	);*/

	// Maneja la selección/deselección de filas y checkboxes
	const handleToggleCheck = (index: number) => {
		console.log(index);
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
			// 'Editar Orden', //Por petición del jefe
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
			<CircularCheckbox
				key={`check-${order._id}`}
				id={`check-${index}`}
				checked={checkedRows.includes(index)}
				onChange={() => handleToggleCheck(index)}
			/>,
		]),
	};
	return (
		<>
			<Searchbar searchValue={searchTerm} onSearchChange={setSearchTerm} />
			<LimitInput limit={limit} setLimit={setLimit} />
			<SelectAll currentPageCount={0} searchResultCount={0} />

			<DownloadButtons
				urls={checkedRows.map(
					selectedOrder =>
						`${airontoolsAPI}/basic-reports/repair-order/${orders[selectedOrder]._id}`,
				)}
			/>
			<TableComponent data={tableData} setSelectedRow={handleToggleCheck} />
			<Pagination totalPages={totalPages} setCurrentPage={setPage} />
		</>
	);
}
