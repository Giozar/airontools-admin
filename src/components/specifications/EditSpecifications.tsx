import { SpecDataToSend } from '@interfaces/Specifications.interface';
import { useEffect, useState } from 'react';
import CategorizationSection from './CategorizationSection';
import SpecificationFormEdit from './SpecificationFormEdit';
import { Categorization } from './types';

export default function EditSpecifications({
	specToEdit,
}: {
	specToEdit: SpecDataToSend;
}) {
	const [categorizations, setCategorizations] = useState<Categorization[]>(
		specToEdit.families.map((family, index) => ({
			selectedFamily: family as string,
			selectedCategory: specToEdit.categories[index] as string, // Agrega un valor por defecto en caso de que falte
			selectedSubcategory: specToEdit.subcategories[index] as string, // Agrega un valor por defecto en caso de que falte
		})),
	);

	const addCategorization = () => {
		setCategorizations([
			...categorizations,
			{ selectedFamily: '', selectedCategory: '', selectedSubcategory: '' },
		]);
	};

	const handleCategorizationChange = (
		index: number,
		selectedFamily: string,
		selectedCategory: string,
		selectedSubcategory: string,
	) => {
		const updatedCategorizations = categorizations.map((cat, i) => {
			if (i === index) {
				return {
					selectedFamily: selectedFamily || cat.selectedFamily,
					selectedCategory: selectedCategory || cat.selectedCategory,
					selectedSubcategory: selectedSubcategory || cat.selectedSubcategory,
				};
			}
			return cat;
		});

		setCategorizations(updatedCategorizations);
	};

	useEffect(() => {
		console.log(categorizations);
	}, [categorizations]);
	return (
		<div>
			{categorizations.map((_, index) => (
				<CategorizationSection
					key={index}
					index={index}
					onChange={handleCategorizationChange}
				/>
			))}

			<button onClick={addCategorization}>Añadir otra categorización</button>

			{categorizations.some(cat => cat.selectedFamily) && (
				<SpecificationFormEdit
					specToEdit={specToEdit}
					familiesId={categorizations.map(cat => cat.selectedFamily)}
					categoriesId={categorizations.map(cat => cat.selectedCategory)}
					subcategoriesId={categorizations.map(cat => cat.selectedSubcategory)}
				/>
			)}
		</div>
	);
}
