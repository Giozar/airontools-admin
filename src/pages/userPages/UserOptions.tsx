import ActionCard from '@components/commons/ActionCard';
import DeletionModal from '@components/commons/DeletionModal';
import TableComponent from '@components/commons/DynamicTable';
import RoleChangeModal from '@components/RoleChangeModal';
import EditRoleIcon from '@components/svg/EditRoleIcon';
import EditUserIcon from '@components/svg/EditUserIcon';
import TrashIcon from '@components/svg/TrashIcon';
import useUserManagement from '@hooks/users/useUserManagement';
import useUsers from '@hooks/users/useUsers';
import BasePage from '@layouts/BasePage';
import '@pages/css/UserOptions.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

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
		updateListFlag,
	} = useUserManagement();
	const {
		usersList,
		setUsersList,
		filteredUsers,
		setFilteredUsers,
		handleSearch,
	} = useUsers(updateListFlag);

	const handleCloseModalDeletion = (userid: string) => {
		setUsersList(usersList.filter(user => user.id !== userid));
		setFilteredUsers(filteredUsers.filter(user => user.id !== userid));
	};
	const tableData = {
		headers: ['ID', 'Nombre', 'Foto', 'Rol', 'Cambiar Rol', 'Editar', 'Borrar'],
		rows: filteredUsers.map(user => [
			user.id,
			user.name,
			<div
				key={user.id}
				className='userpicture'
				style={{ backgroundImage: `url(${user.imageUrl})` }}
			></div>,
			user.role?.name,
			<button
				key={user.id + 'role'}
				className='editrol'
				onClick={() => setShowModalFor(user.id || '')}
			>
				<EditRoleIcon />
			</button>,
			<button
				key={user.id + 'edit'}
				className='edit'
				onClick={() => handleEdit(user)}
			>
				<EditUserIcon />
			</button>,
			<button
				key={user.id + 'delete'}
				className='delete'
				style={
					user.name === 'root' && user.role?.name === 'Administrador'
						? { opacity: '0.2' }
						: {}
				}
				onClick={() => setShowDeletionModalFor(user.id || '')}
				disabled={user.name === 'root' && user.role?.name === 'Administrador'}
			>
				<TrashIcon />
			</button>,
		]),
	};

	return (
		<div className='userlist'>
			<h2 className='listtitle'>Lista de usuarios</h2>
			<input
				type='text'
				placeholder='Buscar usuarios...'
				value={searchTerm}
				onChange={e => {
					handleSearch(e.target.value);
					setSearchTerm(e.target.value);
				}}
				className='search'
			/>
			<TableComponent data={tableData} />
			{showDeletionModalFor && (
				<DeletionModal
					id={showDeletionModalFor}
					image={
						filteredUsers.find(p => p.id === showDeletionModalFor)?.imageUrl ||
						''
					}
					name={
						filteredUsers.find(p => p.id === showDeletionModalFor)?.name || ''
					}
					onClose={() => handleCloseModal()}
					onCloseDelete={() => handleCloseModalDeletion(showDeletionModalFor)}
					onDelete={() =>
						handleDelete(
							filteredUsers.find(p => p.id === showDeletionModalFor) || null,
						)
					}
					message={deletionMessage}
				/>
			)}

			{showModalFor && (
				<RoleChangeModal
					userToEdit={filteredUsers.find(p => p.id === showModalFor) || null}
					onCloseModal={() => setShowModalFor(null)}
					onUpdateList={handleUpdateList}
				/>
			)}
		</div>
	);
}

function ContentMainPage() {
	const location = useLocation();
	return (
		<BasePage title='Usuarios'>
			<div className='options users'>
				<ActionCard
					title='Crear Usuario'
					path={location.pathname + '/crear-usuario'}
				/>
				<ActionCard title='Crear Rol' path={location.pathname + '/crear-rol'} />
			</div>
			<ReturnUsers />
		</BasePage>
	);
}

function UserOptions() {
	return <ContentMainPage />;
}

export default UserOptions;
