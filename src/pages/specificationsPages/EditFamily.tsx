import HeaderTitle from '@components/HeaderTitle';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';

function ContentMainPage() {
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Categorización' />
				<div className='options users'>
					<p>ola para editar familias</p>
				</div>
			</main>
		</BasePage>
	);
}

function CategorizationMenu() {
	return <ContentMainPage />;
}

export default CategorizationMenu;
