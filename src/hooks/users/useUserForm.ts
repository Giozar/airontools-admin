import { AuthContext } from '@contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

export function useUserForm() {
	const [email, setEmail] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [name, setName] = useState('');
	const [role, setRole] = useState('Elige un rol');
	const [createdBy, setCreatedBy] = useState('');
	const authContext = useContext(AuthContext);

	useEffect(() => {
		authContext?.user && setCreatedBy(authContext?.user?.id);
	}, [imageUrl]);

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
