// hooks/useSubcategoryCreate.ts
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import { createSubcategoryService } from '@services/subcategories/createSubcategory.service';
import { errorHandler } from '@utils/errorHandler.util';

const useSubcategoryCreate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const handleCreateSubcategory = async (
		subcategoryData: SubcategoryDataToSend,
	) => {
		try {
			const data = await createSubcategoryService(subcategoryData);
			showSuccess('Subcategoría creada con éxito');
			return data;
		} catch (error) {
			errorHandler(error);
			showError('Error al crear la subcategoría');
		}
	};

	return { errorLog, successLog, createSubcategory: handleCreateSubcategory };
};

export default useSubcategoryCreate;
