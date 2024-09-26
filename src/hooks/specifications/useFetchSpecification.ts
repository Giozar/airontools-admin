import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { getSpecification } from '@services/specifications/getSpecification.service';
import { useEffect, useState } from 'react';

export default function useFetchSpecification({ id }: { id: string }) {
	const [specification, setSpecification] = useState<SpecDataFrontend>();

	useEffect(() => {
		if (id) {
			const fetchSpecification = async () => {
				const specification = await getSpecification({ id });
				setSpecification(specification);
			};
			fetchSpecification();
		}
	}, [id]);

	return { specification };
}
