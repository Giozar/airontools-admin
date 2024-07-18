import { useLocation } from 'react-router-dom';
import HeaderApp from '../../layouts/HeaderApp';
import '../css/UserOptions.css';
import BasePage from '../../layouts/BasePage';
import ActionCard from '../../components/ActionCard';
import HeaderTitle from '../../components/HeaderTitle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserDataBackend,UserDataFrontend, transformUserData } from '../../adapter';


function DeletionModal({
  userid,
  username,
  userimage,
  onClose,
  onCloseDelete,
  onDelete,
  message
}: {
  userid: string | null;
  username: string | null;
  userimage: string;
  onClose: () => void;
  onCloseDelete: () => void;
  onDelete: () => void;
  message: string | null;
}) {
  const handleDeleteClick = () => {
    if (userid && username) {
      onDelete(); // Llama a onDelete para eliminar al usuario del servidor
    }
  };
  const handleContinueClick = (mensaje : string) =>{
    onClose();
    if (!mensaje.includes("No se ha podido eliminar")){
      onCloseDelete();
    }
  }
  return (
    <div>
      <div className="deletionmodal">
        {message ? (
          <div>
            <p>{message}</p>
            <button className="continue" onClick={() => handleContinueClick(message)}>Continuar</button>
          </div>
        ) : (
          <>
            <h2>Confirmación de Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar a {username}?</p>
            <img src={userimage} alt='usuario a eliminar' />
            <h4>{userid}</h4>
            <div className="buttons">
              <button className="cancel" onClick={onClose}>Cancelar</button>
              <button className="delete" onClick={handleDeleteClick}>Eliminar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


function ReturnUsers() {
  const [usersList, setUsersList] = useState<UserDataFrontend[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<UserDataFrontend[]>([]);
  const [showDeletionModalFor, setShowDeletionModalFor] = useState<string | null>(null);
  const [deletionMessage, setDeletionMessage] = useState<string | null>(null); // Nuevo state para el mensaje de eliminación

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserDataBackend[]>('http://localhost:4000/auth/users');
        const transformedUsers = response.data.map((user) => ({
          ...transformUserData(user)
        }));
        setUsersList(transformedUsers);
        setFilteredUsers(transformedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = usersList.filter(user =>
      user.name.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (userid: string) => {
    console.log("Se va a editar ", userid);
  };

  const handleEditRol = (userid: string) => {
    console.log("Se va a editar el rol de ", userid);
  };
  const handleCloseModal = () =>{
    setShowDeletionModalFor(null);
    setDeletionMessage(null);
  }
  const handleCloseModalDeletion = (userid : string)=>{
    setUsersList(usersList.filter(user => user.id !== userid));
    setFilteredUsers(filteredUsers.filter(user => user.id !== userid));
  }
  const handleDelete = async (userid: string, username: string) => {
    try {
      await axios.delete(`http://localhost:4000/auth/delete/${userid}`);
      // Cierra el modal
      setDeletionMessage(`Usuario ${username} (${userid}) ha sido eliminado correctamente.`);
      // Quita el usuario de la lista
      console.log(`Usuario ${userid} eliminado correctamente.`);
    } catch (error) {
      setDeletionMessage(`No se ha podido eliminar al usuario ${userid}.`);
      console.error(`Error al eliminar usuario ${userid}:`, error);
      
    }
  };

  return (
    <div className='userlist'>
      <h2>Lista de usuarios</h2>
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul>
        <li className='title'>
          <p>Id</p>
          <p>Nombre</p>
          <p>Foto</p>
          <p>Rol</p>
          <p>Cambiar Rol</p>
          <p>Editar</p>
          <p>Borrar</p>
        </li>
        {filteredUsers.map((user, index) => (
          <li key={index}>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <img src={user.imageUrl} alt={user.name} style={{ width: '50px', borderRadius: '50%' }} />
            <p>{user.roles}</p>
            
            <button className='editrol' onClick={() => handleEditRol(user.id)}>
              {/*ICONO DE EDITAR ROLES*/}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 21a8 8 0 0 1 10.434-7.62" />
                <circle cx="10" cy="8" r="5" />
                <circle cx="18" cy="18" r="3" />
                <path d="m19.5 14.3-.4.9" />
                <path d="m16.9 20.8-.4.9" />
                <path d="m21.7 19.5-.9-.4" />
                <path d="m15.2 16.9-.9-.4" />
                <path d="m21.7 16.5-.9.4" />
                <path d="m15.2 19.1-.9.4" />
                <path d="m19.5 21.7-.4-.9" />
                <path d="m16.9 15.2-.4-.9" />
              </svg>
            </button>

            <button className='edit' onClick={() => handleEdit(user.id)}>
              {/*ICONO DE EDITAR*/}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
                <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                <circle cx="10" cy="7" r="4" />
              </svg>
            </button>

            <button className='delete' onClick={() => setShowDeletionModalFor(user.id)}>
              {/*ICONO DE BASURA*/}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>

            {showDeletionModalFor === user.id &&
              <DeletionModal
                userid={user.id}
                username={user.name}
                userimage={user.imageUrl}
                onClose={()=>handleCloseModal()}
                onCloseDelete={()=>handleCloseModalDeletion(user.id)}
                onDelete={() => handleDelete(user.id,user.name)}
                message={deletionMessage}
              />
            }

          </li>
        ))}
      </ul>
    </div>
  );
}



function ContentMainPage() {
    const location = useLocation();
    return (
        <BasePage>
        <HeaderApp/>
        <main>
          <HeaderTitle title="Usuarios" />
          <div className='options users'>
            <ActionCard title='Crear Usuario' path={location.pathname+'/crear-usuario'}/>
            <ActionCard title='Crear Rol' path={location.pathname+'/crear-rol'}/>
          </div>
          <ReturnUsers/>
        </main>
      </BasePage>
    );
}

function UserOptions(){
    return (
        <ContentMainPage/>
    );
}

export default UserOptions;