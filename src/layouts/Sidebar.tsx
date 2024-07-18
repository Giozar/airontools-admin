/* 
TODO: que tenga un css consistente durante todas las paginas
*/

import { Link, useNavigate } from 'react-router-dom';
import ComboBox from '../components/ComboBox';
import aironLogo from '/Logo-Blanco.png';
import { AuthContext } from '../App';
import { useContext } from 'react';


function Sidebar(){
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    
    const handleOptionSelected = (selectedOption: string) => {
        console.log("opcion seleccionada:", selectedOption);
      };
    const handleClose = () => {
        authContext?.setAuth({ isAuthenticated: false, user: null });
        navigate('/login');
    }
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
                options = {["Ver", "Crear", "Actualizar", "Eliminar"].map((val)=>val+' Herramientas')}
                onOptionSelected={handleOptionSelected}
                />
                <ComboBox option='Empleados'
                options = {["Ver", "Crear", "Actualizar", "Eliminar"].map((val)=>val+' Empleados')} 
                onOptionSelected={handleOptionSelected}/>
                <ComboBox option='Especificaciones'
                options = {["Ver", "Crear", "Actualizar", "Eliminar"].map((val)=>val+' Especificaciones')}
                onOptionSelected={handleOptionSelected} />
                <ComboBox option='Roles' 
                options = {["Ver", "Crear", "Actualizar", "Eliminar"].map((val)=>val+' Roles')}
                onOptionSelected={handleOptionSelected}/>
            </div>
            <div className="bottom">
                <nav>
                    <a href="#">Información personal</a>
                    <a href="#">Seguridad</a>
                    <Link to="/login" onClick={handleClose}>Cerrar sesión</Link>
                </nav>
            </div>
        </div>
    );
}
export default Sidebar;