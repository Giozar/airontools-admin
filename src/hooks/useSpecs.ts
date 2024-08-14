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
	const [flag, setFlag] = useState(true);

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

/* import { SpecDataFrontend } from '@interfaces/Specifications.interface';
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
*/
/* import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { fetchSpecificationsByCategoryId } from '@services/specifications/fetchSpecificationsByCategoryId.service';
import { useEffect, useState } from 'react';

interface Spec {
	catId: string;
	initialSpecs?: Array<{ specification: string; value: string }>;
}

function useSpecs({ catId, initialSpecs }: Spec) {
	console.log(initialSpecs);
	const [specs, setSpecs] = useState<Array<{ specification: string; value: string }>>(
		initialSpecs || [],
	);
	const [specifications, setSpecifications] = useState<SpecDataFrontend[]>([]);
	const [flag, setFlag] = useState(true);
	const [specValues, setSpecValues] = useState<Record<string, string>>({});

	const editOrCreateKeyInSpecs = (keyToFind: string, newValue: string) => {
		let keyFound = false;
		const updatedSpecs = specs.map(spec => {
			if (spec.specification === keyToFind) {
				keyFound = true;
				return { ...spec, value: newValue };
			}
			return spec;
		});

		if (!keyFound) {
			updatedSpecs.push({ specification: keyToFind, value: newValue });
		}

		setSpecs(updatedSpecs);
	};

	const findKeyInSpecs = (keyToFind: string) => {
		const spec = specs.find(spec => spec.specification === keyToFind);
		return spec ? spec.value : null;
	};

	const handleSpecUpdate = (newValue: string, index: number) => {
		const key = specifications[index - 1]?.id;
		if (key) {
			editOrCreateKeyInSpecs(key, newValue);
		}
	};

	useEffect(() => {
		if (!flag) {
			setSpecs([]);
		} else {
			setFlag(false);
		}

		const getSpecifications = async () => {
			try {
				const data = await fetchSpecificationsByCategoryId(catId);
				setSpecifications(data);
			} catch (error) {
				console.error('No se pudieron obtener las especificaciones');
			}
		};

		if (catId) {
			getSpecifications();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [catId]);

	const handleInputChange = (id: string, value: string) => {
		setSpecValues(prevValues => ({
			...prevValues,
			[id]: value,
		}));
	};

	return {
		specs,
		specifications,
		editOrCreateKeyInSpecs,
		findKeyInSpecs,
		handleSpecUpdate,
		specValues,
		handleInputChange,
	};
}

export default useSpecs;
*/
