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

	useEffect(() => {
		debouncedFetch(searchTerm);
	}, [searchTerm, debouncedFetch]);

	useEffect(() => {
		console.log('Checked Rows:', checkedRows);
		console.log('Orders:', orders);
	}, [checkedRows, orders]);

	// Maneja la selección/deselección de filas y checkboxes
	const handleToggleCheck = (index: number) => {
		if (checkedRows.includes(index)) {
			setCheckedRows(checkedRows.filter(i => i !== index));
		} else {
			setCheckedRows([...checkedRows, index]);
		}
	};
	const handleSelectAll = (totalRows: number) => {
		setLimit(totalRows);

		const allRows = Array.from({ length: totalRows }, (_, i) => i);
		setCheckedRows(allRows);
	};
	const tableData = {
		headers: ['Order No.', 'Fecha', 'Cliente', 'Recibido por', 'PDF', ''],
		rows: orders
			.filter(order => order)
			.map((order, index) => [
				`AT${order.control || 'N/A'}`,
				order.createdAt
					? new Date(order.createdAt).toLocaleDateString()
					: 'Fecha no disponible',
				order.customer?.name || 'Cliente desconocido',
				order.receivedBy?.name || 'No recibido',
				<a
					key={`pdf-${order?._id || index}`}
					target='_blank'
					href={
						order?._id
							? `${airontoolsAPI}/basic-reports/repair-order/${order._id}`
							: '#'
					}
					rel='noreferrer'
				>
					<PDFIcon />
				</a>,
				<CircularCheckbox
					key={`check-${order?._id || index}`}
					id={`check-${index}`}
					checked={checkedRows.includes(index)}
					onChange={() => handleToggleCheck(index)}
				/>,
			]),
	};

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Searchbar searchValue={searchTerm} onSearchChange={setSearchTerm} />
				<LimitInput limit={limit} setLimit={setLimit} />
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<SelectAll
						currentPageCount={Math.min(totalOrders, limit)}
						searchResultCount={totalOrders}
						handleSelectAll={handleSelectAll}
					/>
					{checkedRows.length <= orders.length && (
						<DownloadButtons
							urls={checkedRows.map(
								selectedOrder =>
									`${airontoolsAPI}/basic-reports/repair-order/${orders[selectedOrder]._id}`,
							)}
						/>
					)}
				</div>
			</div>

			<TableComponent data={tableData} setSelectedRow={handleToggleCheck} />
			<Pagination totalPages={totalPages} setCurrentPage={setPage} />
		</>
	);
}
