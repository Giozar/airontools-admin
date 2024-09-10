import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { CategoryDataToSend } from '@interfaces/Category.interface';
import { updateCategoryRequest } from '@services/categories/updateCategory.service';

const useCategoryUpdate = () => {
	const { errorLog: errorLogCategory, showError: showErrorCategory } =
		useErrorHandling();
	const { successLog: successLogCategory, showSuccess: showSuccessCategory } =
		useSuccessHandling();

	const updateCategory = async (categoryData: CategoryDataToSend) => {
		try {
			updateCategoryRequest(categoryData._id as string, categoryData);
			showSuccessCategory('Categoría actualizada Con Éxito');
		} catch (error) {
			showErrorCategory('Error al actualizar la categoría');
		}
	};
	return { errorLogCategory, successLogCategory, updateCategory };
};

export default useCategoryUpdate;
