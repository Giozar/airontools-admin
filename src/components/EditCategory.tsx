import useCategoryUpdate from '@hooks/categories/useCategoryUpdate';
import useFetchCategoriesFromFamily from '@hooks/categories/useFetchCategoriesFromFamily';
import useMultipleFileUpload from '@hooks/files/useMultipleFileUpload';
import { CategoryDataToSend } from '@interfaces/Category.interface';
import { useEffect, useState } from 'react';
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
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		console.log(familyId);
		if (familyId) {
			fetchCategories(familyId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [familyId, update, refresh]);

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
	const {
		filePreviews,
		handleFileSelect,
		handleRemoveFile,
		handleDeleteFile,
		handleFileUpload,
	} = useMultipleFileUpload();

	const handleImageUploadCategory = async (
		categoryId: string,
		index: number,
	) => {
		return await handleFileUpload(
			'images.category',
			categoryId,
			'images.category' + '.' + index,
		);
	};
	const handleUpdateCategory = async (
		category: CategoryDataToSend,
		index: number,
		removeImage: boolean,
	) => {
		try {
			if (removeImage && category.images)
				await handleDeleteFile(category.images[0]);
			const uploadedUrlImages = await handleImageUploadCategory(
				category._id || '',
				index,
			);

			await updateCategory({
				...category,
				images: uploadedUrlImages,
			});
			setRefresh(!refresh);
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
					filePreviews={filePreviews}
					onFileSelect={handleFileSelect}
					onRemoveFile={handleRemoveFile}
				/>
			</div>
		</>
	);
}
export default EditCategory;
