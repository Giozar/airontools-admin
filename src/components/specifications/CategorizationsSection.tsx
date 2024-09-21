import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import { useEffect } from 'react';
import Categorizations from './Categorizations';

export default function CategorizationsSection() {
	const {
		categorizations,
		setCategorizations,
		setFamilies,
		setCategories,
		setSubcategories,
	} = useSpecificationContext();

	useEffect(() => {
		if (categorizations.some(cat => cat.selectedFamily)) {
			setFamilies(categorizations.map(cat => cat.selectedFamily));
			setCategories(categorizations.map(cat => cat.selectedCategories).flat());
			setSubcategories(
				categorizations.map(cat => cat.selectedSubcategories).flat(),
			);
		}
	}, [categorizations]);

	const addCategorization = () => {
		setCategorizations([
			...categorizations,
			{ selectedFamily: '', selectedCategories: [], selectedSubcategories: [] },
		]);
	};

	return (
		<>
			{categorizations.map((_, index) => (
				<Categorizations key={index} index={index} />
			))}

			<button onClick={addCategorization}>Añadir otra categorización</button>
		</>
	);
}
