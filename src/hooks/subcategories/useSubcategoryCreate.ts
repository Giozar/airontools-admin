// hooks/useSubcategoryCreate.ts
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import { createSubcategoryService } from '@services/subcategories/createSubcategory.service';
import useErrorHandling from '../common/useErrorHandling';
import useSuccessHandling from '../common/useSuccessHandling';

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
			showError('Error al crear la subcategoría');
		}
	};

	return { errorLog, successLog, createSubcategory: handleCreateSubcategory };
};

export default useSubcategoryCreate;
