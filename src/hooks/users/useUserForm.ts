import { useAuthContext } from '@contexts/auth/AuthContext';
import { UserDataFrontend } from '@interfaces/User.interface';
import { useEffect, useState } from 'react';

export function useUserForm(userToEdit: UserDataFrontend | null) {
	const [email, setEmail] = useState(userToEdit ? userToEdit.email || '' : '');
	const [imageUrl, setImageUrl] = useState(
		userToEdit ? userToEdit.imageUrl || '' : '',
	);
	const [name, setName] = useState(userToEdit ? userToEdit.name || '' : '');
	const [role, setRole] = useState(userToEdit ? userToEdit.role?.id || '' : ''); // Cambiado a un valor vacío inicial
	const [createdBy, setCreatedBy] = useState(
		userToEdit ? userToEdit.createdBy?.id || '' : '',
	);
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
