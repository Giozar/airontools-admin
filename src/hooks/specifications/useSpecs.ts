import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { fetchSpecificationsByCategoryId } from '@services/specifications/fetchSpecificationsByCategoryId.service';
import { useCallback, useEffect, useState } from 'react';

interface Spec {
	catId: string;
	initialSpecs?: Array<{ specification: string; value: string }>;
}

function useSpecs({ catId, initialSpecs }: Spec) {
	const [specificationValues, setSpecificationValues] = useState<
		Array<{ specification: string; value: string }>
	>(initialSpecs || []);
	const [specifications, setSpecifications] = useState<SpecDataFrontend[]>([]);

	const fetchSpecifications = async () => {
		if (!catId) return;

		try {
			const data = await fetchSpecificationsByCategoryId(catId);
			setSpecifications(data);
			if (!initialSpecs) {
				const initialSpecsData = data.map(spec => ({
					specification: spec.id,
					value: '',
				}));
				setSpecificationValues(initialSpecsData);
			}
		} catch (error) {
			console.error('Failed to fetch specifications:', error);
		}
	};

	useEffect(() => {
		fetchSpecifications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [catId]);

	const editOrCreateKeyInSpecs = useCallback(
		(keyToFind: string, newValue: string) => {
			setSpecificationValues(prevSpecs => {
				const updatedSpecs = prevSpecs.map(spec =>
					spec.specification === keyToFind
						? { ...spec, value: newValue }
						: spec,
				);

				if (!updatedSpecs.find(spec => spec.specification === keyToFind)) {
					updatedSpecs.push({ specification: keyToFind, value: newValue });
				}

				return updatedSpecs;
			});
		},
		[],
	);

	const handleSpecUpdate = useCallback(
		(newValue: string, index: number) => {
			const specId = specifications[index]?.id;
			if (specId) {
				editOrCreateKeyInSpecs(specId, newValue);
			}
		},
		[specifications, editOrCreateKeyInSpecs],
	);

	return {
		specificationValues,
		specifications,
		editOrCreateKeyInSpecs,
		handleSpecUpdate,
	};
}

export default useSpecs;
