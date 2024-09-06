import { AuthContext } from '@contexts/AuthContext';
import { UserDataFrontend } from '@interfaces/User.interface';
import { useContext, useEffect, useState } from 'react';

export function useUserForm(user: UserDataFrontend | null) {
	const [email, setEmail] = useState(user ? user.email || '' : '');
	const [imageUrl, setImageUrl] = useState(user ? user.imageUrl || '' : '');
	const [name, setName] = useState(user ? user.name || '' : '');
	const [role, setRole] = useState(user ? user.role?.id || '' : ''); // Cambiado a un valor vacío inicial
	const [createdBy, setCreatedBy] = useState(
		user ? user.createdBy?.id || '' : '',
	);
	const authContext = useContext(AuthContext);

	useEffect(() => {
		if (authContext?.user) {
			setCreatedBy(authContext.user.id);
		}
	}, [authContext]);

	return {
		email,
		setEmail,
		imageUrl,
		setImageUrl,
		name,
		setName,
		role,
		setRole,
		createdBy,
		setCreatedBy,
	};
}
