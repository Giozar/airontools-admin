// import {useLocation} from 'react-router-dom';
import { useAuthContext } from '@contexts/auth/AuthContext';
import '@pages/css/UserOptionsCreateRole.css';
import axios from 'axios';
import React, { useState } from 'react';

import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import RoleList from '@components/roles/RoleList';
import { airontoolsAPI } from '@configs/api.config';
import { useAlert } from '@contexts/Alert/AlertContext';

function CreateRoleForm() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const { user } = useAuthContext();
	const createdBy = user?.id;
	const { showAlert } = useAlert();
	const [updateRole, setUpdateRole] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.post(airontoolsAPI + '/roles/create', {
				name,
				description,
				createdBy,
			});
			console.log('Role created successfully:', response.data);
			showAlert('Rol creado con éxito', 'success');
			setUpdateRole(!updateRole);
			setName('');
			setDescription('');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage =
					error.response?.data?.message || 'Error desconocido';
				showAlert(errorMessage, 'error');
			} else {
				showAlert('Error desconocido', 'error');
			}
			console.error('Error creating role:', error);
		}
	};

	return (
		<div className='cuerpo'>
			<div className='create-role-form'>
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
						value={user?.name || ''}
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

export default function UserOptionCreateRole() {
	return <CreateRoleForm />;
}
