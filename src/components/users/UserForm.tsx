import usePasswordGenerator from '@hooks/common/usePasswordGenerator';
import { useRoles } from '@hooks/roles/useRoles';
import { useUserForm } from '@hooks/users/useUserForm';
import { RoleDataFront } from '@interfaces/Role.interface';
import createUser from '@services/users/createUser.service';
import { ChangeEvent, FormEvent, useEffect } from 'react';

import TextInput from '@components/commons/TextInput';
import FileUpload from '@components/files/FileUpload';
import { useAlert } from '@contexts/Alert/AlertContext';
import useFileUpload from '@hooks/files/useFileUpload';
import useUserUpdate from '@hooks/users/useUserUpdate';
import { UserDataFrontend } from '@interfaces/User.interface';
import { copyPassword } from '@utils/copyPassword.util';
import { errorHandler } from '@utils/errorHandler.util';

export default function UserForm({ user }: { user: UserDataFrontend | null }) {
	const {
		name,
		setName,
		email,
		setEmail,
		imageUrl,
		setImageUrl,
		role,
		setRole,
		createdBy,
	} = useUserForm(user);
	const { updateUser } = useUserUpdate();
	const { showAlert } = useAlert();
	// Se obtiene la lista de roles para el usuario
	const { roles: roleOptions } = useRoles();
	const { password, generatePassword } = usePasswordGenerator({});
	const {
		fileUrl,
		fileName,
		previewUrl,
		handlerFileSelect,
		uploadFile,
		setFileType,
		setfileFeature,
	} = useFileUpload();

	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setRole(e.target.value);
	};

	useEffect(() => {
		console.log(role);
	}, [handleOptionChange]);

	const handleImageUpload = async () => {
		return await uploadFile();
	};
	const handleSubmitCreate = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const userCreated = await createUser({
				password,
				imageUrl,
				email,
				name,
				role,
				createdBy,
			});
			showAlert(`Usuario ${userCreated.name} creado con éxito`, 'success');
			const uploadedUrlImage = await handleImageUpload();
			if (uploadedUrlImage) {
				const updatedUser = await updateUser(userCreated.id || '', {
					imageUrl: uploadedUrlImage,
					name: userCreated.name,
					email: userCreated.email,
				});
				console.log(updatedUser);
				showAlert(
					`Imagen y usuario ${userCreated.name} creados con éxito`,
					'success',
				);
			}
			setImageUrl('');
			setEmail('');
			setName('');
			setRole('');
			setTimeout(() => {
				window.location.reload();
			}, 500);
		} catch (error) {
			showAlert(errorHandler(error), 'error');
		}
	};

	const handleSubmitUpdate = async (e: FormEvent) => {
		e.preventDefault();
		try {
			if (!user) return;
			const uploadedUrlImage = await handleImageUpload();

			if (password) {
				await updateUser(user.id || '', {
					password,
					imageUrl: uploadedUrlImage || imageUrl,
					email,
					name,
					role,
					createdBy,
				});
			} else {
				await updateUser(user.id || '', {
					imageUrl: uploadedUrlImage || user.imageUrl,
					email,
					name,
					role,
					createdBy,
				});
			}
		} catch (error) {
			console.error('Error al subir datos del usuario:', error);
			if (error instanceof Error) {
				showAlert(error.message, 'error');
			} else {
				showAlert('Error desconocido', 'error');
			}
		}
	};

	return (
		<>
			<div className='register'>
				<form onSubmit={user ? handleSubmitUpdate : handleSubmitCreate}>
					<FileUpload
						setImageUrl={setImageUrl}
						fileType='images'
						fileFeature='employees'
						setfileFeature={setfileFeature}
						setFileType={setFileType}
						fileUrl={fileUrl}
						previewUrl={previewUrl}
						fileName={fileName}
						handlerFileSelect={handlerFileSelect}
					/>
					<TextInput
						id={'name'}
						label={'Nombre:'}
						value={name}
						placeholder={'Introduce tu nombre completo'}
						onChange={e => setName(e.target.value)}
						required={true}
					/>
					<TextInput
						id={'email'}
						label={'Correo electrónico:'}
						value={email}
						placeholder={'Introduce tu correo electrónico'}
						onChange={e => setEmail(e.target.value)}
						required={true}
					/>
					<label htmlFor='password'>Contraseña:</label>
					<div className='passwordgenerator'>
						<input
							id='password'
							type='button'
							onClick={generatePassword}
							value='Generar contraseña'
						/>
						<p>{password}</p>
						<button type='button' onClick={() => copyPassword(password)}>
							Copiar contraseña
						</button>
					</div>

					<label htmlFor='options'>Rol:</label>
					<select id='options' value={role} onChange={handleOptionChange}>
						<option value=''>Elige un rol</option>
						{roleOptions.map((roleOption: RoleDataFront, index) => (
							<option key={index} value={roleOption.id}>
								{roleOption.name}
							</option>
						))}
					</select>

					{user ? (
						<button type='submit'>Actualizar usuario</button>
					) : (
						<button type='submit'>Crear usuario</button>
					)}
				</form>
			</div>
		</>
	);
}
