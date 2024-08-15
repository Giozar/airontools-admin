import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import FileUpload from '@components/FileUpload';
import usePasswordGenerator from '@hooks/common/usePasswordGenerator';
import { useRoles } from '@hooks/roles/useRoles';
import useUserUpdate from '@hooks/users/useUserUpdate';
import { RoleDataFront } from '@interfaces/Role.interface';
import { UserDataFrontend } from '@interfaces/User.interface';
import BasePage from '@layouts/BasePage';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

function EditUserForm({ userToEdit }: { userToEdit: UserDataFrontend }) {
	const [email, setEmail] = useState(userToEdit.email);
	const pastImageUrl = userToEdit.imageUrl;
	const [imageUrl, setImageUrl] = useState(userToEdit.imageUrl);
	const [name, setName] = useState(userToEdit.name);
	const [role, setRole] = useState(userToEdit.role?.id);

	const { errorLog, successLog, updateUser } = useUserUpdate();
	const { password, generatePassword } = usePasswordGenerator({
		pastPassword: userToEdit.password,
	});
	const { roles: roleOptions } = useRoles();

	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setRole(e.target.value);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const updatedUserData = {
				email,
				name,
				role,
				imageUrl,
			};

			if (imageUrl === '') {
				updatedUserData.imageUrl = pastImageUrl;
			}
			if (password === '') {
				await updateUser(userToEdit.id || '', updatedUserData);
			} else {
				await updateUser(userToEdit.id || '', { ...updatedUserData, password });
			}
			localStorage.setItem('userToEdit', JSON.stringify(updatedUserData));
		} catch (error) {
			console.error('Error actualizando usuario:', error);
		}
	};

	useEffect(() => {}, [handleOptionChange, imageUrl]);

	return (
		<>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}
			<div className='register'>
				<form onSubmit={handleSubmit}>
					<div style={{ display: 'flex', gap: '5rem' }}>
						<div>
							<h4>Imagen Actual</h4>
							<div
								className='profileimage'
								style={{ backgroundImage: `url(${pastImageUrl})` }}
							></div>
						</div>
						<div>
							<h4>Subir nueva imagen</h4>
							<FileUpload setImageUrl={setImageUrl} />
						</div>
					</div>
					<label htmlFor='name'>Nombre:</label>
					<input
						id='name'
						type='text'
						placeholder='Introduce tu nombre completo'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<label htmlFor='email'>Correo electrónico:</label>
					<input
						id='email'
						type='email'
						placeholder='Introduce tu correo electrónico'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<label htmlFor='password'>Contraseña:</label>
					<div className='passwordgenerator'>
						<input
							id='password'
							type='button'
							onClick={generatePassword}
							value='Generar nueva contraseña'
						/>
						<p>{password}</p>
					</div>

					<label htmlFor='options'>Rol:</label>
					<select id='options' value={role} onChange={handleOptionChange}>
						{roleOptions.map((roleOption: RoleDataFront, index) => (
							<option key={index} value={roleOption.id}>
								{roleOption.name}
							</option>
						))}
					</select>

					<p style={{ color: 'red' }}>
						{imageUrl === ''
							? 'No ha subido una imagen, ¿Quiere continuar?'
							: ''}
					</p>

					<button type='submit'>Actualizar usuario</button>
				</form>
			</div>
		</>
	);
}

function ContentMainPage() {
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

	return (
		<BasePage title='Editar Usuario'>
			<EditUserForm userToEdit={state} />
		</BasePage>
	);
}

function UserOptionEdit() {
	return <ContentMainPage />;
}
export default UserOptionEdit;
