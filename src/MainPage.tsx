import { useContext, useState } from 'react';
import { AuthContext } from './App';
import aironLogo from '/vite.svg';
import './MainPage.css';

function ContentMainPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const authContext = useContext(AuthContext);

    function toggleDarkMode() {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    }

    return (
        <div className='content'>
            <header>
                <h2>Acciones</h2>
                <div className='userinfo'>
                    <div className='userpic' style={{ backgroundImage: `url(${aironLogo})` }}></div>
                    <p>{authContext?.user?.name}</p>
                    <button onClick={toggleDarkMode}>
                        {isDarkMode ? 
                        //SVG de sol
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                        </svg>}
                    </button>
                </div>
            </header>
            <main>
                <div className="options">
                    {[  "Usuarios",
                        "Ver modificaciones de productos",
                        "Productos pendientes de aprobación",
                        "Ver catálogo completo de productos",
                        "Empleados"
                    ].map((title, index) => (
                        <ActionCard key={index} title={title} />
                    ))}
                </div>
            </main>
        </div>
    );
}


function ActionCard({ title }: { title: string }) {
    return (
        <button className="card">
            <dl>
                <dt>{title}</dt>
            </dl>
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </button>
    );
}
function ComboBox({ option }: { option: string }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }
    return (
    <>
        <button onClick={toggleOpen} className='combobox'>
            <span>{option}</span>
            <span className={`icon ${isOpen ? 'animate' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6"/>
                </svg>
            </span>
        </button>
        {isOpen && (
            <ul className='comboboxOptions'>
                {["Ver", "Crear", "Actualizar", "Eliminar"].map((action, index) => (
                    <li key={index}><a href={`#${action} ${option}`}>{action} {option}</a></li>
                ))}
            </ul>
        )}
    </>
    );
}
function Sidebar(){
    return (
        <div className='sidebar'>
            <div className='top'>
                <div className='title'>
                    <img src={aironLogo} alt="AironTools Logo" />
                    <h1>Administrador AironTools</h1>
                </div>
                <a href='#'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                    </svg>
                    Notificaciones
                </a>
                <ComboBox option='Productos' />
                <ComboBox option='Empleados' />
                <ComboBox option='Especificaciones' />
                <ComboBox option='Roles' />
            </div>
            <div className="bottom">
                <nav>
                    <a href="#">Información personal</a>
                    <a href="#">Seguridad</a>
                    <a href="#">Cerrar sesión</a>
                </nav>
            </div>
        </div>
    );
}



function Home(){
    return (
    <div className='mainPage'>
        <Sidebar/>
        <ContentMainPage/>  
    </div>
    );
}
export default Home;