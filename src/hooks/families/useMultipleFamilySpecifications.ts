import useFetchCategories from '@hooks/categories/useFetchCategories';
import useFetchFamilies from '@hooks/families/useFetchFamilies';
import useFetchSubcategories from '@hooks/subcategories/useFetchSubcategories';
import { useEffect, useState } from 'react';

export function useMultipleFamilySpecifications() {
	const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
	const [selectedSubcategory, setSelectedSubcategory] = useState<string[]>([]);

	const { families } = useFetchFamilies();
	const { categories } = useFetchCategories();
	const { subcategories } = useFetchSubcategories();

	const filteredCategories = selectedFamily
		? categories.filter(category => category.family.id === selectedFamily)
		: [];

	const filteredSubcategories =
		selectedCategory.length > 0
			? subcategories.filter(subcategory =>
					selectedCategory.includes(subcategory.category._id || '...'),
				)
			: [];

	useEffect(() => {
		// Reset selected categories and subcategories when family changes
		setSelectedCategory([]);
		setSelectedSubcategory([]);
	}, [selectedFamily]);

	useEffect(() => {
		// Reset selected subcategories when categories change
		setSelectedSubcategory([]);
	}, [selectedCategory]);

	const handleSelectFamily = (value: string) => {
		setSelectedFamily(value);
	};

	const handleSelectCategory = (values: string[]) => {
		setSelectedCategory(values);
	};

	const handleSelectSubcategory = (values: string[]) => {
		setSelectedSubcategory(values);
	};

	return {
		families: families.map(family => ({
			value: family.id,
			label: family.name,
		})),
		categories: filteredCategories.map(category => ({
			value: category.id,
			label: category.name,
		})),
		subcategories: filteredSubcategories.map(subcategory => ({
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
