import UserForm from '@components/users/UserForm';
import { useEffect, useState } from 'react';

export default function UserOptionEdit() {
	const initialState = '';

	const [state] = useState(() => {
		const savedState = localStorage.getItem('userToEdit');
		return savedState ? JSON.parse(savedState) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('userToEdit', JSON.stringify(state));
	}, [state]);

	return <UserForm user={state.id} />;
}
