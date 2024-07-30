import {
	SpecsFrontend,
	transformSpecsData,
} from '@adapters/specifications.adapter';
import { getSpecifications } from '@services/specifications/getSpecifications.service';
import { ChangeEvent, useEffect, useState } from 'react';
import useFetchCategories from './useFetchCategories';
import useFetchFamilies from './useFetchFamilies';
import useFetchSubcategories from './useFetchSubcategories';

const useSpecs = () => {
	const { families } = useFetchFamilies();
	const { categories, filteredCategories, setFilteredCategories } =
		useFetchCategories();
	const { subcategories, filteredSubcategories, setFilteredSubcategories } =
		useFetchSubcategories();
	const [selectedFamilyId, setSelectedFamilyId] = useState('');
	const [selectedCategoryId, setSelectedCategoryId] = useState('');
	const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
	const [specifications, setSpecifications] = useState<SpecsFrontend[]>([]);
	const [filteredSpecifications, setFilteredSpecifications] = useState<
		SpecsFrontend[]
	>([]);
	const [specValues, setSpecValues] = useState<Record<string, string>>({});

	useEffect(() => {
		const fetchSpecifications = async () => {
			try {
				const specs = await getSpecifications();
				setSpecifications(specs.map(transformSpecsData));
				console.log(specs);
			} catch (error) {
				console.error(error);
			}
		};
		fetchSpecifications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleFamilyChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const familyId = event.target.value;
		setSelectedFamilyId(familyId);
		const filteredCategories = categories.filter(
			category => category.familyId === familyId,
		);
		setFilteredCategories(filteredCategories);
	};
	const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const categoryId = event.target.value;
		setSelectedCategoryId(categoryId);
		const filteredSubcategories = subcategories.filter(
			subcategory => subcategory.categoryId === categoryId,
		);
		setFilteredSubcategories(filteredSubcategories);
		const filteredSpecifications = specifications.filter(
			spec => spec.categoryId === categoryId,
		);
		setFilteredSpecifications(filteredSpecifications);
	};
	const handleSubcategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const subcategoryId = event.target.value;
		setSelectedSubcategoryId(subcategoryId);
		if (subcategoryId !== '') {
			setFilteredSpecifications(
				specifications.filter(spec => spec.subcategoryId === subcategoryId),
			);
		} else {
			setFilteredSpecifications(
				specifications.filter(spec => spec.categoryId === selectedCategoryId),
			);
		}
	};

	const handleInputChange = (id: string, value: string) => {
		setSpecValues(prevValues => ({
			...prevValues,
			[id]: value,
		}));
	};

	return {
		families,
		filteredCategories,
		filteredSubcategories,
		selectedFamilyId,
		selectedCategoryId,
		selectedSubcategoryId,
		filteredSpecifications,
		specValues,
		handleFamilyChange,
		handleCategoryChange,
		handleSubcategoryChange,
		handleInputChange,
	};
};

export default useSpecs;
