import { useAlert } from '@contexts/Alert/AlertContext';
import { CategoryDataToSend } from '@interfaces/Category.interface';
import { updateCategoryService } from '@services/categories/updateCategory.service';

const useCategoryUpdate = () => {
	const { showAlert } = useAlert();
	const updateCategory = async (categoryData: CategoryDataToSend) => {
		try {
			updateCategoryService(categoryData._id as string, categoryData);
			showAlert('Categoría actualizada Con Éxito', 'success');
		} catch (error) {
			showAlert('Error al actualizar la categoría', 'error');
		}
	};
	return { updateCategory };
};

export default useCategoryUpdate;
