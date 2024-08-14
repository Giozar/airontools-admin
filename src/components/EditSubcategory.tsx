import { transformSubcategoryDataToBackend } from '@adapters/subcategory.adapter';
import useSubcategoryManagement from '@hooks/subcategories/useSubcategoryManagement';
import useSubcategoryUpdate from '@hooks/subcategories/useSubcategoryUpdate';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DeletionModal from './DeletionModal';
import Editables from './Editables';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import TrashIcon from './svg/TrashIcon';

function EditSubcategory({
	subcategories,
	setSubcategories,
	update,
}: {
	subcategories: SubcategoryDataFrontend[];
	setSubcategories: (subcategories: SubcategoryDataFrontend[]) => void;
	update: () => void;
}) {
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleCloseModal,
		handleDelete,
	} = useSubcategoryManagement();
	const { errorLogSubcategory, successLogSubcategory, updateSubcategory } =
		useSubcategoryUpdate();

	const handleUpdateSubcategory = async (
		subcategory: SubcategoryDataFrontend,
	) => {
		try {
			await updateSubcategory(
				transformSubcategoryDataToBackend({ ...subcategory }),
			);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleSubcategoryNameChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedSubcategories = [...subcategories];
		updatedSubcategories[categoryIndex - 1].name = value;
		setSubcategories(updatedSubcategories);
	};

	const handleSubcategoryDescriptionChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedSubcategories = [...subcategories];
		updatedSubcategories[categoryIndex - 1].description = value;
		setSubcategories(updatedSubcategories);
	};
	const [numberOfSpecifications, setNumberOfSpecifications] = useState<
		number | null
	>(null);
	const [numberOfProducts, setNumberOfProducts] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!showDeletionModalFor) {
			setNumberOfSpecifications(null);
			setNumberOfProducts(null);
			setLoading(false);
			return;
		}
		setLoading(true);
		const fetchCounts = async () => {
			try {
				const [specificationsResponse, productsResponse] = await Promise.all([
					axios.get(
						`${import.meta.env.VITE_API_URL}/specifications/countBySubcategory/${showDeletionModalFor}`,
					),
					axios.get(
						`${import.meta.env.VITE_API_URL}/products/countBySubcategory/${showDeletionModalFor}`,
					),
				]);
				setNumberOfSpecifications(specificationsResponse.data);
				setNumberOfProducts(productsResponse.data);
			} catch (error) {
				console.error('Error al contar especificaciones:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCounts();
	}, [showDeletionModalFor]);
	if (loading) {
		return <div>Cargando...</div>;
	}
	const confirmationInfo = () => {
		let mensaje = '';
		if (numberOfSpecifications && numberOfSpecifications > 0)
			mensaje += `Al borrar esta subcategoria se eliminarán ${numberOfSpecifications} especificaciones`;
		if (numberOfProducts && numberOfProducts > 0)
			mensaje += `. Además se afectarán ${numberOfProducts} productos`;
		return mensaje;
	};
	return (
		<>
			{successLogSubcategory.isSuccess && (
				<SuccessMessage message={successLogSubcategory.message} />
			)}
			{errorLogSubcategory.isError && (
				<ErrorMessage message={errorLogSubcategory.message} />
			)}
			<div id='subcategoriesList' className='categoryedit'>
				{subcategories.map((subcategory, subcategoryIndex) => (
					<div key={subcategoryIndex} className='category'>
						{showDeletionModalFor === subcategory.id && (
							<DeletionModal
								id={subcategory.id}
								name={subcategory.name}
								onClose={() => handleCloseModal()}
								onCloseDelete={update}
								onDelete={() =>
									handleDelete(subcategory.id || '', subcategory.name)
								}
								message={deletionMessage}
								confirmationInfo={confirmationInfo()}
							/>
						)}
						<button
							className='delete'
							onClick={() => setShowDeletionModalFor(subcategory.id || '')}
						>
							<TrashIcon />
						</button>
						<h2>
							<span>Subcategoría</span> {subcategory.name}{' '}
						</h2>
						<Editables
							what='Nombre'
							valueOf={subcategory.name}
							type='input'
							whichOne={subcategoryIndex + 1}
							onUpdateOne={handleSubcategoryNameChange}
						/>
						<Editables
							what='Descripción'
							valueOf={subcategory.description || ''}
							type='textarea'
							whichOne={subcategoryIndex + 1}
							onUpdateOne={handleSubcategoryDescriptionChange}
						/>
						<button
							className='save'
							onClick={() => handleUpdateSubcategory(subcategory)}
						>
							Guardar Cambios
						</button>
					</div>
				))}
			</div>
		</>
	);
}
export default EditSubcategory;
