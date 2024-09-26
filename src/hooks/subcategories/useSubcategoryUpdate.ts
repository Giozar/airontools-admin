// hooks/useSubcategoryUpdate.ts
import { useAlert } from '@contexts/Alert/AlertContext';
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import { updateSubcategoryService } from '@services/subcategories/updateSubcategory.service';

const useSubcategoryUpdate = () => {
	const { showAlert } = useAlert();
	const updateSubcategory = async (subcategoryData: SubcategoryDataToSend) => {
		try {
			if (!subcategoryData._id) throw new Error('Id de subcategoría no válido');
			const data = await updateSubcategoryService(
				subcategoryData._id,
				subcategoryData,
			);
			showAlert('Subcategoría actualizada con éxito', 'success');
			return data;
		} catch (error) {
			showAlert('Error al actualizar la subcategoría', 'error');
		}
	};

	return {
		updateSubcategory,
	};
};

export default useSubcategoryUpdate;
