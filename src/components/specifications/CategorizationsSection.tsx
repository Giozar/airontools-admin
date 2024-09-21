import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import { useEffect } from 'react';
import Categorizations from './Categorizations';

export default function CategorizationsSection() {
	const {
		categorizations,
		setCategorizations,
		setFamilies,
		families,
		setCategories,
		categories,
		setSubcategories,
		subcategories,
	} = useSpecificationContext();

	useEffect(() => {
		if (categorizations.some(cat => cat.selectedFamily)) {
			setFamilies(
				categorizations.map(cat => cat.selectedFamily).length !== 0
					? categorizations.map(cat => cat.selectedFamily)
					: families,
			);
			setCategories(
				categorizations.map(cat => cat.selectedCategories).flat().length !== 0
					? categorizations.map(cat => cat.selectedCategories).flat()
					: categories,
			);
			setSubcategories(
				categorizations.map(cat => cat.selectedSubcategories).flat().length !==
					0
					? categorizations.map(cat => cat.selectedSubcategories).flat()
					: subcategories,
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
