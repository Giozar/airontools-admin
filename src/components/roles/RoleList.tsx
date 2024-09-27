import { useAlert } from '@contexts/Alert/AlertContext';
import { useModal } from '@contexts/Modal/ModalContext';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { RoleDataFront } from '@interfaces/Role.interface';
import { getRolesService } from '@services/roles';
import { deleteRoleService } from '@services/roles/deleteRole.service';
import { useEffect, useState } from 'react';

interface RoleListState {
	roles: RoleDataFront[];
	loading: boolean;
	error: string | null;
}
const RoleDetails = ({ role }: { role: RoleDataFront }) => {
	return (
		<details className='role-details'>
			<summary className='role-details-summary'>{role.name}</summary>
			<div className='role-details-content'>
				<div className='role-details-item'>
					<span className='role-details-item-label'>ID:</span>
					<span className='role-details-item-value'>{role.id}</span>
				</div>
				<div className='role-details-item'>
					<span className='role-details-item-label'>Descripción:</span>
					<span className='role-details-item-value'>{role.description}</span>
				</div>
				<div className='role-details-item'>
					<span className='role-details-item-label'>Creado por:</span>
					<span className='role-details-item-value'>
						{role.createdBy?.name}
					</span>
				</div>
				<div className='role-details-item'>
					<span className='role-details-item-label'>Fecha de creación:</span>
					<span className='role-details-item-value'>
						{new Date(role.createdAt as string).toLocaleDateString()}
					</span>
				</div>
				<div className='role-details-item'>
					<span className='role-details-item-label'>Última Actualización:</span>
					<span className='role-details-item-value'>
						{new Date(role.updatedAt as string).toLocaleDateString()}
					</span>
				</div>
			</div>
		</details>
	);
};
function RoleList({ updateRole }: { updateRole?: boolean }) {
	const [state, setState] = useState<RoleListState>({
		roles: [],
		loading: true,
		error: null,
	});
	const { openModal } = useModal();
	const { showAlert } = useAlert();
	const handleOpenModal = (id: string, name: string) => {
		openModal(
			'Eliminar Rol',
			`Vas a eliminar el rol ${name}. ¿Estás seguro de que quieres continuar?`,
			() => handleDelete(id, name),
			false,
			false,
		);
	};

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const roles = await getRolesService();
				setState({
					roles,
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
	}, [updateRole]);

	const handleDelete = async (roleId: string, roleName: string) => {
		try {
			await deleteRoleService(roleId);
			showAlert(
				`El rol ${roleName} (${roleId}) ha sido eliminado correctamente.`,
				'success',
			);
			setTimeout(() => {
				window.location.reload();
			}, 300);
		} catch (error) {
			showAlert(
				`No se ha podido eliminar el rol ${roleName}. ${(error as ErrorResponse).message}`,
				'error',
			);
		}
	};

	const { roles, loading, error } = state;

	if (loading) return <p>Cargando roles...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className='role-list'>
			<h2>Lista de roles existentes</h2>
			<ul>
				{roles.map(role => (
					<li key={role.id}>
						<div>
							<RoleDetails role={role} />
						</div>
						{role.name !== 'Administrador' && (
							<button
								onClick={() => handleOpenModal(role.id as string, role.name)}
							>
								Eliminar rol
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default RoleList;
