import { CategoryFrontend } from '@adapters/category.adapter';
import useCategoryUpdate from '@hooks/useCategoryUpdate';
import useFetchCategoriesFromFamily from '@hooks/useFetchCategoriesFromFamily';
import { useEffect } from 'react';
import ErrorMessage from './ErrorMessage';
import ShowManageCategory from './ShowManageCategory';
import SuccessMessage from './SuccessMessage';

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
	const handleUpdateCategory = async (category: CategoryFrontend) => {
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
