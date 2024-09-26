import { useRoles } from '@hooks/roles/useRoles';
import { RoleDataFront } from '@interfaces/Role.interface';
import { UserDataFrontend } from '@interfaces/User.interface';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import '@components/css/roleChangeModal.css';
import CloseIcon from '@components/svg/CloseIcon';
import { useAlert } from '@contexts/Alert/AlertContext';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { updateRoleService } from '@services/roles/updateRole.service';

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
			if (!userToEdit) throw new Error('No hay usuario que editar');
			if (!role) throw new Error('Rol invalido');
			await updateRoleService(userToEdit.id, role);
			onUpdateList();
			onCloseModal();
			showAlert('Se cambió el rol con éxito', 'success');
		} catch (error) {
			showAlert((error as ErrorResponse).message, 'error');
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
