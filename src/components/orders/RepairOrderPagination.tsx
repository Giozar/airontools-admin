interface RepairOrderPaginationProps {
	totalPages: number;
	setCurrentPage: (value: number) => void;
}

export default function RepairOrderPagination({
	totalPages,
	setCurrentPage,
}: RepairOrderPaginationProps) {
	const pages = Array.from({ length: totalPages }, (_v, k) => k + 1);
	const handlePageChange = (value: number) => {
		setCurrentPage(value);
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-evenly',
			}}
		>
			{pages.map(page => (
				<button key={`page-${page}`} onClick={() => handlePageChange(page)}>
					{page}
				</button>
			))}
		</div>
	);
}
