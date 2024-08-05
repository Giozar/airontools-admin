import ActionCard from '@components/ActionCard';
import DeletionModal from '@components/DeletionModal';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import EditIcon from '@components/svg/EditIcon';
import TrashIcon from '@components/svg/TrashIcon';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSpecificationsManagement from '@hooks/useSpecificationsManagement';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
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
	useEffect(() => {
		const fetchSpecifications = async () => {
			try {
				const specs = await getSpecifications();
				setSpecifications(specs);
				console.log(specs);
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
			{<ErrorMessage message={errorLog.message} />}
			<div className='search-bar'>
				<input
					type='text'
					placeholder='Buscar especificaciones...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>

			<div className='specifications-grid'>
				{filteredSpecifications.map((spec, index) => (
					<div key={index} className='specification-card'>
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
						<p className='spec-created-by'>
							{' '}
							Creado por: {spec.createdBy.name}
						</p>
						<p className='spec-description'>{spec.description}</p>
						<p className='spec-unit'>Unidad: {spec.unit}</p>
						<div className='spec-metadata'>
							<span className='meta-tag metafamily'>
								Familia: {spec.family.name}
							</span>
							<span className='meta-tag metacategory'>
								Categoría: {spec.category.name}
							</span>
							{spec.subcategory._id && (
								<span className='meta-tag metasubcategory'>
									Subcategoría: {spec.subcategory.name}
								</span>
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
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Especificaciones' />
				<div className='options users'>
					<ActionCard
						title='Crear Especificaciones'
						path={location.pathname + '/crear-especificaciones'}
					/>
				</div>
				<h2 className='listtitle'>Lista de especificaciones</h2>
				<SpecificationsGrid />
			</main>
		</BasePage>
	);
}

function ListOfSpecs() {
	return <ContentMainPage />;
}

export default ListOfSpecs;
