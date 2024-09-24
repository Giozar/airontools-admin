import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import { useEffect } from 'react';
import CategorizationsSection from './CategorizationsSection';
import SpecificationFormEdit from './SpecificationFormEdit';

export default function EditSpecifications({
	specToEdit,
}: {
	specToEdit: SpecDataToSend;
}) {
	const {
		categorizations,
		setFamilies,
		families,
		setCategories,
		setSubcategories,
	} = useSpecificationContext();

	useEffect(() => {
		if (specToEdit.families.length > 0) setFamilies(specToEdit.families);
		if (specToEdit.categories.length > 0) setCategories(specToEdit.categories);
		if (specToEdit.subcategories.length > 0)
			setSubcategories(specToEdit.subcategories);
	}, [specToEdit]);

	useEffect(() => {
		if (families.length > 0) {
			console.log('hay familia');
		}
		console.log(specToEdit);
	}, [specToEdit]);
	return (
		<div>
			<CategorizationsSection />
			<CategorizationsSection />
			{categorizations.some(cat => cat.selectedFamily) && (
				<SpecificationFormEdit specToEdit={specToEdit} />
			)}
		</div>
	);
}
