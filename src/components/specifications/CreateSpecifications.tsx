import SpecificationForm from '@components/specifications/SpecificationForm';
import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import { useEffect } from 'react';
import CategorizationSections from './CategorizationsSection';

export default function CreateSpecifications() {
	const { categorizations } = useSpecificationContext();

	useEffect(() => {}, [categorizations]);
	return (
		<div>
			<CategorizationSections />

			{categorizations.some(cat => cat.selectedFamily) && <SpecificationForm />}
		</div>
	);
}
