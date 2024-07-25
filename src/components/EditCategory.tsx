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
	setNumberOfCategories,
}: {
	familyId: string;
	update: boolean;
	updateCategoryList: () => void;
	setNumberOfCategories: (n: number) => void;
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

	useEffect(() => {
		if (categories) setNumberOfCategories(categories.length);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categories]);

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
		<div className='categoryedit'>
			{successLogCategory.isSuccess && (
				<SuccessMessage message={successLogCategory.message} />
			)}
			{errorLogCategory.isError && (
				<ErrorMessage message={errorLogCategory.message} />
			)}
			<ShowManageCategory
				categories={categories}
				countOfCategories={categories.length}
				handleCategoryNameChange={handleCategoryNameChange}
				handleCategoryDescriptionChange={handleCategoryDescriptionChange}
				handleUpdateCategory={handleUpdateCategory}
				handleCloseModalDeletion={handleCategoryDeleteFromList}
			/>
		</div>
	);
}
export default EditCategory;
