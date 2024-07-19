import { useLocation} from 'react-router-dom';
import HeaderApp from '../../layouts/HeaderApp';
import '../css/UserOptions.css';
import BasePage from '../../layouts/BasePage';
import ActionCard from '../../components/ActionCard';
import HeaderTitle from '../../components/HeaderTitle';
import { useState } from 'react';
import RoleChangeModal from '../../components/RoleChangeModal';
import DeletionModal from '../../components/DeletionModal';
import EditIcon from '../../components/svg/EditIcon';
import EditRoleIcon from '../../components/svg/EditRoleIcon';
import TrashIcon from '../../components/svg/TrashIcon';
import useFetchUsers from '../../hooks/useFetchUsers';
import useUserManagement from '../../hooks/useUserManagement';

/* No se que hice con los custom hooks pero parece funcionar si puedes hacerlo mejor estaría chido */
function ReturnUsers() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {
    showDeletionModalFor,
    setShowDeletionModalFor,
    showModalFor,
    setShowModalFor,
    deletionMessage,
    handleEdit,
    handleCloseModal,
    handleDelete,
    handleUpdateList,
    updateListFlag
  } = useUserManagement();
  const { usersList,setUsersList, filteredUsers, setFilteredUsers,handleSearch } = useFetchUsers(updateListFlag);
  
  const handleCloseModalDeletion = (userid : string)=>{
    setUsersList(usersList.filter(user => user.id !== userid));
    setFilteredUsers(filteredUsers.filter(user => user.id !== userid));
  }

  return (
    <div className='userlist'>
      <h2>Lista de usuarios</h2>
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={searchTerm}
        onChange={(e) => {handleSearch(e.target.value);setSearchTerm(e.target.value)}}
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