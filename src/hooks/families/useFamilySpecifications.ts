import useFetchCategoriesFromFamily from '@hooks/categories/useFetchCategoriesFromFamily';
import useFetchFamilies from '@hooks/families/useFetchFamilies';
import useFetchSubcategoriesFromFamily from '@hooks/subcategories/useFetchSubcategoriesFromFamily';
import { useEffect, useState } from 'react';

export function useFamilySpecifications() {
	const { families } = useFetchFamilies();
	const { categories, fetchCategories } = useFetchCategoriesFromFamily();
	const { subcategories, fetchSubcategories } =
		useFetchSubcategoriesFromFamily();

	const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
		null,
	);

	useEffect(() => {
		if (selectedFamily) {
			fetchCategories(selectedFamily);
			setSelectedCategory(null);
		}
	}, [selectedFamily]);

	useEffect(() => {
		if (selectedFamily && selectedCategory) {
			fetchSubcategories(selectedCategory);
		}
	}, [selectedCategory]);

	useEffect(() => {
		setSelectedSubcategory(null);
	}, [selectedFamily, selectedCategory]);

	const handleSelectFamily = (value: string) => {
		setSelectedFamily(value);
	};

	const handleSelectCategory = (value: string) => {
		setSelectedCategory(value);
	};

	const handleSelectSubcategory = (value: string) => {
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
