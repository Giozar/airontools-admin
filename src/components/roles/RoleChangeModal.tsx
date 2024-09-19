import { useRoles } from '@hooks/roles/useRoles';
import { RoleDataFront } from '@interfaces/Role.interface';
import { RegisterResponse, UserDataFrontend } from '@interfaces/User.interface';
import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import '@components/css/roleChangeModal.css';
import CloseIcon from '@components/svg/CloseIcon';
import { airontoolsAPI } from '@configs/api.config';
import { useAlert } from '@contexts/Alert/AlertContext';

interface ValidationError {
	message: string[];
}

interface RoleChangeModalProps {
	userToEdit: UserDataFrontend | null;
	onCloseModal: () => void;
	onUpdateList: () => void;
}

function RoleChangeModal({
	userToEdit,
	onCloseModal,
	onUpdateList,
}: RoleChangeModalProps) {
	const [role, setRole] = useState(userToEdit?.role?.id);
	// Se obtiene la lista de roles para el usuario
	const { roles: roleOptions } = useRoles();
	const { showAlert } = useAlert();

	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setRole(e.target.value);
	};

	useEffect(() => {
		console.log(userToEdit);
		console.log(role);
	}, [handleOptionChange]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await axios.patch<RegisterResponse>(
				airontoolsAPI + `/auth/${userToEdit?.id}`,
				{
					...userToEdit,
					role,
				},
			);
			onUpdateList();
			onCloseModal();
			showAlert('Se cambio el rol con éxito', 'success');
		} catch (error) {
			if (!axios.isAxiosError<ValidationError>(error)) {
				console.error('Edition failed', error);
				return;
			}

			if (!error.response) return;
			const errorMessage = error.response.data.message;
			const message = Array.isArray(errorMessage)
				? errorMessage.join(', ')
				: errorMessage;
			showAlert(message, 'error');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='choserol'>
			<button type='button' className='close' onClick={onCloseModal}>
				<CloseIcon />
			</button>
			<p>Nuevo rol para: {userToEdit?.name}</p>
			<label htmlFor='options'>Nuevo rol:</label>
			<select id='options' value={role as string} onChange={handleOptionChange}>
				{roleOptions.map((roleOption: RoleDataFront, index) => (
					<option key={index} value={roleOption.id}>
						{roleOption.name}
					</option>
				))}
			</select>
			<button type='submit'>Cambiar</button>
		</form>
	);
}
export default RoleChangeModal;
