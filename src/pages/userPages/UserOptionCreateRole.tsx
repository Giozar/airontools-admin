import HeaderApp from '../../layouts/HeaderApp';
//import {useLocation} from 'react-router-dom';
import BasePage from '../../layouts/BasePage';
import HeaderTitle from '../../components/HeaderTitle';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../css/UserOptionsCreateRole.css'
import { AuthContext } from '../../App';
import ComboBox from '../../components/ComboBox';
import useErrorHandling from '../../hooks/useErrorHandling';
import useSuccessHandling from '../../hooks/useSuccessHandling';
import SuccessMessage from '../../components/SuccessMessage';
import ErrorMessage from '../../components/ErrorMessage';

function CreateRoleForm () {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const authContext = useContext(AuthContext);
  const createdBy = authContext?.user?.name;
  const { errorLog,showError } = useErrorHandling();
  const { successLog,showSuccess } = useSuccessHandling();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/roles/create', {
        name,
        description,
        createdBy
      });
      console.log('Role created successfully:', response.data);
      showSuccess('Rol creado con éxito');
      // Optionally reset form fields
      setName('');
      setDescription('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Error desconocido';
        showError(errorMessage);
      } else {
        showError('Error desconocido');
      }
      console.error('Error creating role:', error);
    }
  };

  return (
    <div className="create-role-form">
      {successLog.isSuccess && <SuccessMessage message={successLog.message} />}
      {errorLog.isError && <ErrorMessage message={errorLog.message} />}

      <h2>Crear Nuevo Rol</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre del Rol:</label>
        <input
          id="name"
          type="text"
          placeholder="Introduce el nombre del rol"
          value={name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">Descripción:</label>
        <input
          id="description"
          type="text"
          placeholder="Introduce la descripción del rol"
          value={description}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="createdBy">Creado Por:</label>
        <input 
          className='createdby'
          id="createdBy"
          type="text"
          placeholder="Introduce el nombre del creador"
          value={createdBy}
          readOnly
        />

        <button type="submit">Crear Rol</button>
      </form>
    </div>
  );
}

interface Role {
    _id: string;
    name: string;
    description: string;
    permissions: string[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
  }
  
  // Define the state shape for roles and errors
  interface RoleListState {
    roles: Role[];
    loading: boolean;
    error: string | null;
  }
  
  const RoleList: React.FC = () => {
    const [state, setState] = useState<RoleListState>({
      roles: [],
      loading: true,
      error: null,
    });
  
    useEffect(() => {
      // Fetch roles from the API
      const fetchRoles = async () => {
        try {
          const response = await axios.get<Role[]>('http://localhost:4000/roles');
          setState({
            roles: response.data,
            loading: false,
            error: null,
          });
        } catch (error) {
          setState({
            roles: [],
            loading: false,
            error: 'Error fetching roles',
          });
        }
      };
  
      fetchRoles();
    }, []);
  
    const { roles, loading, error } = state;
  
    if (loading) return <p>Loading roles...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <div className="role-list">
        <h2>Lista de roles existentes</h2>
        <ul>
          {roles.map((role) => (
            <li key={role._id}>
                <ComboBox option={role.name} options={[
                    `Descripción: ${role.description}`,
                    `Creado por: ${role.createdBy}`,
                    `Fecha de creación: ${new Date(role.createdAt).toLocaleDateString()}`,
                    `Última Actualización: ${new Date(role.updatedAt).toLocaleDateString()}`
                ]}/>
            </li>
          ))}
        </ul>
      </div>
    );
  };

function ContentMainPage() {
    //const location = useLocation();
    return (
        <BasePage>
        <HeaderApp/>
        <main>
          <HeaderTitle title="Crear rol de Usuario" />
          <div className='cuerpo'>
          <CreateRoleForm/>
          <RoleList/>
          </div>
          
        </main>
      </BasePage>
    );
}

function UserOptionCreateRole(){
    return (
        <ContentMainPage/>  
    );
}
export default UserOptionCreateRole;
