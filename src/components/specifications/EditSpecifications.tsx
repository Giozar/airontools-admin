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
		specToEdit.families.map(family => ({
			selectedFamily: family as string,
			selectedCategories: specToEdit.categories as string[], // Agrega un valor por defecto en caso de que falte
			selectedSubcategories: specToEdit.subcategories as string[], // Agrega un valor por defecto en caso de que falte
		})),
	);

	const addCategorization = () => {
		setCategorizations([
			...categorizations,
			{
				selectedFamily: '',
				selectedCategories: [''],
				selectedSubcategories: [''],
			},
		]);
	};

	const handleCategorizationChange = (
		index: number,
		selectedFamily: string,
		selectedCategories: string[],
		selectedSubcategories: string[],
	) => {
		const updatedCategorizations = categorizations.map((cat, i) => {
			if (i === index) {
				return {
					selectedFamily: selectedFamily || cat.selectedFamily,
					selectedCategories: selectedCategories || cat.selectedCategories,
					selectedSubcategories:
						selectedSubcategories || cat.selectedSubcategories,
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
					familiesId={
						categorizations.map(cat => cat.selectedFamily).length !== 0
							? categorizations.map(cat => cat.selectedFamily)
							: specToEdit.families
					}
					categoriesId={
						categorizations.map(cat => cat.selectedCategories).flat().length !==
						0
							? categorizations.map(cat => cat.selectedCategories).flat()
							: specToEdit.categories
					}
					subcategoriesId={
						categorizations.map(cat => cat.selectedSubcategories).flat()
							.length !== 0
							? categorizations.map(cat => cat.selectedSubcategories).flat()
							: specToEdit.subcategories
					}
				/>
			)}
		</div>
	);
}
