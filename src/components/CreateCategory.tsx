import useCategoryCreate from '@hooks/useCategoryCreate';
import { CategoryDataToSend } from '@interfaces/Category.interface';
import { useEffect, useState } from 'react';
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
	const [newCategories, setNewCategories] = useState<CategoryDataToSend[]>([]);
	const addCategoryInput = () => {
		setNewCategories([
			...newCategories,
			{
				name: '',
				description: '',
				createdBy,
				family: '',
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
	const handleCreateCategory = async (category: CategoryDataToSend) => {
		try {
			await createCategory({
				...category,
				family: familyId,
				createdBy,
			});
			console.log(familyId, createdBy);
			handleCategoryDeleteFromList(category);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleCategoryDeleteFromList = (category: CategoryDataToSend) => {
		setNewCategories(newCategories.filter(c => c.name !== category.name));
		updateCategoryList();
	};
	useEffect(() => {
		console.log(newCategories);
	}, [newCategories]);
	return (
		<>
			{successLogCategoryCreate.isSuccess && (
				<SuccessMessage message={successLogCategoryCreate.message} />
			)}
			{errorLogCategoryCreate.isError && (
				<ErrorMessage message={errorLogCategoryCreate.message} />
			)}
			<div className='categoryedit new'>
				<button onClick={addCategoryInput} className='add'>
					Agregar categorias
				</button>
				<ShowManageCategory
					categories={newCategories}
					handleCategoryNameChange={handleNewCategoryNameChange}
					handleCategoryDescriptionChange={handleNewCategoryDescriptionChange}
					handleUpdateCategory={handleCreateCategory}
					handleCloseModalDeletion={handleCategoryDeleteFromList}
				/>
			</div>
		</>
	);
}
export default CreateCategory;
