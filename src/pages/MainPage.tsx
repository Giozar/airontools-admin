import HeaderApp from '../layouts/HeaderApp';
import {useLocation} from 'react-router-dom';
import BasePage from '../layouts/BasePage';
import ActionCard from '../components/ActionCard';
import HeaderTitle from '../components/HeaderTitle';

function ContentMainPage() {
    const location = useLocation();
    return (
        <BasePage>
        <HeaderApp/>
        <main>
          <HeaderTitle title="Acciones" />
          <div className="options">
            <ActionCard title="Usuarios" path={location.pathname + '/usuarios'} />
          </div>
        </main>
      </BasePage>
    );
}

function Home(){
    return (
        <ContentMainPage/>  
    );
}
export default Home;