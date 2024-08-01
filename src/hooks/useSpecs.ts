import { SpecsFrontend } from '@adapters/specifications.adapter';
import { fetchSpecificationsByCategoryId } from '@services/specifications/fetchSpecificationsByCategoryId.service';
import { useEffect, useState } from 'react';

interface spec {
	catId: string;
	initialSpecs?: Array<{ [key: string]: string }>;
}
function useSpecs({ catId, initialSpecs }: spec) {
	const [specs, setSpecs] = useState(initialSpecs);
	const [specifications, setSpecifications] = useState<SpecsFrontend[]>([]);
	const [flag, setFlag] = useState(true);
	const [specValues, setSpecValues] = useState<Record<string, string>>({});

	const editOrCreateKeyInSpecs = (keyToFind: string, newValue: string) => {
		let keyFound = false;
		if (!specs) return;
		const updatedSpecs = specs.map(spec => {
			if (keyToFind in spec) {
				keyFound = true;
				return { ...spec, [keyToFind]: newValue };
			}
			return spec;
		});

		if (!keyFound) {
			updatedSpecs.push({ [keyToFind]: newValue });
		}

		setSpecs(updatedSpecs);
	};

	const findKeyInSpecs = (keyToFind: string) => {
		if (!specs) return;
		for (const spec of specs) {
			if (keyToFind in spec) {
				return spec[keyToFind];
			}
		}
		return null;
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
