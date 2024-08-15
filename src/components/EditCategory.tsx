import useCategoryUpdate from '@hooks/categories/useCategoryUpdate';
import useFetchCategoriesFromFamily from '@hooks/categories/useFetchCategoriesFromFamily';
import { CategoryDataToSend } from '@interfaces/Category.interface';
import { useEffect } from 'react';
import ShowManageCategory from './ShowManageCategory';
import ErrorMessage from './commons/ErrorMessage';
import SuccessMessage from './commons/SuccessMessage';

function EditCategory({
	familyId,
	update,
	updateCategoryList,
}: {
	familyId: string;
	update: boolean;
	updateCategoryList: () => void;
}) {
	const { errorLogCategory, successLogCategory, updateCategory } =
		useCategoryUpdate();
	const { categories, setCategories, fetchCategories } =
		useFetchCategoriesFromFamily();

	useEffect(() => {
		console.log(familyId);
		if (familyId) {
			fetchCategories(familyId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [familyId, update]);

	const handleCategoryNameChange = (value: string, categoryIndex: number) => {
		const updatedCategories = [...categories];
		updatedCategories[categoryIndex - 1].name = value;
		setCategories(updatedCategories);
	};

	const handleCategoryDescriptionChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedCategories = [...categories];
		updatedCategories[categoryIndex - 1].description = value;
		setCategories(updatedCategories);
	};
	const handleUpdateCategory = async (category: CategoryDataToSend) => {
		try {
			await updateCategory({
				...category,
			});
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const handleCategoryDeleteFromList = () => {
		updateCategoryList();
	};
	return (
		<>
			{successLogCategory.isSuccess && (
				<SuccessMessage message={successLogCategory.message} />
			)}
			{errorLogCategory.isError && (
				<ErrorMessage message={errorLogCategory.message} />
			)}
			<div className='categoryedit'>
				<ShowManageCategory
					categories={categories}
					countOfCategories={categories.length}
					handleCategoryNameChange={handleCategoryNameChange}
					handleCategoryDescriptionChange={handleCategoryDescriptionChange}
					handleUpdateCategory={handleUpdateCategory}
					handleCloseModalDeletion={handleCategoryDeleteFromList}
				/>
			</div>
		</>
	);
}
export default EditCategory;
