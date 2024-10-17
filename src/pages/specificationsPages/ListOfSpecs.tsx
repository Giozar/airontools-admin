import ActionCard from '@components/commons/ActionCard';
import EditIcon from '@components/svg/EditIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { useAlert } from '@contexts/Alert/AlertContext';
import { useModal } from '@contexts/Modal/ModalContext';
import useSpecificationsManagement from '@hooks/specifications/useSpecificationsDelete';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import '@pages/css/listofspecs.css';
import { getSpecificationsService } from '@services/specifications/getSpecifications.service';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SpecificationsGrid() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [update, setUpdate] = useState(false);
	const [specifications, setSpecifications] = useState<SpecDataFrontend[]>([]);
	const { showAlert } = useAlert();
	const { openModal } = useModal();
	const { handleEdit, handleDelete } = useSpecificationsManagement();

	const handleOpenModal = (id: string, name: string) => {
		openModal(
			'Eliminar Especificacion',
			`Vas a eliminar la especificacion ${name}. ¿Estás seguro de que quieres continuar? `,
			() => {
				handleDelete(id, name);
				setUpdate(!update);
			},
			true,
			false,
		);
	};

	useEffect(() => {
		const fetchSpecifications = async () => {
			try {
				const specs = await getSpecificationsService();
				setSpecifications(specs);
			} catch (err) {
				const error = err as ErrorResponse;
				showAlert(
					`Error al cargar las especificaciones ${error.message}`,
					'error',
				);
			}
		};
		fetchSpecifications();
	}, [update]);

	const filteredSpecifications = specifications.filter(spec =>
		spec.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className='container'>
			<div className='search-bar'>
				<input
					type='text'
					placeholder='Buscar especificaciones...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>

			<div className='specifications-grid'>
				{filteredSpecifications.map(spec => (
					<div key={spec.id} className='specification-card'>
						<div className='buttons specs'>
							<button className='edit' onClick={() => handleEdit(spec)}>
								<EditIcon />
							</button>
							<button
								className='delete'
								onClick={() => {
									handleOpenModal(spec.id, spec.name);
								}}
							>
								<TrashIcon />
							</button>
						</div>
						<p className='spec-name'>{spec.name}</p>
						<p className='spec-created-by'>Creado por: {spec.createdBy.name}</p>
						<p className='spec-description'>{spec.description}</p>
						<p className='spec-unit'>Unidad: {spec.unit}</p>
						<div className='spec-metadata'>
							{spec.families.map((family, familyIndex) => (
								<span
									key={`family-${spec.id}-${family._id}-${familyIndex}`}
									className='meta-tag metafamily'
								>
									Familia: {family.name}
								</span>
							))}
							{spec.categories.map((category, categoryIndex) => (
								<span
									key={`category-${spec.id}-${category._id}-${categoryIndex}`}
									className='meta-tag metacategory'
								>
									Categoría: {category.name}
								</span>
							))}
							{spec.subcategories.map(
								(subcategory, subcategoryIndex) =>
									subcategory._id && (
										<span
											key={`subcategory-${spec.id}-${subcategory._id}-${subcategoryIndex}`}
											className='meta-tag metasubcategory'
										>
											Subcategoría: {subcategory.name}
										</span>
									),
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default function ListOfSpecs() {
	const location = useLocation();
	return (
		<>
			<div className='options users'>
				<ActionCard
					title='Crear Especificaciones'
					path={location.pathname + '/crear-especificaciones'}
				/>
			</div>
			<h2 className='listtitle'>Lista de especificaciones</h2>
			<SpecificationsGrid />
		</>
	);
}
