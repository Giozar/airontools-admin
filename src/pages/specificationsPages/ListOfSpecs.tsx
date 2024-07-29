import {
	SpecsFrontend,
	transformSpecsData,
} from '@adapters/specifications.adapter';
import DeletionModal from '@components/DeletionModal';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import EditIcon from '@components/svg/EditIcon';
import TrashIcon from '@components/svg/TrashIcon';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSpecificationsManagement from '@hooks/useSpecificationsManagement';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/css/listofspecs.css';
import { getSpecifications } from '@services/specifications/getSpecifications.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useEffect, useState } from 'react';

function SpecificationsGrid() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const { showError, errorLog } = useErrorHandling();
	const [specifications, setSpecifications] = useState<SpecsFrontend[]>([]);
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
				setSpecifications(specs.map(transformSpecsData));
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
						<p className='spec-created-by'> Creado por: {spec.createdBy}</p>
						<p className='spec-description'>{spec.description}</p>
						<p className='spec-unit'>Unidad: {spec.unit}</p>
						<div className='spec-metadata'>
							<span className='meta-tag metafamily'>
								Familia: {spec.familyId}
							</span>
							<span className='meta-tag metacategory'>
								Categoría: {spec.categoryId}
							</span>
							{spec.subcategoryId && (
								<span className='meta-tag metasubcategory'>
									Subcategoría: {spec.subcategoryId}
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
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Ver espeficaciones' />
				<SpecificationsGrid />
			</main>
		</BasePage>
	);
}

function ListOfSpecs() {
	return <ContentMainPage />;
}

export default ListOfSpecs;
