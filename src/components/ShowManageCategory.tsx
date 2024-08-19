import { transformCategoryDataToBackend } from '@adapters/category.adapter';
import TrashIcon from '@components/svg/TrashIcon';
import useCategoryManagement from '@hooks/categories/useCategoryManegement';
import useFetchCounts from '@hooks/common/useFetchCounts';
import {
	CategoryDataFrontend,
	CategoryDataToSend,
} from '@interfaces/Category.interface';
import { ChangeEvent, useState } from 'react';
import DeletionModal from './commons/DeletionModal';
import ImageUploaderSingle from './commons/ImageUploaderSingle';
import Editables from './Editables';
import SubcategoryModal from './SubcategoryModal';

interface ShowManageCategoryProps {
	categories: CategoryDataFrontend[] | any[];
	countOfCategories?: number;
	handleCategoryNameChange: (newName: string, index: number) => void;
	handleCategoryDescriptionChange: (
		newDescription: string,
		index: number,
	) => void;
	handleUpdateCategory: (
		updatedCategory: CategoryDataToSend,
		index?: number,

		removeImage?: boolean,
	) => void;
	handleCloseModalDeletion:
		| ((updatedCategory: CategoryDataFrontend) => void)
		| ((updatedCategory: any) => void);
	filePreviews?: {
		[key: string]: string[];
	};
	onFileSelect?: (event: ChangeEvent<HTMLInputElement>, type: string) => void;
	onRemoveFile?: (type: string, index: number) => void;
}

function ShowManageCategory({
	categories,
	handleCategoryNameChange,
	handleCategoryDescriptionChange,
	handleUpdateCategory,
	handleCloseModalDeletion,
	filePreviews,
	onFileSelect,
	onRemoveFile,
}: ShowManageCategoryProps) {
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleCloseModal,
		handleDelete,
	} = useCategoryManagement();
	const {
		numberOfSubcategories,
		numberOfSpecifications,
		numberOfProducts,
		loading,
	} = useFetchCounts(
		showDeletionModalFor,
		{
			fetchSubcategories: true,
			fetchSpecifications: true,
			fetchProducts: true,
		},
		'ByCategory',
	);
	const [deleteCategoryImageToDelete, setDeleteCategoryImageToDelete] =
		useState<string[]>(new Array(categories.length).fill(''));

	const handleUpdateArray = (index: number, value: string) => {
		setDeleteCategoryImageToDelete(prevArray => {
			const newArray = [...prevArray];
			newArray[index] = value;
			return newArray;
		});
	};
	if (loading) {
		return <div>Cargando...</div>;
	}

	const confirmationInfo = () => {
		let mensaje = '';
		if (numberOfSubcategories && numberOfSubcategories > 0)
			mensaje += `Al borrar esta categoria se eliminarán ${numberOfSubcategories} subcategorías`;
		if (numberOfSpecifications && numberOfSpecifications > 0)
			mensaje += ` ${numberOfSpecifications} especificaciones`;
		if (numberOfProducts && numberOfProducts > 0)
			mensaje += `. Se afectarán ${numberOfProducts} productos`;
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
								onDelete={() =>
									handleDelete(
										category.id || '',
										category.name,
										category.images,
									)
								}
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
						{category.images &&
							filePreviews &&
							onFileSelect &&
							onRemoveFile && (
								<ImageUploaderSingle
									title={`Imagen:`}
									filePreviews={filePreviews}
									onFileSelect={onFileSelect}
									onRemoveFile={(type, index) => {
										onRemoveFile(type, index);
										handleUpdateArray(categoryIndex, category.images[0]);
									}}
									type={'category'}
									index={categoryIndex + 1}
									placeholder={
										deleteCategoryImageToDelete[categoryIndex] ===
										category.images[0]
											? ''
											: category.images[0]
									}
								/>
							)}

						<br></br>
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
								category.images
									? handleUpdateCategory(
											transformCategoryDataToBackend(category),
											categoryIndex + 1,
											deleteCategoryImageToDelete[categoryIndex] ===
												category.images[0],
										)
									: handleUpdateCategory(
											transformCategoryDataToBackend(category),
										)
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
