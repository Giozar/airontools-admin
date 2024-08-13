// hooks/useSubcategoryUpdate.ts
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import { updateSubcategory } from '@services/subcategories/updateSubcategory.service';

const useSubcategoryUpdate = () => {
	const { errorLog: errorLogSubcategory, showError: showErrorSubcategory } =
		useErrorHandling();
	const {
		successLog: successLogSubcategory,
		showSuccess: showSuccessSubcategory,
	} = useSuccessHandling();

	const handleUpdateSubcategory = async (
		subcategoryData: SubcategoryDataToSend,
	) => {
		try {
			const data = await updateSubcategory(subcategoryData);
			showSuccessSubcategory('Subcategoría actualizada con éxito');
			return data;
		} catch (error) {
			showErrorSubcategory('Error al actualizar la subcategoría');
		}
	};

	return {
		errorLogSubcategory,
		successLogSubcategory,
		updateSubcategory: handleUpdateSubcategory,
	};
};

export default useSubcategoryUpdate;
