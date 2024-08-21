// hooks/Categories/useCreateCategories.ts

import { airontoolsAPI } from '@configs/api.config';
import useCategoryCreate from '@hooks/categories/useCategoryCreate';
import axios from 'axios';

interface Category {
	name: string;
	description: string;
}

const useCreateCategories = (
	handleImageUploadCategory: (arg0: string, arg1: number) => Promise<string[]>,
) => {
	const { createCategory } = useCategoryCreate();

	const createCategories = async (
		categories: Category[],
		familyId: string,
		createdBy: string,
	) => {
		try {
			// Crear categorías
			const createdCategories = await Promise.all(
				categories.map(async (category, index) => {
					// Crea la categoría
					const createdCategory = await createCategory({
						name: category.name,
						description: category.description,
						family: familyId,
						createdBy,
					});

					// Subir imágenes asociadas a la categoría
					const categoryUploadedUrlImages = await handleImageUploadCategory(
						createdCategory._id,
						index + 1,
					);
					console.log(
						`Imágenes subidas para la categoría ${createdCategory._id}:`,
						categoryUploadedUrlImages,
					);

					// Actualiza la categoría con las URLs de las imágenes
					await axios.patch(
						`${airontoolsAPI}/categories/${createdCategory._id}`,
						{ images: categoryUploadedUrlImages },
					);

					return createdCategory;
				}),
			);

			return createdCategories;
		} catch (error) {
			console.error('Error al crear subcategorías:', error);
			throw error;
		}
	};

	return { createCategories };
};

export default useCreateCategories;
