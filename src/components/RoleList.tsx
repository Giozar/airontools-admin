import { transformRoleDataFront } from '@adapters/role.adapter';
import { RoleDataBack, RoleDataFront } from '@interfaces/Role.interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ComboBox from './ComboBox';
import DeletionModal from './commons/DeletionModal';

interface RoleListState {
	roles: RoleDataFront[];
	loading: boolean;
	error: string | null;
}

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
					import.meta.env.VITE_API_URL + '/roles',
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
				import.meta.env.VITE_API_URL + `/roles/delete/${roleId}`,
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
							<ComboBox
								option={role.name}
								options={[
									`id: ${role.id}`,
									`Descripción: ${role.description}`,
									`Creado por: ${role.createdBy?.name}`,
									`Fecha de creación: ${new Date(role.createdAt as string).toLocaleDateString()}`,
									`Última Actualización: ${new Date(role.updatedAt as string).toLocaleDateString()}`,
								]}
							/>
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
