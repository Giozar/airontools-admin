// hooks/useSubcategoryUpdate.ts
import { useAlert } from '@contexts/Alert/AlertContext';
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import { updateSubcategory } from '@services/subcategories/updateSubcategory.service';

const useSubcategoryUpdate = () => {
	const { showAlert } = useAlert();
	const handleUpdateSubcategory = async (
		subcategoryData: SubcategoryDataToSend,
	) => {
		try {
			const data = await updateSubcategory(subcategoryData);
			showAlert('Subcategoría actualizada con éxito', 'success');
			return data;
		} catch (error) {
			showAlert('Error al actualizar la subcategoría', 'error');
		}
	};

	return {
		updateSubcategory: handleUpdateSubcategory,
	};
};

export default useSubcategoryUpdate;
