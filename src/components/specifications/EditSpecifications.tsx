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
	const { categorizations } = useSpecificationContext();

	useEffect(() => {
		console.log(categorizations);
	}, [categorizations]);
	return (
		<div>
			<CategorizationsSection />
			{categorizations.some(cat => cat.selectedFamily) && (
				<SpecificationFormEdit specToEdit={specToEdit} />
			)}
		</div>
	);
}
