import { Order } from '@interfaces/Order.interface';
import { getOrderByIdService } from '@services/orders/orders.service';
import { useEffect, useState } from 'react';

export default function useFetchOrder({ id }: { id: string }) {
	const [order, setOrder] = useState<Order>();

	useEffect(() => {
		if (id) {
			const fetchOrder = async () => {
				const product = await getOrderByIdService(id);
				console.log(product);
				setOrder(product);
			};
			fetchOrder();
		}
	}, [id]);

	return { order };
}
