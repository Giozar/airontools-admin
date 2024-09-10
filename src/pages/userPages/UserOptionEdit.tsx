import UserForm from '@components/users/UserForm';
import { UserDataFrontend } from '@interfaces/User.interface';
import { useEffect, useState } from 'react';

function EditUserForm({ userToEdit }: { userToEdit: UserDataFrontend }) {
	return (
		<>
			<div className='new-image-container'>
				<h4>Imagen Actual:</h4>
				<img
					src={userToEdit.imageUrl}
					width={150}
					height={150}
					className='circular-image '
				/>
				<h4>Imagen Nueva:</h4>
			</div>

			<UserForm user={userToEdit} />
		</>
	);
}

export default function UserOptionEdit() {
	const initialState = {
		user: { id: 'N/A', name: 'Desconocido' },
	};

	const [state] = useState(() => {
		const savedState = localStorage.getItem('userToEdit');
		return savedState ? JSON.parse(savedState) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('userToEdit', JSON.stringify(state));
	}, [state]);

	return <EditUserForm userToEdit={state} />;
}
