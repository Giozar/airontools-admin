import { CategoryFrontend } from '@adapters/category.adapter';
import SubcategoryModal from '@components/SubcategoryModal';
import useCategoryManagement from '@hooks/useCategoryManegement';
import DeletionModal from './DeletionModal';
import Editables from './Editables';
import TrashIcon from './svg/TrashIcon';

interface ShowManageCategoryProps {
	categories: CategoryFrontend[];
	handleCategoryNameChange: (newName: string, index: number) => void;
	handleCategoryDescriptionChange: (
		newDescription: string,
		index: number,
	) => void;
	handleUpdateCategory: (updatedCategory: CategoryFrontend) => void;
	handleCloseModalDeletion: (updatedCategory: CategoryFrontend) => void;
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
					<h2>Categoría: {category.name} </h2>
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
