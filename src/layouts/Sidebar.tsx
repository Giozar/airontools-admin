/* 
TODO: que tenga un css consistente durante todas las paginas
*/

import ComboBox from '../components/ComboBox';
import aironLogo from '/vite.svg';


function Sidebar(){
    return (
        <div className='sidebar'>
            <div className='top'>
                <div className='title'>
                    <img src={aironLogo} alt="AironTools Logo" />
                    <h1>Administrador AironTools</h1>
                </div>
                <a href='#'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                    </svg>
                    Notificaciones
                </a>
                <ComboBox option='Herramientas' 
                options = {["Ver", "Crear", "Actualizar", "Eliminar"].map((val)=>val+' Herramientas')}/>
                <ComboBox option='Empleados'
                options = {["Ver", "Crear", "Actualizar", "Eliminar"].map((val)=>val+' Empleados')} />
                <ComboBox option='Especificaciones'
                options = {["Ver", "Crear", "Actualizar", "Eliminar"].map((val)=>val+' Especificaciones')} />
                <ComboBox option='Roles' 
                options = {["Ver", "Crear", "Actualizar", "Eliminar"].map((val)=>val+' Roles')}/>
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
export default Sidebar;