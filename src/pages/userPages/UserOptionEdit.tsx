import { UserDataFrontend } from '@adapters/user.adapter';
import ErrorMessage from '@components/ErrorMessage';
import FileUpload from '@components/FileUpload';
import HeaderTitle from '@components/HeaderTitle';
import SuccessMessage from '@components/SuccessMessage';
import usePasswordGenerator from '@hooks/common/usePasswordGenerator';
import { useUserRoles } from '@hooks/userRoles/useUserRoles';
import useUserUpdate from '@hooks/useUserUpdate';
import { UserRole } from '@interfaces/UserRole';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function EditUserForm({ userToEdit }: { userToEdit: UserDataFrontend }) {
	const [email, setEmail] = useState(userToEdit.email);
	const pastImageUrl = userToEdit.imageUrl;
	const [imageUrl, setImageUrl] = useState(userToEdit.imageUrl);
	const [name, setName] = useState(userToEdit.name);
	const [roles, setRoles] = useState(userToEdit.roles);

	const { errorLog, successLog, updateUser } = useUserUpdate();
	const { password, generatePassword } = usePasswordGenerator({
		pastPassword: userToEdit.password,
	});
	const { userRoles: roleOptions } = useUserRoles();

	useEffect(() => {}, [imageUrl]);

	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setRoles(e.target.value);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const updatedUserData = {
				email,
				name,
				roles,
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
		} catch (error) {
			console.error('Error actualizando usuario:', error);
		}
	};

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
					<select id='options' value={roles} onChange={handleOptionChange}>
						{roleOptions.map((roleOption: UserRole, index) => (
							<option key={index} value={roleOption.name}>
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
	const location = useLocation();
	const { user } = location.state || {
		user: { id: 'N/A', name: 'Desconocido' },
	};
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Editar Usuario' />
				<EditUserForm userToEdit={user} />
			</main>
		</BasePage>
	);
}

function UserOptionEdit() {
	return <ContentMainPage />;
}
export default UserOptionEdit;
