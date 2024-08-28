import { SpecDataToSend } from '@interfaces/Specifications.interface';
import { fetchSpecificationsByCategoryId } from '@services/specifications/fetchSpecificationsByCategoryId.service';
import { useCallback, useEffect, useState } from 'react';

interface Spec {
	catId: string;
	subcatId: string;
	initialSpecs?: Array<{ specification: string; value: string }>;
	flag?: boolean;
}

function useSpecs({ catId, subcatId, initialSpecs, flag }: Spec) {
	const [specificationValues, setSpecificationValues] = useState<
		Array<{ specification: string; value: string }>
	>(initialSpecs || []);

	const [specifications, setSpecifications] = useState<SpecDataToSend[]>([]);

	const fetchSpecifications = async () => {
		if (!catId && !subcatId) return;

		try {
			const data = await fetchSpecificationsByCategoryId(catId);
			//console.log(data);
			//console.log(subcatId);
			//TODO: orita esto no rompe nada pero es el backend que responde raro xd
			//Deberia de regresar subcategory._id pero no lo hace...
			const filteredSpecs = data.filter(item => item.subcategory === subcatId);
			//console.log(filteredSpecs);
			setSpecifications(filteredSpecs);
			// console.log(data);
			const initialSpecsLookup = initialSpecs?.reduce(
				(acc, ini) => {
					acc[ini.specification] = ini.value;
					return acc;
				},
				{} as Record<string, string>,
			);
			const initialSpecsData = filteredSpecs.map(spec => ({
				specification: spec._id || '',
				value:
					initialSpecsLookup && spec._id
						? initialSpecsLookup[spec._id]
							? initialSpecsLookup[spec._id]
							: ''
						: '',
			}));
			setSpecificationValues(initialSpecsData);
		} catch (error) {
			console.error('Failed to fetch specifications:', error);
		}
	};

	useEffect(() => {
		fetchSpecifications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [catId, subcatId, flag]);

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
			const specId = specifications[index]?._id;
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
