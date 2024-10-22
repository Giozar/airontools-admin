import { Customer } from '@interfaces/Customer.interface';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import {
	SearchCustomersParams,
	searchCustomersService,
} from '@services/customers/customers.service';
import { useCallback, useState } from 'react';

export default function useCustomers() {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const fetchCustomers = useCallback(async (params: SearchCustomersParams) => {
		try {
			setLoading(true);
			setError('');
			const customersFound = await searchCustomersService(params);
			setCustomers(customersFound);
		} catch (error) {
			const err = error as ErrorResponse;
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		customers,
		fetchCustomers,
		loading,
		error,
	};
}
