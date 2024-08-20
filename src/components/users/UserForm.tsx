import useErrorHandling from '@hooks/common/useErrorHandling';
import usePasswordGenerator from '@hooks/common/usePasswordGenerator';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { useRoles } from '@hooks/roles/useRoles';
import { useUserForm } from '@hooks/users/useUserForm';
import { RoleDataFront } from '@interfaces/Role.interface';
import createUser from '@services/users/createUser.service';
import { ChangeEvent, FormEvent, useEffect } from 'react';

import ErrorMessage from '../commons/ErrorMessage';
import SuccessMessage from '../commons/SuccessMessage';
import FileUpload from '../files/FileUpload';

export default function UserForm() {
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
	} = useUserForm();

	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	// Se obtiene la lista de roles para el usuario
	const { roles: roleOptions } = useRoles();

	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setRole(e.target.value);
	};

	useEffect(() => {
		console.log(role);
	}, [handleOptionChange]);

	const handleSubmit = async (e: FormEvent) => {
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
			showSuccess(`Usuario ${userCreated.name} creado con éxito`);
			setImageUrl('');
			setEmail('');
			setName('');
			setRole('');
		} catch (error) {
			console.error('Error al subir datos del usuario:', error);
			if (error instanceof Error) {
				showError(error.message);
			} else {
				showError('Error desconocido');
			}
		}
	};

	// Hook para generar la contraseña
	const { password, generatePassword } = usePasswordGenerator({});
	// Para copiar la contraseña
	const copyPassword = () => {
		navigator.clipboard
			.writeText(password)
			.then(() => {
				alert('¡Se copió la contraseña!');
			})
			.catch(err => {
				console.error('Error al copiar la contraseña: ', err);
			});
	};
	return (
		<>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}

			<div className='register'>
				<form onSubmit={handleSubmit}>
					<FileUpload
						setImageUrl={setImageUrl}
						fileType='images'
						fileFeature='employees'
					/>
					<p style={{ color: 'red' }}>
						{imageUrl === ''
							? 'No ha subido una imagen, ¿Quiere continuar?'
							: ''}
					</p>
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
							value='Generar contraseña'
						/>
						<p>{password}</p>
						<button type='button' onClick={copyPassword}>
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

					<button type='submit'>Crear usuario</button>
				</form>
			</div>
		</>
	);
}
