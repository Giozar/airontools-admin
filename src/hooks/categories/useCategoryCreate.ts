import { useAlert } from '@contexts/Alert/AlertContext';
import { CategoryDataToSend } from '@interfaces/Category.interface';
import { createCategoryService } from '@services/categories/createCategory.service';
import { errorHandler } from '@utils/errorHandler.util';

const useCategoryCreate = () => {
	const { showAlert } = useAlert();

	const createCategory = async (categoryData: CategoryDataToSend) => {
		try {
			const result = await createCategoryService(categoryData);
			showAlert('Categoría creada con éxito', 'success');
			return result;
		} catch (error) {
			showAlert('No se puedo crear la categoría', 'error');
			errorHandler(error);
		}
	};
	return { createCategory };
};

export default useCategoryCreate;
