import { ErrorResponse } from '@interfaces/ErrorResponse';
import { getRoles } from '@services/roles';
import { useEffect, useState } from 'react';

export const useRoles = () => {
	const [userRoles, setUserRoles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ErrorResponse>();

	useEffect(() => {
		const fetchUserRoles = async () => {
			try {
				setLoading(true);
				const data = await getRoles();
				setUserRoles(data);
			} catch (err) {
				const error = err as ErrorResponse;
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserRoles();
	}, []);

	return { userRoles, loading, error };
};
