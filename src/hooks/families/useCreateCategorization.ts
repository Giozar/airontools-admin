import { airontoolsAPI } from '@configs/api.config';
import { useAlert } from '@contexts/Alert/AlertContext';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import useCategoryCreate from '@hooks/categories/useCategoryCreate';
import useSubcategoryCreate from '@hooks/subcategories/useSubcategoryCreate';
import uploadFileService from '@services/files/fileUpload.service';
import axios from 'axios';
import useFamilyCreate from './useFamilyCreate';

export function useCreateCategorization() {
	const { showAlert } = useAlert();
	const { ...familyToCreate } = useFamilyCreateContext();
	const { createFamily } = useFamilyCreate();
	const { createCategory } = useCategoryCreate();
	const { createSubcategory } = useSubcategoryCreate();
	const { user } = useAuthContext();
	const { getAllCategoryInstances } = useCategoryCreateContext();
	const categoryInstances = getAllCategoryInstances();
	const { getAllSubcategoryInstances } = useSubcategoryCreateContext();
	const subcategoryInstances = getAllSubcategoryInstances();

	const handleRawImageUpload = async (rawImage: File, id: string) => {
		try {
			if (rawImage === null) return;
			const url = await uploadFileService(rawImage, 'image', id);
			console.log('Imagen subida ', url);
			return url;
		} catch (error) {
			console.error('No se pudo subir archivos:', rawImage, error);
		}
	};
	//me da flojera arreglar esto xd xd xd pero ya esta separado creo
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			if (!user) return;
			// Crear la familia
			const familyId = await createFamily({
				name: familyToCreate.name,
				description: familyToCreate.description,
				createdBy: familyToCreate.createdBy || user.id,
				path: '',
				images: [],
			});
			console.log('ID de la familia:', familyId);
			// Actualizar familia para imagen
			const uploadedUrlImages = familyToCreate.rawImage
				? await handleRawImageUpload(familyToCreate.rawImage, familyId)
				: '';
			console.log('imagen subida: ', uploadedUrlImages);
			console.log(
				await axios.patch(airontoolsAPI + '/families/' + familyId, {
					images: [uploadedUrlImages],
				}),
			);

			console.log('Categorias creadas');
			let categoriaslocas = [];
			for (const category of categoryInstances) {
				const categoryId = await createCategory({
					name: category.name,
					description: category.description,
					createdBy: user.id,
					images: [],
					family: familyId,
				});
				console.log('ID de la categoría:', categoryId._id);
				categoriaslocas.push({ id: categoryId._id, name: category.name });
				// Actualizar categoría con imagen

				const uploadedCategoryImageUrl = category.rawImage
					? await handleRawImageUpload(category.rawImage, categoryId._id)
					: '';
				console.log(
					'Imagen subida para la categoría:',
					uploadedCategoryImageUrl,
				);

				await axios.patch(`${airontoolsAPI}/categories/${categoryId._id}`, {
					images: [uploadedCategoryImageUrl],
				});
			}
			console.log('Subcategorias creadas');
			for (const subcategory of subcategoryInstances) {
				const subcategoryId = await createSubcategory({
					name: subcategory.name,
					description: subcategory.description,
					createdBy: user.id,
					images: [],
					family: familyId,
					category: categoriaslocas.find(c => c.name === subcategory.category)
						?.id,
				});
				console.log('ID de la subcategoría:', subcategoryId._id);

				// Actualizar categoría con imagen

				const uploadedSubcategoryImageUrl = subcategory.rawImage
					? await handleRawImageUpload(subcategory.rawImage, subcategoryId._id)
					: '';
				console.log(
					'Imagen subida para la subcategoría:',
					uploadedSubcategoryImageUrl,
				);

				await axios.patch(
					`${airontoolsAPI}/subcategories/${subcategoryId._id}`,
					{
						images: [uploadedSubcategoryImageUrl],
					},
				);
			}
			showAlert('Proceso completado exitosamente', 'success');
			setTimeout(() => {
				window.location.reload();
			}, 300);
		} catch (error) {
			console.error(
				'Error al crear familias, categorías o subcategorías:',
				error,
			);
			showAlert(`Error al crear familias, categorías o subcategorías`, 'error');
		}
	};

	const handleCreateSubcategory = async (category: string) => {
		try {
			if (!user) return;

			console.log('Subcategorias creadas');
			for (const subcategory of subcategoryInstances) {
				const subcategoryId = await createSubcategory({
					name: subcategory.name,
					description: subcategory.description,
					createdBy: user.id,
					images: [],
					family: familyToCreate.id,
					category: category,
				});
				console.log('ID de la subcategoría:', subcategoryId._id);

				// Actualizar categoría con imagen

				const uploadedSubcategoryImageUrl = subcategory.rawImage
					? await handleRawImageUpload(subcategory.rawImage, subcategoryId._id)
					: '';
				console.log(
					'Imagen subida para la subcategoría:',
					uploadedSubcategoryImageUrl,
				);

				await axios.patch(
					`${airontoolsAPI}/subcategories/${subcategoryId._id}`,
					{
						images: [uploadedSubcategoryImageUrl],
					},
				);
			}
			showAlert('Proceso completado exitosamente', 'success');
			setTimeout(() => {
				window.location.reload();
			}, 300);
		} catch (error) {
			console.error(
				'Error al crear familias, categorías o subcategorías:',
				error,
			);
			showAlert('Error al crear familias, categorías o subcategorías', 'error');
		}
	};
	return { handleSubmit, handleCreateSubcategory };
}
