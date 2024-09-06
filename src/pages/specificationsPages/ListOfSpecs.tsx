import ActionCard from '@components/commons/ActionCard';
import DeletionModal from '@components/commons/DeletionModal';
import ErrorMessage from '@components/commons/ErrorMessage';
import EditIcon from '@components/svg/EditIcon';
import TrashIcon from '@components/svg/TrashIcon';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useFetchCounts from '@hooks/common/useFetchCounts';
import useSpecificationsManagement from '@hooks/specifications/useSpecificationsDelete';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import '@pages/css/listofspecs.css';
import { getSpecifications } from '@services/specifications/getSpecifications.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SpecificationsGrid() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const { showError, errorLog } = useErrorHandling();
	const [specifications, setSpecifications] = useState<SpecDataFrontend[]>([]);
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleEdit,
		handleCloseModal,
		handleDelete,
	} = useSpecificationsManagement();
	const { numberOfProducts } = useFetchCounts(
		showDeletionModalFor,
		{
			fetchProducts: true,
		},
		'BySpecification',
	);

	const confirmationInfo = () => {
		if (numberOfProducts && numberOfProducts > 0)
			return `Se afectarán gravemente ${numberOfProducts} productos`;
	};

	useEffect(() => {
		const fetchSpecifications = async () => {
			try {
				const specs = await getSpecifications();
				setSpecifications(specs);
			} catch (error) {
				errorHandler(error, showError);
			}
		};
		fetchSpecifications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const filteredSpecifications = specifications.filter(spec =>
		spec.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleCloseModalDeletion = (specId: string) => {
		setSpecifications(specifications.filter(spec => spec.id !== specId));
	};

	return (
		<div className='container'>
			<ErrorMessage message={errorLog.message} />
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
								onClick={() => setShowDeletionModalFor(spec.id || '')}
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

						{showDeletionModalFor === spec.id && (
							<DeletionModal
								id={spec.id}
								name={spec.name}
								onClose={() => handleCloseModal()}
								onCloseDelete={() => handleCloseModalDeletion(spec.id || '')}
								onDelete={() => handleDelete(spec.id || '', spec.name)}
								message={deletionMessage}
								confirmationInfo={confirmationInfo()}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

function ContentMainPage() {
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

function ListOfSpecs() {
	return <ContentMainPage />;
}

export default ListOfSpecs;
