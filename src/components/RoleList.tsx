import axios from 'axios';
import { useEffect, useState } from 'react';
import ComboBox from './ComboBox';
import DeletionModal from './DeletionModal';

interface Role {
	_id: string;
	name: string;
	description: string;
	permissions: string[];
	createdBy: string;
	createdAt: string;
	updatedAt: string;
	updatedBy: string;
}

interface RoleListState {
	roles: Role[];
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
				const response = await axios.get<Role[]>(
					import.meta.env.VITE_API_URL + '/roles',
				);
				setState({
					roles: response.data,
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
					<li key={role._id}>
						<div>
							<ComboBox
								option={role.name}
								options={[
									`id: ${role._id}`,
									`Descripción: ${role.description}`,
									`Creado por: ${role.createdBy}`,
									`Fecha de creación: ${new Date(role.createdAt).toLocaleDateString()}`,
									`Última Actualización: ${new Date(role.updatedAt).toLocaleDateString()}`,
								]}
							/>
						</div>
						<button onClick={() => setShowDeletionModalFor(role._id)}>
							Eliminar rol
						</button>
						{showDeletionModalFor === role._id && (
							<DeletionModal
								id={role._id}
								name={`el rol ${role.name}`}
								onClose={() => {
									setShowDeletionModalFor(null);
									setDeletionMessage(null);
								}}
								onCloseDelete={() => setUpdateRolei(!updateRolei)}
								onDelete={() =>
									handleDelete({ roleName: role.name, roleId: role._id })
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
