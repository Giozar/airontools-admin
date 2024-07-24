import { useEffect, useState } from 'react';

export function useUserForm() {
	const [email, setEmail] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [name, setName] = useState('');
	const [roles, setRoles] = useState('Elige un rol');

	useEffect(() => {}, [imageUrl]);

	return {
		email,
		setEmail,
		imageUrl,
		setImageUrl,
		name,
		setName,
		roles,
		setRoles,
	};
}
