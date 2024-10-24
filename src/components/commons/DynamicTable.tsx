import '@components/css/DynamicTable.css';
import { TableData } from '@interfaces/TableData.interface';
interface TableComponentProps {
	data: TableData;
	vertical?: boolean;
	setSelectedRow?: (index: number) => void;
}

const TableComponent = ({
	data,
	vertical,
	setSelectedRow,
}: TableComponentProps) => {
	return (
		<div className='table'>
			<table className='table__element'>
				<thead className='table__head'>
					<tr className={`table__row${vertical ? '--vertical' : ''}`}>
						{data.headers.map((header, index) => (
							<th className='table__header' key={index}>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='table__body'>
					{data.rows.map((row, rowIndex) => (
						<tr
							className={`table__row${vertical ? '--vertical' : ''}`}
							key={rowIndex}
							onClick={() => setSelectedRow?.(rowIndex)}
						>
							{row.map((cell, cellIndex) => (
								<td
									className={`table__cell${vertical ? '--vertical' : ''}`}
									key={cellIndex}
								>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableComponent;
