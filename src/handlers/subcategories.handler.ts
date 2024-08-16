// hooks/subcategories/useCreateSubcategories.ts
import useSubcategoryCreate from '@hooks/subcategories/useSubcategoryCreate';
import { CategoryDataBackend } from '@interfaces/Category.interface';
import axios from 'axios';

interface Subcategory {
	name: string;
	description: string;
	selected: string;
}

const useCreateSubcategories = (
	handleImageUploadSubcategory: (
		arg0: string,
		arg1: number,
	) => Promise<string[]>,
) => {
	const { createSubcategory } = useSubcategoryCreate();

	const createSubcategories = async (
		subcategories: Subcategory[],
		createdCategories: CategoryDataBackend[],
		createdBy: string,
	) => {
		console.log(createdCategories);
		try {
			const createdSubcategories = await Promise.all(
				subcategories.map(async (subcategory, index) => {
					// Encuentra la categoría correspondiente a la subcategoría
					const category = createdCategories.find(
						cat => subcategory.selected === cat.name,
					);
					console.log(subcategory.selected, category);
					if (!category) {
						throw new Error(
							`Categoría no encontrada para la subcategoría ${subcategory.name}`,
						);
					}

					// Crea la subcategoría
					const createdSubcategory = await createSubcategory({
						name: subcategory.name,
						description: subcategory.description,
						family: category.family._id,
						category: category._id,
						createdBy,
					});

					// Subir imágenes asociadas a la subcategoría
					const subcategoryUploadedUrlImages =
						await handleImageUploadSubcategory(
							createdSubcategory._id,
							index + 1,
						);
					console.log(
						`Imágenes subidas para la subcategoría ${createdSubcategory._id}:`,
						subcategoryUploadedUrlImages,
					);

					// Actualiza la subcategoría con las URLs de las imágenes
					await axios.patch(
						`${import.meta.env.VITE_API_URL}/subcategories/${createdSubcategory._id}`,
						{ images: subcategoryUploadedUrlImages },
					);

					return createdSubcategory;
				}),
			);

			return createdSubcategories;
		} catch (error) {
			console.error('Error al crear subcategorías:', error);
			throw error;
		}
	};

	return { createSubcategories };
};

export default useCreateSubcategories;
