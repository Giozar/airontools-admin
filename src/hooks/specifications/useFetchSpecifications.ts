// hooks/useFetchFamilies.ts
import useErrorHandling from '@hooks/common/useErrorHandling';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { getSpecifications } from '@services/specifications/getSpecifications.service';
import { useEffect, useState } from 'react';

function useFetchSpecifications() {
	const { errorLog, showError } = useErrorHandling();
	const [specifications, setSpecifications] = useState<SpecDataFrontend[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [filteredSpecifications, setFilteredSpecifications] = useState<
		SpecDataFrontend[]
	>([]);
	useEffect(() => {
		const fetchSpecifications = async () => {
			try {
				const specsResponse = await getSpecifications();
				specsResponse && setSpecifications(specsResponse);
				specsResponse && setFilteredSpecifications(specsResponse);
				setLoading(false);
			} catch (error) {
				showError('Error al cargar las familias');
			} finally {
				setLoading(false);
			}
		};
		fetchSpecifications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSearch = (searchTerm: string) => {
		const term = searchTerm.toLowerCase();
		setSearchTerm(term);
		const filtered = specifications.filter(specification =>
			specification.name.toLowerCase().includes(term),
		);
		setFilteredSpecifications(filtered);
	};

	return {
		specifications,
		loading,
		errorLog,
		searchTerm,
		setSearchTerm,
		setSpecifications,
		filteredSpecifications,
		setFilteredSpecifications,
		handleSearch,
	};
}

export default useFetchSpecifications;
