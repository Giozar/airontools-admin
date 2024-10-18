import { Company } from '@interfaces/Company.interface';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { searchCompaniesService } from '@services/companies/companies.service';
import { useCallback, useState } from 'react';

export default function useCompanies() {
	const [companies, setCompanies] = useState<Company[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const fetchCompanies = useCallback(async (searchTerm: string) => {
		try {
			setLoading(true);
			setError('');
			const newOrders = await searchCompaniesService(searchTerm);
			setCompanies(newOrders);
		} catch (error) {
			const err = error as ErrorResponse;
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		companies,
		fetchCompanies,
		loading,
		error,
	};
}
