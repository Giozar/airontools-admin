import ActionCard from '@components/commons/ActionCard';
import TableComponent from '@components/commons/DynamicTable';
import RoleChangeModal from '@components/roles/RoleChangeModal';
import EditRoleIcon from '@components/svg/EditRoleIcon';
import EditUserIcon from '@components/svg/EditUserIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useModal } from '@contexts/Modal/ModalContext';
import useFetchUsers from '@hooks/users/useFetchUsers';
import useUserManagement from '@hooks/users/useUserManagement';

import { UserDataFrontend } from '@interfaces/User.interface';
import '@pages/css/UserOptions.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

/* No se que hice con los custom hooks pero parece funcionar si puedes hacerlo mejor estaría chido */
function ReturnUsers() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const { user: loggedUser } = useAuthContext();
	const { handleEdit, handleDelete } = useUserManagement();
	const { filteredUsers, handleSearch } = useFetchUsers();
	const { openModal } = useModal();

	const [showModalFor, setShowModalFor] = useState<string | null>(null);
	const handleOpenModal = (userToDelete: UserDataFrontend) => {
		openModal(
			'Eliminar Usuario',
			`Vas a eliminar el usuario ${userToDelete.name}. ¿Estás seguro de que quieres continuar? `,
			() => {
				handleDelete(userToDelete);
			},
			false,
			false,
		);
	};
	const tableData = {
		headers: ['ID', 'Nombre', 'Foto', 'Rol', 'Cambiar Rol', 'Editar', 'Borrar'],
		rows: filteredUsers
			.filter(
				user => !(user.name === 'root' && user.role?.name === 'Administrador'),
			)
			.map(user => [
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
					className='table__button table__button--edit-role' // Clase BEM para cambiar rol
					onClick={() => setShowModalFor(user.id || '')}
				>
					<EditRoleIcon />
				</button>,
				<button
					key={user.id + 'edit'}
					className='table__button table__button--edit' // Clase BEM para editar
					onClick={() => handleEdit(user)}
				>
					<EditUserIcon />
				</button>,
				<button
					key={user.id + 'delete'}
					className={`table__button table__button--delete ${user.role?.name === 'Administrador' && !(loggedUser?.name === 'root' && loggedUser?.role?.name === 'Administrador') ? 'table__button--disabled' : ''}`}
					onClick={() => handleOpenModal(user)}
					disabled={
						user.role?.name === 'Administrador' &&
						!(
							loggedUser?.name === 'root' &&
							loggedUser?.role?.name === 'Administrador'
						)
					}
				>
					<TrashIcon />
				</button>,
			]),
	};

	return (
		<div className='user-list'>
			<h2 className='user-list__title'>Lista de usuarios</h2>
			<input
				type='text'
				placeholder='Buscar usuarios...'
				value={searchTerm}
				onChange={e => {
					handleSearch(e.target.value);
					setSearchTerm(e.target.value);
				}}
				className='user-list__search'
			/>
			<TableComponent data={tableData} />
			{showModalFor && (
				<RoleChangeModal
					userToEdit={filteredUsers.find(p => p.id === showModalFor) || null}
					onCloseModal={() => setShowModalFor(null)}
				/>
			)}
		</div>
	);
}

export default function UserOptions() {
	const location = useLocation();
	return (
		<>
			<div className='options users'>
				<ActionCard
					title='Crear Usuario'
					path={location.pathname + '/crear-usuario'}
				/>
				<ActionCard title='Crear Rol' path={location.pathname + '/crear-rol'} />
			</div>
			<ReturnUsers />
		</>
	);
}
