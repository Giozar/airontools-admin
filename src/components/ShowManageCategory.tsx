import { CategoryFrontend } from '@adapters/category.adapter';
import { SpecsFrontend } from '@adapters/specifications.adapter';
import SubcategoryModal from '@components/SubcategoryModal';
import useCategoryManagement from '@hooks/useCategoryManegement';
import { useState } from 'react';
import DeletionModal from './DeletionModal';
import Editables from './Editables';
import TrashIcon from './svg/TrashIcon';

interface ShowManageCategoryProps {
	categories: CategoryFrontend[];
	countOfCategories?: number;
	handleCategoryNameChange: (newName: string, index: number) => void;
	handleCategoryDescriptionChange: (
		newDescription: string,
		index: number,
	) => void;
	handleUpdateCategory: (updatedCategory: CategoryFrontend) => void;
	handleCloseModalDeletion: (updatedCategory: CategoryFrontend) => void;
	specifications: SpecsFrontend[];
}

function ShowManageCategory({
	categories,
	handleCategoryNameChange,
	handleCategoryDescriptionChange,
	handleUpdateCategory,
	handleCloseModalDeletion,
	specifications,
}: ShowManageCategoryProps) {
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleCloseModal,
		handleDelete,
	} = useCategoryManagement();

	const [subcategoriesLengths, setSubcategoriesLengths] = useState<{
		[key: string]: number;
	}>({});

	const handleUpdateSubcategoriesLength = (
		categoryId: string,
		length: number,
	) => {
		setSubcategoriesLengths(prevState => ({
			...prevState,
			[categoryId]: length,
		}));
	};

	return (
		<>
			{categories.map((category, categoryIndex) => (
				<div className='category' key={categoryIndex}>
					{showDeletionModalFor === category.id && (
						<DeletionModal
							id={category.id}
							name={category.name}
							onClose={() => handleCloseModal()}
							onCloseDelete={() => handleCloseModalDeletion(category)}
							onDelete={() => handleDelete(category.id || '', category.name)}
							message={deletionMessage}
							confirmationInfo={
								(subcategoriesLengths[category.id || ''] &&
									specifications.filter(spec => spec.categoryId === category.id)
										.length) > 0
									? `Al borrar esta categoría se eliminarán ${subcategoriesLengths[category.id || '']} subcategorías y ${
											specifications.filter(
												spec => spec.categoryId === category.id,
											).length
										} especificaciones`
									: specifications.filter(
												spec => spec.categoryId === category.id,
										  ).length > 0
										? `Al borrar esta categoría se eliminarán ${
												specifications.filter(
													spec => spec.categoryId === category.id,
												).length
											} especificaciones`
										: (subcategoriesLengths[category.id || ''] || 0) > 0
											? `Al borrar esta categoría se eliminarán ${subcategoriesLengths[category.id || '']} subcategorías`
											: null
							}
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
						valueOf={category.name}
						type='input'
						whichOne={categoryIndex + 1}
						onUpdateOne={handleCategoryNameChange}
					/>
					<Editables
						what='Descripción'
						valueOf={category.description}
						type='textarea'
						whichOne={categoryIndex + 1}
						onUpdateOne={handleCategoryDescriptionChange}
					/>
					{category.id && (
						<SubcategoryModal
							categoryId={category.id}
							categoryName={category.name}
							familyId={category.familyId}
							createdBy={category.createdBy}
							onUpdateSubcategoriesLength={handleUpdateSubcategoriesLength}
							specifications={specifications}
						/>
					)}

					<button
						className='save'
						onClick={() => handleUpdateCategory(category)}
					>
						{category.id ? 'Guardar Cambios' : 'Crear Categoría'}
					</button>
				</div>
			))}
		</>
	);
}
export default ShowManageCategory;
