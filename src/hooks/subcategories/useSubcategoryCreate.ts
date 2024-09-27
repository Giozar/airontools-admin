// hooks/useSubcategoryCreate.ts
import { useAlert } from '@contexts/Alert/AlertContext';
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import { createSubcategoryService } from '@services/subcategories/createSubcategory.service';
import { errorHandler } from '@utils/errorHandler.util';

const useSubcategoryCreate = () => {
	const { showAlert } = useAlert();

	const createSubcategory = async (subcategoryData: SubcategoryDataToSend) => {
		try {
			const data = await createSubcategoryService(subcategoryData);
			showAlert('Subcategoría creada con éxito', 'success');
			return data;
		} catch (error) {
			errorHandler(error);
			showAlert('Error al crear la subcategoría', 'error');
		}
	};

	return { createSubcategory };
};

export default useSubcategoryCreate;
