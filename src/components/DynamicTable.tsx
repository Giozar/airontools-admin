interface TableData {
	headers: string[];
	rows: (string | JSX.Element)[][];
}
interface TableComponentProps {
	data: TableData;
}
const TableComponent = ({ data }: TableComponentProps) => {
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
					{data.rows.map((row, index) => (
						<tr key={index}>
							{row.map((cell, index) => (
								<td key={index}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableComponent;
