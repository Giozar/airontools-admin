import { transformCategoryDataToBackend } from '@adapters/category.adapter';
import useCategoryManagement from '@hooks/categories/useCategoryManegement';
import {
	CategoryDataFrontend,
	CategoryDataToSend,
} from '@interfaces/Category.interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DeletionModal from './DeletionModal';
import Editables from './Editables';
import SubcategoryModal from './SubcategoryModal';
import TrashIcon from './svg/TrashIcon';

interface ShowManageCategoryProps {
	categories: CategoryDataFrontend[] | any[];
	countOfCategories?: number;
	handleCategoryNameChange: (newName: string, index: number) => void;
	handleCategoryDescriptionChange: (
		newDescription: string,
		index: number,
	) => void;
	handleUpdateCategory: (updatedCategory: CategoryDataToSend) => void;
	handleCloseModalDeletion:
		| ((updatedCategory: CategoryDataFrontend) => void)
		| ((updatedCategory: any) => void);
}

function ShowManageCategory({
	categories,
	handleCategoryNameChange,
	handleCategoryDescriptionChange,
	handleUpdateCategory,
	handleCloseModalDeletion,
}: ShowManageCategoryProps) {
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleCloseModal,
		handleDelete,
	} = useCategoryManagement();
	const [numberOfSubcategories, setNumberOfSubcategories] = useState<
		number | null
	>(null);
	const [numberOfSpecifications, setNumberOfSpecifications] = useState<
		number | null
	>(null);
	const [numberOfProducts, setNumberOfProducts] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!showDeletionModalFor) {
			setNumberOfSubcategories(null);
			setNumberOfSpecifications(null);
			setNumberOfProducts(null);
			setLoading(false);
			return;
		}
		setLoading(true);
		const fetchCounts = async () => {
			try {
				const [
					subcategoriesResponse,
					specificationsResponse,
					productsResponse,
				] = await Promise.all([
					axios.get(
						`${import.meta.env.VITE_API_URL}/subcategories/countByCategory/${showDeletionModalFor}`,
					),
					axios.get(
						`${import.meta.env.VITE_API_URL}/specifications/countByCategory/${showDeletionModalFor}`,
					),
					axios.get(
						`${import.meta.env.VITE_API_URL}/products/countByCategory/${showDeletionModalFor}`,
					),
				]);
				setNumberOfSubcategories(subcategoriesResponse.data);
				setNumberOfSpecifications(specificationsResponse.data);
				setNumberOfProducts(productsResponse.data);
			} catch (error) {
				console.error(
					'Error al contar subcategorias y especificaciones:',
					error,
				);
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
		if (numberOfSubcategories && numberOfSubcategories > 0)
			mensaje += `Al borrar esta categoria se eliminarán ${numberOfSubcategories} subcategorías`;
		if (numberOfSpecifications && numberOfSpecifications > 0)
			mensaje += ` y ${numberOfSpecifications} especificaciones`;
		if (numberOfProducts && numberOfProducts > 0)
			mensaje += `. Además se afectarán ${numberOfProducts} productos`;
		return mensaje;
	};
	return (
		<>
			{categories &&
				categories.map((category, categoryIndex) => (
					<div className='category' key={categoryIndex}>
						{showDeletionModalFor === category.id && (
							<DeletionModal
								id={category.id}
								name={category.name}
								onClose={() => handleCloseModal()}
								onCloseDelete={() => handleCloseModalDeletion(category)}
								onDelete={() => handleDelete(category.id || '', category.name)}
								message={deletionMessage}
								confirmationInfo={confirmationInfo()}
							/>
						)}
						<button
							className='delete'
							onClick={() =>
								category.id
									? setShowDeletionModalFor(category.id || '')
									: handleCloseModalDeletion(category)
							}
						>
							<TrashIcon />
						</button>
						<h2>
							<span> Categoría</span>
							{category.name}
						</h2>
						<Editables
							what='Nombre'
							valueOf={category?.name}
							type='input'
							whichOne={categoryIndex + 1}
							onUpdateOne={handleCategoryNameChange}
						/>
						<Editables
							what='Descripción'
							valueOf={category?.description || ''}
							type='textarea'
							whichOne={categoryIndex + 1}
							onUpdateOne={handleCategoryDescriptionChange}
						/>
						{category.id && (
							<SubcategoryModal
								categoryId={category.id}
								categoryName={category.name}
								familyId={category.family.id}
								createdBy={category.createdBy.id}
							/>
						)}
						<button
							className='save'
							onClick={() =>
								handleUpdateCategory(transformCategoryDataToBackend(category))
							}
						>
							{category.id ? 'Guardar Cambios' : 'Crear Categoría'}
						</button>
					</div>
				))}
		</>
	);
}
export default ShowManageCategory;
