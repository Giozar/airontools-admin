import ActionCard from '@components/ActionCard';
import DeletionModal from '@components/DeletionModal';
import HeaderTitle from '@components/HeaderTitle';
import RoleChangeModal from '@components/RoleChangeModal';
import EditRoleIcon from '@components/svg/EditRoleIcon';
import EditUserIcon from '@components/svg/EditUserIcon';
import TrashIcon from '@components/svg/TrashIcon';
import useUserManagement from '@hooks/useUserManagement';
import useUsers from '@hooks/useUsers';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
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
						<div
							className='userpicture'
							style={{ backgroundImage: `url(${user.imageUrl})` }}
						></div>

						<p>{user.role.name}</p>

						<button
							className='editrol'
							onClick={() => setShowModalFor(user.id || '')}
						>
							<EditRoleIcon />
						</button>

						<button className='edit' onClick={() => handleEdit(user)}>
							<EditUserIcon />
						</button>

						<button
							className='delete'
							onClick={() => setShowDeletionModalFor(user.id || '')}
						>
							<TrashIcon />
						</button>

						{showDeletionModalFor === user.id && (
							<DeletionModal
								id={user.id}
								name={user.name}
								image={user.imageUrl || ''}
								onClose={() => handleCloseModal()}
								onCloseDelete={() => handleCloseModalDeletion(user.id || '')}
								onDelete={() => handleDelete(user.id || '', user.name)}
								message={deletionMessage}
							/>
						)}
						{showModalFor === user.id && (
							<RoleChangeModal
								userToEdit={user}
								onCloseModal={() => setShowModalFor(null)}
								onUpdateList={handleUpdateList}
							/>
						)}
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
			<HeaderApp />
			<main>
				<HeaderTitle title='Usuarios' />
				<div className='options users'>
					<ActionCard
						title='Crear Usuario'
						path={location.pathname + '/crear-usuario'}
					/>
					<ActionCard
						title='Crear Rol'
						path={location.pathname + '/crear-rol'}
					/>
				</div>
				<ReturnUsers />
			</main>
		</BasePage>
	);
}

function UserOptions() {
	return <ContentMainPage />;
}

export default UserOptions;
