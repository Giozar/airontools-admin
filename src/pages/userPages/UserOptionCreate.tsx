import HeaderTitle from '@components/HeaderTitle';
import UserForm from '@components/UserForm';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/css/UserOptionsCreate.css';

function ContentMainPage() {
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Crear Usuario' />
				<UserForm />
			</main>
		</BasePage>
	);
}

function UserOptionCreate() {
	return <ContentMainPage />;
}

export default UserOptionCreate;
