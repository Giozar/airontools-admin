import { useAlert } from '@contexts/Alert/AlertContext';
import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import { CategoryDataFrontend } from '@interfaces/Category.interface';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { getCategoryService } from '@services/categories/getCategory.service';
import { getSubcategoryService } from '@services/subcategories/getSubcategory.service';
import { useEffect } from 'react';
import CategorizationsSection from './CategorizationsSection';
import SpecificationFormEdit from './SpecificationFormEdit';

export default function EditSpecifications({
	specToEdit,
}: {
	specToEdit: SpecDataToSend;
}) {
	const { categorizations, setCategorizations } = useSpecificationContext();
	const { showAlert } = useAlert();

	useEffect(() => {
		// pedir las subcategorias de la lista, con ello clasificar
		// pedir las categorias de la lista, con ello clasificar
		// Que es eso???
		const getCategorization = async () => {
			// const familiesList: FamilyDataFrontend[] = [];
			const categoriesList: CategoryDataFrontend[] = [];
			const subcategoriesList: SubcategoryDataFrontend[] = [];

			// Obtener familias
			// if (Array.isArray(specToEdit.families)) {
			// 	try {
			// 		for (const familyId of specToEdit.families) {
			// 			const family = await getFamilyService(familyId);
			// 			if (family) familiesList.push(family);
			// 		}
			// 	} catch (error) {
			// 		showAlert('Error al obtener familias: ' + error, 'error');
			// 	}
			// }

			// Obtener categorías
			if (Array.isArray(specToEdit.categories)) {
				try {
					for (const categoryId of specToEdit.categories) {
						const category = await getCategoryService(categoryId);
						if (category) categoriesList.push(category);
					}
				} catch (error) {
					showAlert('Error al obtener categorías: ' + error, 'error');
				}
			}

			// Obtener subcategorías
			if (Array.isArray(specToEdit.subcategories)) {
				try {
					for (const subcategoryId of specToEdit.subcategories) {
						const subcategory = await getSubcategoryService(subcategoryId);
						if (subcategory) subcategoriesList.push(subcategory);
					}
				} catch (error) {
					showAlert('Error al obtener subcategorías: ' + error, 'error');
				}
			}

			if (
				specToEdit.families.length > 0 ||
				categoriesList.length > 0 ||
				subcategoriesList.length > 0
			) {
				const newCategorizations = specToEdit.families.map(fam => ({
					selectedFamily: fam,
					selectedCategories: categoriesList
						.filter(cat => cat.family.id === fam)
						.map(cat => cat.id),
					selectedSubcategories: subcategoriesList
						.filter(cat => cat.family.id === fam)
						.map(cat => cat.id),
				}));
				setCategorizations(newCategorizations);
			}
		};

		getCategorization();
	}, [specToEdit]);

	return (
		<div>
			<CategorizationsSection />
			{categorizations.some(cat => cat.selectedFamily) && (
				<SpecificationFormEdit specToEdit={specToEdit} />
			)}
		</div>
	);
}
