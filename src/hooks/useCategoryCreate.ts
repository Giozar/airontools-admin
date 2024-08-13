import { CategoryDataToSend } from '@interfaces/Category.interface';
import { createCategoryRequest } from '@services/categories/createCategory.service';
import { errorHandler } from '@utils/errorHandler.util';
import useErrorHandling from './common/useErrorHandling';
import useSuccessHandling from './common/useSuccessHandling';

const useCategoryCreate = () => {
	const {
		errorLog: errorLogCategoryCreate,
		showError: showErrorCategoryCreate,
	} = useErrorHandling();
	const {
		successLog: successLogCategoryCreate,
		showSuccess: showSuccessCategoryCreate,
	} = useSuccessHandling();

	const createCategory = async (categoryData: CategoryDataToSend) => {
		try {
			await createCategoryRequest(categoryData);
			showSuccessCategoryCreate('Categoría creada con éxito');
		} catch (error) {
			showErrorCategoryCreate('No se puedo crear la categoría');
			errorHandler(error);
		}
	};
	return { errorLogCategoryCreate, successLogCategoryCreate, createCategory };
};

export default useCategoryCreate;
