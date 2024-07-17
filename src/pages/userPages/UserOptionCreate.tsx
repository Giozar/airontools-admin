import HeaderApp from '../../layouts/HeaderApp';
//import {useLocation} from 'react-router-dom';
import BasePage from '../../layouts/BasePage';
import HeaderTitle from '../../components/HeaderTitle';
//import ActionCard from './ActionCard';

function ContentMainPage() {
    //const location = useLocation();
    return (
        <BasePage>
        <HeaderApp ruta="Acciones / Usuario / Crear Usuario" />
        <main>
          <HeaderTitle title="Crear Usuario" />
          <h1>ola soy crear</h1>
        </main>
      </BasePage>
    );
}

function UserOptionCreate(){
    return (
        <ContentMainPage/>  
    );
}
export default UserOptionCreate;