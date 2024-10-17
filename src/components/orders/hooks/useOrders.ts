import { Order } from '@interfaces/Order.interface';
import { searchOrdersServices } from '@services/orders/orders.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useCallback, useRef, useState } from 'react';

export default function useOrders({ search }: { search: string }) {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const previusSearch = useRef(search);

	const fetchOrders = useCallback(async (search: string) => {
		if (previusSearch.current === search) return;

		try {
			setLoading(true);
			setError('');
			previusSearch.current = search;
			const newOrders = await searchOrdersServices(search);
			setOrders(newOrders);
		} catch (error) {
			errorHandler(error);
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
