import '@components/css/Pagination.css';
import { useState } from 'react';
interface PaginationProps {
	totalPages: number;
	setCurrentPage: (value: number) => void;
	maxVisiblePages?: number;
}

export default function Pagination({
	totalPages,
	setCurrentPage,
	maxVisiblePages = 5,
}: PaginationProps) {
	const [currentPage, setCurrentPageState] = useState(1);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		setCurrentPageState(page);
	};

	const getPageNumbers = () => {
		const pageNumbers = [];
		if (totalPages <= maxVisiblePages) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		pageNumbers.push(1);

		let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
		const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

		if (endPage - startPage < maxVisiblePages - 3) {
			startPage = Math.max(2, endPage - maxVisiblePages + 3);
		}

		if (startPage > 2) {
			pageNumbers.push(null); // Represents ellipsis
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		if (endPage < totalPages - 1) {
			pageNumbers.push(null); // Represents ellipsis
		}

		pageNumbers.push(totalPages);

		return pageNumbers;
	};

	return (
		<nav className='pagination' aria-label='Pagination'>
			<ul className='pagination-list'>
				<li>
					<button
						className='pagination-button'
						onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
						disabled={currentPage === 1}
						aria-label='Previous page'
					>
						&laquo;
					</button>
				</li>
				{getPageNumbers().map((page, index) =>
					page === null ? (
						<li key={`ellipsis-${index}`}>
							<span className='pagination-ellipsis'>&hellip;</span>
						</li>
					) : (
						<li key={`page-${page}`}>
							<button
								className={`pagination-button ${currentPage === page ? 'active' : ''}`}
								onClick={() => handlePageChange(page)}
								aria-current={currentPage === page ? 'page' : undefined}
							>
								{page}
							</button>
						</li>
					),
				)}
				<li>
					<button
						className='pagination-button'
						onClick={() =>
							handlePageChange(Math.min(totalPages, currentPage + 1))
						}
						disabled={currentPage === totalPages}
						aria-label='Next page'
					>
						&raquo;
					</button>
				</li>
			</ul>
		</nav>
	);
}
