import SpecificationForm from '@components/specifications/SpecificationForm';
import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import { useEffect } from 'react';
import CategorizationSection from './CategorizationSection';

export default function CreateSpecifications() {
	const { categorizations, setCategorizations } = useSpecificationContext();

	const addCategorization = () => {
		setCategorizations([
			...categorizations,
			{ selectedFamily: '', selectedCategories: [], selectedSubcategories: [] },
		]);
	};

	useEffect(() => {}, [categorizations]);
	return (
		<div>
			{categorizations.map((_, index) => (
				<CategorizationSection key={index} index={index} />
			))}

			<button onClick={addCategorization}>Añadir otra categorización</button>

			{categorizations.some(cat => cat.selectedFamily) && (
				<SpecificationForm
					familiesId={categorizations.map(cat => cat.selectedFamily)}
					categoriesId={categorizations
						.map(cat => cat.selectedCategories)
						.flat()}
					subcategoriesId={categorizations
						.map(cat => cat.selectedSubcategories)
						.flat()}
				/>
			)}
		</div>
	);
}
