import { ErrorResponse } from '@interfaces/ErrorResponse';
import { getUserRoles } from '@services/userRoles';
import { useEffect, useState } from 'react';

export const useUserRoles = () => {
	const [userRoles, setUserRoles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ErrorResponse>();

	useEffect(() => {
		const fetchUserRoles = async () => {
			try {
				setLoading(true);
				const data = await getUserRoles();
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
