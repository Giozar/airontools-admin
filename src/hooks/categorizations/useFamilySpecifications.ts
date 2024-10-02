import useFetchCategoriesByFamily from '@hooks/categories/useFetchCategoriesByFamily';
import useFetchFamilies from '@hooks/categorizations/useFetchFamilies';
import useFetchSubcategoriesByCategoryId from '@hooks/subcategories/useFetchSubcategoriesByCategoryId';
import { useEffect, useState } from 'react';

export function useFamilySpecifications() {
	const [selectedFamily, setSelectedFamily] = useState<string>('');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');

	const { families } = useFetchFamilies();
	const { categories, fetchCategories } =
		useFetchCategoriesByFamily(selectedFamily);
	const { subcategories, fetchSubcategories } =
		useFetchSubcategoriesByCategoryId(selectedCategory);
	useEffect(() => {
		if (selectedFamily) {
			// console.log(`Family selected: ${selectedFamily}`);
			fetchCategories(selectedFamily);
			setSelectedCategory('');
			setSelectedSubcategory(''); // Reset subcategory when family changes
		}
	}, [selectedFamily]);

	useEffect(() => {
		if (selectedCategory) {
			// console.log(`Category selected: ${selectedCategory}`);
			fetchSubcategories(selectedCategory);
			setSelectedSubcategory(''); // Reset subcategory when category changes
		}
	}, [selectedCategory]);

	useEffect(() => {
		if (selectedSubcategory) {
			// console.log(`Subcategory selected: ${selectedSubcategory}`);
		}
	}, [selectedSubcategory]);

	const handleSelectFamily = (value: string) => {
		// console.log(`handleSelectFamily called with value: ${value}`);
		setSelectedFamily(value);
	};

	const handleSelectCategory = (value: string) => {
		// console.log(`handleSelectCategory called with value: ${value}`);
		setSelectedCategory(value);
	};

	const handleSelectSubcategory = (value: string) => {
		// console.log(`handleSelectSubcategory called with value: ${value}`);
		setSelectedSubcategory(value);
	};

	return {
		families: families.map(family => ({
			value: family.id,
			label: family.name,
		})),
		categories: categories.map(category => ({
			value: category.id,
			label: category.name,
		})),
		subcategories: subcategories.map(subcategory => ({
			value: subcategory.id,
			label: subcategory.name,
		})),
		selectedFamily,
		selectedCategory,
		selectedSubcategory,
		handleSelectFamily,
		handleSelectCategory,
		handleSelectSubcategory,
	};
}
