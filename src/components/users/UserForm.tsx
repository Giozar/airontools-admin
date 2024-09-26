import { useRoles } from '@hooks/roles/useRoles';
import { RoleDataFront } from '@interfaces/Role.interface';

import TextInput from '@components/commons/TextInput';
import SingleImageUpload from '@components/files/SingleFileUpload';
import { useUserContext } from '@contexts/User/UserContext';
import useUsers from '@hooks/users/useUsers';
import { copyPassword } from '@utils/copyPassword.util';
import { generatePassword } from '@utils/generatePassword';

export default function UserForm({ user }: { user: string | null }) {
	const {
		name,
		setName,
		email,
		setEmail,
		imageUrl,
		rawImage,
		setRawImage,
		role,
		setRole,
		password,
		setPassword,
	} = useUserContext();
	const { roles: roleOptions } = useRoles();
	const { handleSubmitUpdate, handleSubmitCreate } = useUsers(user);

	return (
		<>
			<div className='register'>
				<form onSubmit={user ? handleSubmitUpdate : handleSubmitCreate}>
					<SingleImageUpload
						filePreview={
							rawImage ? URL.createObjectURL(rawImage) : imageUrl || ''
						}
						setFilePreview={setRawImage}
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
							onClick={() => setPassword(generatePassword())}
							value='Generar contraseña'
						/>
						<p>{password}</p>
						<button type='button' onClick={() => copyPassword(password)}>
							Copiar contraseña
						</button>
					</div>
					<label htmlFor='options'>Rol:</label>
					<select
						id='options'
						value={role}
						onChange={e => setRole(e.target.value)}
					>
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
