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
	const { roles: roleOptions } = useRoles();
	const { showAlert } = useAlert();

	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setRole(e.target.value);
	};

	useEffect(() => {}, [userToEdit, role]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			if (!userToEdit) throw 'No hay usuario que editar';

			await axios.patch<RegisterResponse>(
				airontoolsAPI + `/auth/${userToEdit.id}`,
				{
					role,
				},
			);

			onUpdateList();
			onCloseModal();
			showAlert('Se cambió el rol con éxito', 'success');
		} catch (error) {
			if (!axios.isAxiosError<ValidationError>(error)) {
				console.error('Edición fallida', error);
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
		<form onSubmit={handleSubmit} className='role-change-modal'>
			<button
				type='button'
				className='role-change-modal__close'
				onClick={onCloseModal}
			>
				<CloseIcon />
			</button>
			<p className='role-change-modal__title'>
				Nuevo rol para: {userToEdit?.name}
			</p>
			<label htmlFor='options' className='role-change-modal__label'>
				Nuevo rol:
			</label>
			<select
				id='options'
				className='role-change-modal__select'
				value={role as string}
				onChange={handleOptionChange}
			>
				{roleOptions.map((roleOption: RoleDataFront, index) => (
					<option
						key={index}
						value={roleOption.id}
						className='role-change-modal__option'
					>
						{roleOption.name}
					</option>
				))}
			</select>
			<button type='submit' className='role-change-modal__submit'>
				Cambiar
			</button>
		</form>
	);
}

export default RoleChangeModal;
