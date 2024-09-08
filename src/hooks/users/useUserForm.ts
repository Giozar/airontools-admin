import { useAuthContext } from '@contexts/auth/AuthContext';
import { useEffect, useState } from 'react';

export function useUserForm() {
	const [email, setEmail] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [name, setName] = useState('');
	const [role, setRole] = useState(''); // Cambiado a un valor vacío inicial
	const [createdBy, setCreatedBy] = useState('');
	const { user } = useAuthContext();

	useEffect(() => {
		if (user) {
			setCreatedBy(user.id);
		}
	}, [user]);

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
