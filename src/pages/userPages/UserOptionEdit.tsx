import HeaderApp from '../../layouts/HeaderApp';
//import {useLocation} from 'react-router-dom';
import BasePage from '../../layouts/BasePage';
import HeaderTitle from '../../components/HeaderTitle';
//import ActionCard from './ActionCard';

function ContentMainPage() {
    //const location = useLocation();
    return (
        <BasePage>
        <HeaderApp ruta="Acciones / Usuario / Editar Usuario" />
        <main>
          <HeaderTitle title="Editar Usuario" />
          <h1>ola soy editar</h1>
        </main>
      </BasePage>
    );
}

function UserOptionEdit(){
    return (
        <ContentMainPage/>  
    );
}
export default UserOptionEdit;
