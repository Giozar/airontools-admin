import UserForm from '@components/users/UserForm';
import BasePage from '@layouts/BasePage';
import '@pages/css/UserOptionsCreate.css';

function ContentMainPage() {
	return (
		<BasePage title='Crear Usuario'>
			<UserForm />
		</BasePage>
	);
}

function UserOptionCreate() {
	return <ContentMainPage />;
}

export default UserOptionCreate;
