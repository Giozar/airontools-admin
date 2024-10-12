import '@components/css/createSpecs.css';
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
	const removeCategorization = (index: number) => {
		const categorizationsRemoved = categorizations.filter(
			cat => cat !== categorizations[index],
		);
		setCategorizations(categorizationsRemoved);
	};
	return (
		<>
			{categorizations.map((_, index) => (
				<div
					className='container-categorizations'
					key={`container-categorizations-${index}`}
				>
					<Categorizations key={index} index={index} />{' '}
					<button
						className='remove-categorizations'
						key={`remove-categorization-${index}`}
						onClick={() => removeCategorization(index)}
					>
						Borrar categorizaciones
					</button>
				</div>
			))}
			<button onClick={addCategorization}>Añadir otra categorización</button>
		</>
	);
}
