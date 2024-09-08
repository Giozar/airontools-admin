import { useAuthContext } from '@contexts/auth/AuthContext';

function ContentMainPage() {
	const { user } = useAuthContext();
	return (
		user && (
			<>
				<img src={user.imageUrl} style={{ width: '200px' }}></img>
				<p>
					<strong>Fecha de registro:</strong>{' '}
					{new Date(user?.createdAt as string).toLocaleString()}
				</p>
				<p>
					<strong>Nombre:</strong> {user.name}
				</p>
				<p>
					<strong>Correo:</strong> {user.email}
				</p>
				<p>
					<strong>Rol:</strong> {user.role?.name}
				</p>
				<p>
					<strong>Descripción de Rol:</strong> {user.role?.description}
				</p>
			</>
		)
	);
}

function Personal() {
	return <ContentMainPage />;
}
export default Personal;
