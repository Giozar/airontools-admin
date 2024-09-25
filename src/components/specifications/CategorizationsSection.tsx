import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import Categorizations from './Categorizations';

export default function CategorizationsSection() {
	const { categorizations, setCategorizations } = useSpecificationContext();

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
