// import {useLocation} from 'react-router-dom';
import { AuthContext } from '@contexts/AuthContext';
import BasePage from '@layouts/BasePage';
import '@pages/css/UserOptionsCreateRole.css';
import axios from 'axios';
import React, { useContext, useState } from 'react';

import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import RoleList from '@components/roles/RoleList';
import { airontoolsAPI } from '@configs/api.config';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';

function CreateRoleForm() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user;
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();
	const [updateRole, setUpdateRole] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.post(airontoolsAPI + '/roles/create', {
				name,
				description,
				createdBy: createdBy?.id,
			});
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
					<TextInput
						id='name'
						label='Nombre del Rol:'
						value={name}
						placeholder='Introduce el nombre del rol'
						onChange={e => setName(e.target.value)}
						required={true}
					/>
					<TextAreaInput
						id={'description'}
						label={'Descripción:'}
						placeholder='Introduce la descripción del rol'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
					<TextInput
						className='createdby'
						id='createdby'
						label='Creado por:'
						value={createdBy?.name || ''}
						placeholder='Introduce el nombre del creador'
						onChange={e => console.log(e.target.value)}
						readOnly={true}
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
		<BasePage title='Crear rol de Usuario'>
			<CreateRoleForm />
		</BasePage>
	);
}

function UserOptionCreateRole() {
	return <ContentMainPage />;
}
export default UserOptionCreateRole;
