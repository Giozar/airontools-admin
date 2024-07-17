/* Se encuentra el header principal de la página
TODO: hacer componente breadcrumbs para que el titulo se actualice dinamicamente
TODO: hacer que el css sea generico para todas las paginas
TODO: que el darkmode se guarde en un contexto*/
import aironLogo from '/vite.svg';
import { useContext, useState } from 'react';
import { AuthContext } from '../App';
import Breadcrumb from '../components/Breadcrumb';

function HeaderApp(){
    const [isDarkMode, setIsDarkMode] = useState(false);
    const authContext = useContext(AuthContext);

    function toggleDarkMode() {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    }
    return(
        <header>
            
            <h2><Breadcrumb/></h2>
            
            <div className='userinfo'>
                <div className='userpic' style={{ backgroundImage: `url(${aironLogo})` }}></div>
                <p>{authContext?.user?.name} <span>({authContext?.user?.roles})</span></p>
                <button onClick={toggleDarkMode}>
                    {isDarkMode ? 
                    //SVG de sol
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2"/>
                    <path d="M12 20v2"/>
                    <path d="m4.93 4.93 1.41 1.41"/>
                    <path d="m17.66 17.66 1.41 1.41"/>
                    <path d="M2 12h2"/>
                    <path d="M20 12h2"/>
                    <path d="m6.34 17.66-1.41 1.41"/>
                    <path d="m19.07 4.93-1.41 1.41"/>
                    </svg>
                    : //SVG de luna
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                    </svg>}
                </button>
            </div>
        </header>
    );
}

export default HeaderApp;