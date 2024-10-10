import '@components/css/DynamicTable.css';
import { useState } from 'react';

interface DynamicSizeTableProps {
	headers: string[];
	vertical?: boolean;
	maxRows?: number; // Propiedad para el límite de filas
	RowComponent: React.FC<{ index: number }>; // Componente de fila
}

const DynamicSizeTable = ({
	headers,
	RowComponent,
	vertical,
	maxRows = 9,
}: DynamicSizeTableProps) => {
	const [rowsCount, setRowsCount] = useState(1); // Inicializa con 1 fila

	const addRow = () => {
		if (rowsCount < maxRows) {
			setRowsCount(rowsCount + 1);
		} else {
			alert(`El número máximo de filas es ${maxRows}`);
		}
	};

	const removeRow = () => {
		if (rowsCount > 1) {
			setRowsCount(rowsCount - 1);
		}
	};

	return (
		<div className='table'>
			<table className='table__element'>
				<thead className='table__head'>
					<tr className={`table__row${vertical ? '--vertical' : ''}`}>
						{headers.map((header, index) => (
							<th className='table__header' key={index}>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='table__body'>
					{Array.from({ length: rowsCount }).map((_, rowIndex) => (
						<tr
							className={`table__row${vertical ? '--vertical' : ''}`}
							key={rowIndex}
						>
							<RowComponent index={rowIndex} />
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={addRow}>Añadir fila</button>
			<button onClick={removeRow}>Quitar fila</button>
			<div>Total de filas: {rowsCount}</div>
		</div>
	);
};

export default DynamicSizeTable;
