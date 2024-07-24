import { CategoryFrontend } from '@adapters/category.adapter';
import useCategoryCreate from '@hooks/useCategoryCreate';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import ShowManageCategory from './ShowManageCategory';
import SuccessMessage from './SuccessMessage';

function CreateCategory({
	createdBy,
	familyId,
	updateCategoryList,
}: {
	createdBy: string;
	familyId: string;
	updateCategoryList: () => void;
}) {
	const { errorLogCategoryCreate, successLogCategoryCreate, createCategory } =
		useCategoryCreate();
	const [newCategories, setNewCategories] = useState<CategoryFrontend[]>([]);

	const addCategoryInput = () => {
		setNewCategories([
			...newCategories,
			{
				name: '',
				description: '',
				createdBy,
				path: '',
				familyId: '',
			},
		]);
	};
	const handleNewCategoryNameChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedCategories = [...newCategories];
		updatedCategories[categoryIndex - 1].name = value;
		setNewCategories(updatedCategories);
	};

	const handleNewCategoryDescriptionChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedCategories = [...newCategories];
		updatedCategories[categoryIndex - 1].description = value;
		setNewCategories(updatedCategories);
	};
	const handleCreateCategory = async (category: CategoryFrontend) => {
		try {
			await createCategory({
				...category,
				familyId,
				createdBy,
			});
			console.log(familyId, createdBy);
			updateCategoryList();
			setNewCategories(newCategories.filter(c => c !== category));
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const handleCategoryDeleteFromList = (category: CategoryFrontend) => {
		setNewCategories(newCategories.filter(c => c !== category));
		updateCategoryList();
	};
	return (
		<div className='categoryedit new'>
			<button onClick={addCategoryInput} className='add'>
				Agregar categorias
			</button>

			{successLogCategoryCreate.isSuccess && (
				<SuccessMessage message={successLogCategoryCreate.message} />
			)}
			{errorLogCategoryCreate.isError && (
				<ErrorMessage message={errorLogCategoryCreate.message} />
			)}
			<ShowManageCategory
				categories={newCategories}
				handleCategoryNameChange={handleNewCategoryNameChange}
				handleCategoryDescriptionChange={handleNewCategoryDescriptionChange}
				handleUpdateCategory={handleCreateCategory}
				handleCloseModalDeletion={handleCategoryDeleteFromList}
			/>
		</div>
	);
}
export default CreateCategory;
