import { useAlertHelper } from '@contexts/Alert/alert.helper';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import { createCategoryService } from '@services/categories/createCategory.service';
import { updateCategoryService } from '@services/categories/updateCategory.service';
import { createFamilyService } from '@services/families/createFamily.service';
import { updateFamilyService } from '@services/families/updateFamily.service';
import uploadFileService from '@services/files/fileUpload.service';
import { createSubcategoryService } from '@services/subcategories/createSubcategory.service';
import { updateSubcategoryService } from '@services/subcategories/updateSubcategory.service';
import { errorHandler } from '@utils/errorHandler.util';

export function useCreateCategorization() {
	const { ...familyToCreate } = useFamilyCreateContext();
	const { user } = useAuthContext();
	const { getAllCategoryInstances } = useCategoryCreateContext();
	const categoryInstances = getAllCategoryInstances();
	const { getAllSubcategoryInstances } = useSubcategoryCreateContext();
	const subcategoryInstances = getAllSubcategoryInstances();
	const { showError, showSuccessAndReload } = useAlertHelper();

	const handleRawImageUpload = async (rawImage: File, id: string) => {
		try {
			if (rawImage === null) return;
			console.log;
			const url = await uploadFileService(rawImage, 'image', id);
			return url;
		} catch (error) {
			console.log(rawImage);
			throw errorHandler(error);
		}
	};
	//mucho texto
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			if (!user) return;
			// Crear la familia
			const family = await createFamilyService({
				name: familyToCreate.name,
				description: familyToCreate.description,
				createdBy: familyToCreate.createdBy || user.id,
				path: '',
				images: [],
			});
			const familyId = family._id;
			// Actualizar familia para imagen
			const uploadedUrlImages = familyToCreate.rawImage
				? await handleRawImageUpload(familyToCreate.rawImage, familyId)
				: '';

			if (uploadedUrlImages) {
				await updateFamilyService(familyId, {
					images: [uploadedUrlImages],
				});
			}
			let categoriaslocas = [];
			for (const category of categoryInstances) {
				const categoryId = await createCategoryService({
					name: category.name,
					description: category.description,
					createdBy: user.id,
					images: [],
					family: familyId,
				});
				categoriaslocas.push({ id: categoryId._id, name: category.name });
				// Actualizar categoría con imagen
				const uploadedCategoryImageUrl = category.rawImage
					? await handleRawImageUpload(category.rawImage, categoryId._id)
					: '';

				if (uploadedCategoryImageUrl) {
					await updateCategoryService(categoryId._id, {
						images: [uploadedCategoryImageUrl],
					});
				}
			}
			console.log('Subcategorias creadas');
			for (const subcategory of subcategoryInstances) {
				const subcategoryId = await createSubcategoryService({
					name: subcategory.name,
					description: subcategory.description,
					createdBy: user.id,
					images: [],
					family: familyId,
					category: categoriaslocas.find(c => c.name === subcategory.category)
						?.id,
				});

				// Actualizar categoría con imagen
				const uploadedSubcategoryImageUrl = subcategory.rawImage
					? await handleRawImageUpload(subcategory.rawImage, subcategoryId._id)
					: '';

				if (uploadedSubcategoryImageUrl) {
					await updateSubcategoryService(subcategoryId._id, {
						images: [uploadedSubcategoryImageUrl],
					});
				}
			}
			showSuccessAndReload('Proceso completado exitosamente');
		} catch (error) {
			showError('error', error);
		}
	};

	const handleCreateSubcategory = async (category: string) => {
		try {
			if (!user) return;
			console.log('Subcategorias creadas');
			for (const subcategory of subcategoryInstances) {
				const subcategoryId = await createSubcategoryService({
					name: subcategory.name,
					description: subcategory.description,
					createdBy: user.id,
					images: [],
					family: familyToCreate.id,
					category: category,
				});

				// Actualizar categoría con imagen
				const uploadedSubcategoryImageUrl = subcategory.rawImage
					? await handleRawImageUpload(subcategory.rawImage, subcategoryId._id)
					: '';
				if (uploadedSubcategoryImageUrl) {
					await updateSubcategoryService(subcategoryId._id, {
						images: [uploadedSubcategoryImageUrl],
					});
				}
			}
			showSuccessAndReload('Proceso completado exitosamente');
		} catch (error) {
			showError('error', error);
		}
	};
	return { handleSubmit, handleCreateSubcategory };
}
