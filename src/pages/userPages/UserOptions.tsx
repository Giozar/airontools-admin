import { useLocation, useNavigate } from 'react-router-dom';
import HeaderApp from '../../layouts/HeaderApp';
import '../css/UserOptions.css';
import BasePage from '../../layouts/BasePage';
import ActionCard from '../../components/ActionCard';
import HeaderTitle from '../../components/HeaderTitle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserDataBackend,UserDataFrontend,transformUserData } from '../../adapter';
import RoleChangeModal from '../../components/RoleChangeModal';
import DeletionModal from '../../components/DeletionModal';
import EditIcon from '../../components/svg/EditIcon';
import EditRoleIcon from '../../components/svg/EditRoleIcon';
import TrashIcon from '../../components/svg/TrashIcon';

function ReturnUsers() {
  const [usersList, setUsersList] = useState<UserDataFrontend[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<UserDataFrontend[]>([]);
  const [showDeletionModalFor, setShowDeletionModalFor] = useState<string | null>(null);
  const [showModalFor, setShowModalFor] = useState<string | null>(null);
  const [deletionMessage, setDeletionMessage] = useState<string | null>(null);
  const [updateListFlag, setUpdateListFlag] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  
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

  }, [updateListFlag]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = usersList.filter(user =>
      user.name.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };
  

  const handleEdit = (user: UserDataFrontend) => {
    navigate(location.pathname + `/editar-usuario`,{state:{user}});
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
  const handleUpdateList = () => {
    // Cambia el estado para activar el useEffect
    setUpdateListFlag(prevFlag => !prevFlag);
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
            
            <button className='editrol' onClick={() => setShowModalFor(user.id || "")}>
              <EditRoleIcon/>
            </button>

            <button className='edit' onClick={() => handleEdit(user)}>
              <EditIcon/>
            </button>

            <button className='delete' onClick={() => setShowDeletionModalFor(user.id || "")}>
              <TrashIcon/>
            </button>

            {showDeletionModalFor === user.id &&
              <DeletionModal
                userid={user.id}
                username={user.name}
                userimage={user.imageUrl || ""}
                onClose={()=>handleCloseModal()}
                onCloseDelete={()=>handleCloseModalDeletion(user.id || "")}
                onDelete={() => handleDelete(user.id || "",user.name)}
                message={deletionMessage}
              />
            }
            {showModalFor === user.id &&
            <RoleChangeModal
              userToEdit = {user}
              onCloseModal={() => setShowModalFor(null)}
              onUpdateList={handleUpdateList}
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