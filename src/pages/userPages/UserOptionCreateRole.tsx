import HeaderApp from '@layouts/HeaderApp';
// import {useLocation} from 'react-router-dom';
import HeaderTitle from '@components/HeaderTitle';
import { AuthContext } from '@contexts/AuthContext';
import BasePage from '@layouts/BasePage';
import '@pages/css/UserOptionsCreateRole.css';
import axios from 'axios';
import React, { useContext, useState } from 'react';

import ErrorMessage from '@components/ErrorMessage';
import RoleList from '@components/RoleList';
import SuccessMessage from '@components/SuccessMessage';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';

function CreateRoleForm() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.name;
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();
	const [updateRole, setUpdateRole] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				import.meta.env.VITE_API_URL + '/roles/create',
				{
					name,
					description,
					createdBy,
				},
			);
			console.log('Role created successfully:', response.data);
			showSuccess('Rol creado con éxito');
			setUpdateRole(!updateRole);
			setName('');
			setDescription('');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage =
					error.response?.data?.message || 'Error desconocido';
				showError(errorMessage);
			} else {
				showError('Error desconocido');
			}
			console.error('Error creating role:', error);
		}
	};

	return (
		<div className='cuerpo'>
			<div className='create-role-form'>
				{successLog.isSuccess && (
					<SuccessMessage message={successLog.message} />
				)}
				{errorLog.isError && <ErrorMessage message={errorLog.message} />}

				<h2>Crear Nuevo Rol</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor='name'>Nombre del Rol:</label>
					<input
						id='name'
						type='text'
						placeholder='Introduce el nombre del rol'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>

					<label htmlFor='description'>Descripción:</label>
					<textarea
						id='description'
						placeholder='Introduce la descripción del rol'
						value={description}
						onChange={e => setDescription(e.target.value)}
						required
					/>

					<label htmlFor='createdBy'>Creado Por:</label>
					<input
						className='createdby'
						id='createdBy'
						type='text'
						placeholder='Introduce el nombre del creador'
						value={createdBy}
						readOnly
					/>

					<button type='submit'>Crear Rol</button>
				</form>
			</div>
			<RoleList updateRole={updateRole} />
		</div>
	);
}

function ContentMainPage() {
	// const location = useLocation();
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Crear rol de Usuario' />
				<CreateRoleForm />
			</main>
		</BasePage>
	);
}

function UserOptionCreateRole() {
	return <ContentMainPage />;
}
export default UserOptionCreateRole;
