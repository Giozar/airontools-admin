import SpecificationForm from '@components/specifications/SpecificationForm';
import BasePage from '@layouts/BasePage';
import { useState } from 'react';
import CategorizationSection from './CategorizationSection';
import { Categorization } from './types';

export default function CreateSpecifications() {
	const [categorizations, setCategorizations] = useState<Categorization[]>([]);

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
	console.log(categorizations);
	return (
		<BasePage title='Crear Especificaciones'>
			{categorizations.map((_, index) => (
				<CategorizationSection
					key={index}
					index={index}
					onChange={handleCategorizationChange}
				/>
			))}

			<button onClick={addCategorization}>Añadir otra categorización</button>

			{categorizations.some(cat => cat.selectedFamily) && (
				<SpecificationForm
					familiesId={categorizations.map(cat => cat.selectedFamily)}
					categoriesId={categorizations.map(cat => cat.selectedCategory)}
					subcategoriesId={categorizations.map(cat => cat.selectedSubcategory)}
				/>
			)}
		</BasePage>
	);
}
