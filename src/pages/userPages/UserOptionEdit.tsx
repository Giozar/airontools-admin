import HeaderApp from '../../layouts/HeaderApp';
import {useLocation} from 'react-router-dom';
import BasePage from '../../layouts/BasePage';
import HeaderTitle from '../../components/HeaderTitle';
import { UserDataBackend,UserDataFrontend, transformUserDataBack } from '../../adapter';
import { useUserRoles } from "../../hooks/useUserRoles";
import { UserRole } from "../../interfaces/UserRole";
import FileUpload from "../../components/FileUpload";
import { useEffect, useState } from 'react';
import axios from 'axios';
import useErrorHandling from '../../hooks/useErrorHandling';
import useSuccessHandling from '../../hooks/useSuccessHandling';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import usePasswordGenerator from '../../hooks/usePasswordGenerator';

interface RegisterResponse {
  token: string;
  user: UserDataBackend;
}

interface ValidationError {
  message: string[];
}

function EditUserForm({userToEdit}:{userToEdit:UserDataFrontend} ) {
  const [email, setEmail] = useState(userToEdit.email);
  const pastImageUrl = userToEdit.imageUrl;
  const [imageUrl, setImageUrl] = useState(userToEdit.imageUrl);
  const [name, setName] = useState(userToEdit.name);
  const { password, generatePassword } = usePasswordGenerator();
  const [roles, setRoles] = useState(userToEdit.roles);

  const { errorLog,showError } = useErrorHandling();
  const { successLog,showSuccess } = useSuccessHandling();
  
  const { userRoles: roleOptions } = useUserRoles(); /* recuperar roles */

  useEffect(() => {
  }, [imageUrl])
  

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoles(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   try {
      const response = await axios.put<RegisterResponse>(`http://localhost:4000/auth/update/${userToEdit.id}`, transformUserDataBack({ email, password, name, roles, imageUrl }));
      const { user } = response.data;
      console.log(user);
      showSuccess("Usuario Editado Con Éxito" );
    } catch (error) {
      if (!axios.isAxiosError<ValidationError>(error)) {
        console.error("Edition failed", error);
        return;
      }
      console.log(userToEdit.id)
      if (!error.response) return;
      console.log(error);
      const errorMessage = error.response.data.message;
      const message = Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage;
      showError(message);
    }
  };

  return (
    <>
      {successLog.isSuccess && <SuccessMessage message={successLog.message} />}
      {errorLog.isError && <ErrorMessage message={errorLog.message} />}

      <div className="register">
        <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '5rem' }}>
          <div>
          <h4>Imagen Actual</h4>
          <div className='profileimage' style={{ backgroundImage: `url(${pastImageUrl})` }}></div>
          </div>
          <div>
          <h4>Subir nueva imagen</h4>
          <FileUpload setImageUrl={setImageUrl} />
          </div>
        </div>
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            type="text"
            placeholder="Introduce tu nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Correo electrónico:</label>
          <input
            id="email"
            type="email"
            placeholder="Introduce tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña:</label>
          <div className="passwordgenerator">
            <input id="password" type="button" onClick={generatePassword} value="Generar nueva contraseña" />
            <p>{password}</p>
          </div>

          <label htmlFor="options">Rol:</label>
          <select id="options" value={roles} onChange={handleOptionChange}>
            {roleOptions.map((roleOption: UserRole, index) => (
              <option key={index} value={roleOption.name}>
                {roleOption.name}
              </option>
            ))}
          </select>
          
          <p style={{ color: 'red' }}>
            {imageUrl === '' ? 'No ha subido una imagen, ¿Quiere continuar?' : ''}
          </p>

          <button type="submit">Actualizar usuario</button>
        </form>
      </div>
    </>
  );
}

function ContentMainPage() {
    const location = useLocation();
    const { user } = location.state || { user: { id: 'N/A', name: 'Desconocido' } };
    return (
        <BasePage>
        <HeaderApp/>
        <main>
          <HeaderTitle title="Editar Usuario" />
          <EditUserForm userToEdit = {user}/>
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
