import { ErrorResponse } from '@interfaces/ErrorResponse';
import { RoleDataFront } from '@interfaces/Role.interface';
import { getRoles } from '@services/roles';
import { useEffect, useState } from 'react';

export const useRoles = () => {
	const [roles, setRoles] = useState<RoleDataFront[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ErrorResponse>();

	useEffect(() => {
		const fetchUserRoles = async () => {
			try {
				setLoading(true);
				const data = await getRoles();
				setRoles(data);
			} catch (err) {
				const error = err as ErrorResponse;
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserRoles();
	}, []);

	return { roles, loading, error };
};
