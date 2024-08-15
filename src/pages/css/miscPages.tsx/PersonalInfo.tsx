import { AuthContext } from '@contexts/AuthContext';
import BasePage from '@layouts/BasePage';
import { useContext } from 'react';

function ContentMainPage() {
	const authContext = useContext(AuthContext);
	const name = authContext?.user?.name || 'user';
	const image = authContext?.user?.imageUrl || 'user';
	const email = authContext?.user?.email || 'user';
	const role = authContext?.user?.role?.name || 'user';
	const roled = authContext?.user?.role?.description || 'user';

	const date = authContext?.user?.role?.createdAt || 'user';
	return (
		<BasePage title='Información personal'>
			<img src={image} style={{ width: '200px' }}></img>
			<p>
				<strong>Fecha de registro:</strong> {new Date(date).toLocaleString()}
			</p>
			<p>
				<strong>Nombre:</strong> {name}
			</p>
			<p>
				<strong>Correo:</strong> {email}
			</p>
			<p>
				<strong>Rol:</strong> {role}
			</p>
			<p>
				<strong>Descripción de Rol:</strong> {roled}
			</p>
		</BasePage>
	);
}

function Personal() {
	return <ContentMainPage />;
}
export default Personal;
