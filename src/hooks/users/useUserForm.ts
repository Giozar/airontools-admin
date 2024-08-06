import { AuthContext } from '@contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

export function useUserForm() {
	const [email, setEmail] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [name, setName] = useState('');
	const [role, setRole] = useState(''); // Cambiado a un valor vacío inicial
	const [createdBy, setCreatedBy] = useState('');
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
