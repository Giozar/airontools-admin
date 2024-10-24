import '@components/css/DynamicTable.css';
import { TableData } from '@interfaces/TableData.interface';

// Enum para los colores disponibles
export enum CellColor {
	NEUTRAL = 'neutral',
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
	INFO = 'info',
	NONE = '',
}

interface TableComponentProps {
	data: TableData;
	vertical?: boolean;
	setSelectedRow?: (index: number) => void;
	getCellColor?: (rowIndex: number, colIndex: number) => CellColor;
	getRowColor?: (rowIndex: number) => CellColor;
}

const TableComponent = ({
	data,
	vertical,
	setSelectedRow,
	getCellColor,
	getRowColor,
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
							className={`table__row${vertical ? '--vertical' : ''} ${getRowColor ? getRowColor(rowIndex) : ''}`}
							key={rowIndex}
							onClick={() => setSelectedRow?.(rowIndex)}
						>
							{row.map((cell, cellIndex) => (
								<td
									className={`table__cell${vertical ? '--vertical' : ''} ${getCellColor ? getCellColor(rowIndex, cellIndex) : ''}`}
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
