import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { fetchSpecificationsByCategoryId } from '@services/specifications/fetchSpecificationsByCategoryId.service';
import { useCallback, useEffect, useState } from 'react';

interface Spec {
	catId: string;
	initialSpecs?: Array<{ specification: string; value: string }>;
}

function useSpecs({ catId, initialSpecs }: Spec) {
	const [specs, setSpecs] = useState<
		Array<{ specification: string; value: string }>
	>(initialSpecs || []);
	const [specifications, setSpecifications] = useState<SpecDataFrontend[]>([]);
	const [flag, setFlag] = useState(true);

	// Fetch specifications based on category ID

	const fetchSpecifications = async () => {
		if (!catId) return;

		try {
			const data = await fetchSpecificationsByCategoryId(catId);
			console.log(data);
			setSpecifications(data);
		} catch (error) {
			console.error('Failed to fetch specifications:', error);
		}
	};

	useEffect(() => {
		if (flag) {
			fetchSpecifications();
			setFlag(false);
		} else {
			setSpecs([]);
			fetchSpecifications();
		}
	}, [catId]);

	const editOrCreateKeyInSpecs = useCallback(
		(keyToFind: string, newValue: string) => {
			setSpecs(prevSpecs => {
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

	// Find value by key
	const findKeyInSpecs = useCallback(
		(keyToFind: string) => {
			const spec = specs.find(spec => spec.specification === keyToFind);
			return spec ? spec.value : '';
		},
		[specs],
	);

	// Handle specification update
	const handleSpecUpdate = useCallback(
		(newValue: string, index: number) => {
			const specId = specifications[index]?.id;
			if (specId) {
				editOrCreateKeyInSpecs(specId, newValue);
			}
		},
		[specifications, editOrCreateKeyInSpecs],
	);

	// Handle input changes
	const handleInputChange = useCallback((id: string, value: string) => {
		setSpecs(prevSpecs => {
			const updatedSpecs = prevSpecs.map(spec =>
				spec.specification === id ? { ...spec, value } : spec,
			);
			return updatedSpecs;
		});
	}, []);

	return {
		specs,
		specifications,
		editOrCreateKeyInSpecs,
		findKeyInSpecs,
		handleSpecUpdate,
		handleInputChange,
	};
}

export default useSpecs;
