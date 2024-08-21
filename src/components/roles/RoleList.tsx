import { transformRoleDataFront } from '@adapters/role.adapter';
import DeletionModal from '@components/commons/DeletionModal';
import { airontoolsAPI } from '@configs/api.config';
import { RoleDataBack, RoleDataFront } from '@interfaces/Role.interface';
import axios from 'axios';
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
	const [updateRolei, setUpdateRolei] = useState(false);
	const [deletionMessage, setDeletionMessage] = useState<string | null>(null);
	const [showDeletionModalFor, setShowDeletionModalFor] = useState<
		string | null
	>(null);

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const response = await axios.get<RoleDataBack[]>(
					airontoolsAPI + '/roles',
				);
				setState({
					roles: response.data.map(role => transformRoleDataFront(role)),
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
	}, [updateRole, updateRolei]);
	const handleDelete = async ({
		roleName,
		roleId,
	}: {
		roleName: string;
		roleId: string;
	}) => {
		try {
			const response = await axios.delete(
				airontoolsAPI + `/roles/delete/${roleId}`,
			);
			console.log(response.data);
			setDeletionMessage(
				`El rol ${roleName} (${roleId}) ha sido eliminado correctamente.`,
			);
		} catch (error) {
			console.error(error);
			setDeletionMessage(`No se ha podido eliminar el rol ${roleName}.`);
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
								onClick={() => setShowDeletionModalFor(role.id as string)}
							>
								Eliminar rol
							</button>
						)}
						{showDeletionModalFor === role.id && (
							<DeletionModal
								id={role.id}
								name={`el rol ${role.name}`}
								onClose={() => {
									setShowDeletionModalFor(null);
									setDeletionMessage(null);
								}}
								onCloseDelete={() => setUpdateRolei(!updateRolei)}
								onDelete={() =>
									handleDelete({
										roleName: role.name,
										roleId: role.id as string,
									})
								}
								message={deletionMessage}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default RoleList;
