// Custom hook to fetch orders
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { Order } from '@interfaces/Order.interface';
import { searchOrdersServices } from '@services/orders/orders.service';
import { useCallback, useState } from 'react';

export default function useOrders() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [totalOrders, setTotalOrders] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(10);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const fetchOrders = useCallback(
		async (searchTerm: string) => {
			try {
				setLoading(true);
				setError('');
				const newOrders = await searchOrdersServices(searchTerm, page, limit);
				setOrders(newOrders.data);
				setTotalOrders(newOrders.total);
				setTotalPages(newOrders.totalPages);
			} catch (error) {
				const err = error as ErrorResponse;
				setError(err.message);
			} finally {
				setLoading(false);
			}
		},
		[limit, page],
	);

	return {
		orders,
		totalOrders,
		totalPages,
		setPage,
		limit,
		setLimit,
		fetchOrders,
		loading,
		error,
	};
}
