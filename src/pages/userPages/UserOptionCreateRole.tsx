// import {useLocation} from 'react-router-dom';
import { useAuthContext } from '@contexts/auth/AuthContext';
import '@pages/css/UserOptionsCreateRole.css';
import React, { useState } from 'react';

import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import RoleList from '@components/roles/RoleList';
import { useAlertHelper } from '@contexts/Alert/alert.helper';
import { createRoleService } from '@services/roles/createRole.service';

function CreateRoleForm() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const { user } = useAuthContext();
	const createdBy = user?.id;
	const { showSuccess, showError } = useAlertHelper();
	const [updateRole, setUpdateRole] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await createRoleService({
				name,
				description,
				createdBy,
				permissions: undefined,
			});
			showSuccess('Rol creado con éxito');
			setUpdateRole(!updateRole);
			setName('');
			setDescription('');
		} catch (error) {
			showError('No se pudo crear el rol', error);
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
