// Custom hook to fetch orders
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { Order } from '@interfaces/Order.interface';
import { searchOrdersServices } from '@services/orders/orders.service';
import { useCallback, useState } from 'react';

export default function useOrders() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const fetchOrders = useCallback(async (searchTerm: string) => {
		try {
			setLoading(true);
			setError('');
			const newOrders = await searchOrdersServices(searchTerm);
			setOrders(newOrders);
		} catch (error) {
			const err = error as ErrorResponse;
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		orders,
		fetchOrders,
		loading,
		error,
	};
}
