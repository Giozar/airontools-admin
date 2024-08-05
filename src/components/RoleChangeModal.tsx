import { UserDataBackend, transformUserData } from '@adapters/user.adapter';
import useErrorHandling from '@hooks/common/useErrorHandling';
import { useRoles } from '@hooks/roles/useRoles';
import { Role } from '@interfaces/Role.interface';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import './css/roleChangeModal.css';
import ErrorMessage from './ErrorMessage';

interface RegisterResponse {
	token: string;
	user: UserDataBackend;
}
interface ValidationError {
	message: string[];
}

interface RoleChangeModalProps {
	userToEdit: UserDataBackend;
	onCloseModal: () => void;
	onUpdateList: () => void;
}

function RoleChangeModal({
	userToEdit,
	onCloseModal,
	onUpdateList,
}: RoleChangeModalProps) {
	const { userRoles: roleOptions } = useRoles();
	const [role, setRoles] = useState(userToEdit.role);
	const { errorLog, showError } = useErrorHandling();

	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setRoles(e.target.value);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await axios.patch<RegisterResponse>(
				import.meta.env.VITE_API_URL + `/auth/${userToEdit._id}`,
				transformUserData({
					...userToEdit,
					role,
				}),
			);
			onUpdateList();
			onCloseModal();
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
			showError(message);
		}
	};

	return (
		<>
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}
			<form onSubmit={handleSubmit} className='choserol'>
				<label htmlFor='options'>Nuevo rol:</label>
				<select
					id='options'
					value={role as string}
					onChange={handleOptionChange}
				>
					{roleOptions.map((roleOption: Role, index) => (
						<option key={index} value={roleOption.name}>
							{roleOption.name}
						</option>
					))}
				</select>
				<button type='submit'>Cambiar</button>
			</form>
		</>
	);
}
export default RoleChangeModal;
