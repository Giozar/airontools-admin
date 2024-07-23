import usePasswordGenerator from '@hooks/usePasswordGenerator';
import useUserCreate from '@hooks/useUserCreate';
import { useUserForm } from '@hooks/useUserForm';
import { useUserRoles } from '@hooks/useUserRoles';
import { UserRole } from '@interfaces/UserRole';
import { ChangeEvent, FormEvent } from 'react';
import ErrorMessage from './ErrorMessage';
import FileUpload from './FileUpload';
import SuccessMessage from './SuccessMessage';

export default function UserForm() {
	const {
		name,
		setName,
		email,
		setEmail,
		imageUrl,
		setImageUrl,
		roles,
		setRoles,
	} = useUserForm();

	const { successLog, errorLog, createUser } = useUserCreate();

	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setRoles(e.target.value);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createUser({ password, imageUrl, email, name, roles });
		} catch (error) {
			console.error('Error actualizando usuario:', error);
		}
	};

	// Hook para generar la contraseña
	const { password, generatePassword } = usePasswordGenerator({});

	// Se obtiene la lista de roles para el usuario
	const { userRoles: roleOptions } = useUserRoles();
	return (
		<>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}

			<div className='register'>
				<form onSubmit={handleSubmit}>
					<FileUpload setImageUrl={setImageUrl} />
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
					</div>

					<label htmlFor='options'>Rol:</label>
					<select id='options' value={roles} onChange={handleOptionChange}>
						{roleOptions.map((roleOption: UserRole, index) => (
							<option key={index} value={roleOption.name}>
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
