import { TableData } from '@interfaces/TableData.interface';
import React from 'react';

interface TableComponentProps {
	data: TableData;
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						{data.headers.map((header, index) => (
							<th key={index}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.rows.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((cell, cellIndex) => (
								<td key={cellIndex}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableComponent;
