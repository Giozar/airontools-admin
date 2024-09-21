import { SpecDataToSend } from '@interfaces/Specifications.interface';
import { useEffect, useState } from 'react';
import CategorizationsSection from './CategorizationsSection';
import SpecificationFormEdit from './SpecificationFormEdit';
import { Categorization } from './types';

export default function EditSpecifications({
	specToEdit,
}: {
	specToEdit: SpecDataToSend;
}) {
	const [categorizations] = useState<Categorization[]>(
		specToEdit.families.map(family => ({
			selectedFamily: family as string,
			selectedCategories: specToEdit.categories as string[], // Agrega un valor por defecto en caso de que falte
			selectedSubcategories: specToEdit.subcategories as string[], // Agrega un valor por defecto en caso de que falte
		})),
	);

	useEffect(() => {
		console.log(categorizations);
	}, [categorizations]);
	return (
		<div>
			<CategorizationsSection />
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
