import { useAlert } from '@contexts/Alert/AlertContext';
import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import { CategoryDataFrontend } from '@interfaces/Category.interface';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { getCategoryService } from '@services/categories/getCategory.service';
import { getSubcategoryService } from '@services/subcategories/getSubcategory.service';
import { useEffect, useState } from 'react';
import CategorizationsSection from './CategorizationsSection';
import SpecificationFormEdit from './SpecificationFormEdit';

export default function EditSpecifications({
	specToEdit,
}: {
	specToEdit: SpecDataToSend;
}) {
	const { categorizations, setCategorizations } = useSpecificationContext();
	const { showAlert } = useAlert();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getCategorization = async () => {
			setLoading(true);
			const categoriesList: CategoryDataFrontend[] = [];
			const subcategoriesList: SubcategoryDataFrontend[] = [];
			try {
				if (Array.isArray(specToEdit.categories)) {
					const categoryPromises = specToEdit.categories.map(categoryId =>
						getCategoryService(categoryId),
					);
					const categories = await Promise.all(categoryPromises);
					categoriesList.push(...categories.filter(cat => cat));
				}

				if (Array.isArray(specToEdit.subcategories)) {
					const subcategoryPromises = specToEdit.subcategories.map(
						subcategoryId => getSubcategoryService(subcategoryId),
					);
					const subcategories = await Promise.all(subcategoryPromises);
					subcategoriesList.push(...subcategories.filter(subcat => subcat));
				}
<<<<<<< HEAD
=======
				console.log('hicealgo');
>>>>>>> 54452879b6c40c718eeb61812901ccbe4354b986

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
					console.log(newCategorizations);
					setCategorizations(newCategorizations);
				}
			} catch (error) {
				showAlert('Error al obtener datos: ' + error, 'error');
			} finally {
				setLoading(false);
			}
		};
<<<<<<< HEAD
		if (specToEdit) {
			getCategorization();
		}
	}, [specToEdit, setCategorizations, showAlert]);

	if (loading) {
		return <div>Cargando...</div>;
	}
	console.log('loading', specToEdit);
=======
		getCategorization();
	}, [specToEdit]);
>>>>>>> 54452879b6c40c718eeb61812901ccbe4354b986

	if (loading) {
		return <div>Cargando...</div>;
	}
	console.log('loading', specToEdit);

	return (
		<div>
			<CategorizationsSection />
			{categorizations.some(cat => cat.selectedFamily) && (
				<SpecificationFormEdit specToEdit={specToEdit} />
			)}
		</div>
	);
}
