import { useState } from "react";
import { transformUserDataBack, UserDataBackend, UserDataFrontend } from "../adapter";
import { useUserRoles } from "../hooks/useUserRoles";
import useErrorHandling from "../hooks/useErrorHandling";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { UserRole } from "../interfaces/UserRole";
import './css/roleChangeModal.css';

interface RegisterResponse {
    token: string;
    user: UserDataBackend;
}
interface ValidationError {
    message: string[];
}

interface RoleChangeModalProps {
    userToEdit: UserDataFrontend;
    onCloseModal: () => void;
    onUpdateList: () => void;
}

function RoleChangeModal({
    userToEdit,
    onCloseModal,
    onUpdateList
} : RoleChangeModalProps){

    const { userRoles: roleOptions } = useUserRoles();
    const [roles, setRoles] = useState(userToEdit.roles);
    const { errorLog,showError } = useErrorHandling();
    
    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRoles(e.target.value);
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
     try {
        await axios.put<RegisterResponse>(`http://localhost:4000/auth/update/${userToEdit.id}`, transformUserDataBack({
          ...userToEdit,
          roles,
        }));
        onUpdateList();
        onCloseModal();

      } catch (error) {
        
        if (!axios.isAxiosError<ValidationError>(error)) {
          console.error("Edition failed", error);
          return;
        }
        
        if (!error.response) return;
        const errorMessage = error.response.data.message;
        const message = Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage;
        showError(message);
      }
    };
  
    
    return(<>
    {errorLog.isError && <ErrorMessage message={errorLog.message} />}
    <form onSubmit={handleSubmit} className='choserol'>
  
    <label htmlFor="options">Nuevo rol:</label>
      <select id="options" value={roles} onChange={handleOptionChange}>
        {roleOptions.map((roleOption: UserRole, index) => (
          <option key={index} value={roleOption.name}>
            {roleOption.name}
          </option>
        ))}
      </select>
      <button type='submit'>Cambiar</button>
    </form>
    </>);
  }
  export default RoleChangeModal;