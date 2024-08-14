import useFetchCategories from '@hooks/categories/useFetchCategories';
import useFetchFamilies from '@hooks/families/useFetchFamilies';
import useFetchSubcategories from '@hooks/subcategories/useFetchSubcategories';
import { CategoryDataFrontend } from '@interfaces/Category.interface';
import { FamilyDataFrontend } from '@interfaces/Family.interface';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { useEffect, useState } from 'react';

const useToolCategorizationEdit = () => {
	const { families } = useFetchFamilies();
	const { categories } = useFetchCategories();
	const { subcategories } = useFetchSubcategories();
	const [selectedFamily, setSelectedFamily] =
		useState<FamilyDataFrontend | null>();
	const [selectedCategory, setSelectedCategory] =
		useState<CategoryDataFrontend | null>();
	const [selectedSubcategory, setSelectedSubcategory] =
		useState<SubcategoryDataFrontend | null>();
	const [filteredCategories, setFilteredCategories] = useState<
		CategoryDataFrontend[]
	>([]);
	const [filteredSubcategories, setFilteredSubcategories] = useState<
		SubcategoryDataFrontend[]
	>([]);

	useEffect(() => {
		if (selectedFamily) {
			const filtered = categories.filter(
				category => category.family.id === selectedFamily.id,
			);
			setFilteredCategories(filtered);
			// Clear the selected category if it is no longer valid
			if (
				selectedCategory &&
				!filtered.some(category => category.id === selectedCategory.id)
			) {
				setSelectedCategory(null);
			}
		} else {
			setFilteredCategories([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFamily, categories]);

	useEffect(() => {
		if (selectedCategory) {
			const filtered = subcategories.filter(
				subcategory => subcategory.category._id === selectedCategory.id,
			);
			setFilteredSubcategories(filtered);
			// Clear the selected subcategory if it is no longer valid
			if (
				selectedSubcategory &&
				!filtered.some(subcategory => subcategory.id === selectedSubcategory.id)
			) {
				setSelectedSubcategory(null);
			}
		} else {
			setFilteredSubcategories([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategory, subcategories]);

	// Function to handle family selection change
	const handleFamilyChange = (value: string) => {
		setSelectedFamily(families.find(family => family.id === value) || null);
	};

	// Function to handle category selection change
	const handleCategoryChange = (value: string) => {
		setSelectedCategory(
			filteredCategories.find(category => category.id === value) || null,
		);
	};

	// Function to handle subcategory selection change
	const handleSubcategoryChange = (value: string) => {
		setSelectedSubcategory(
			filteredSubcategories.find(subcategory => subcategory.id === value) ||
				null,
		);
	};

	// Return selected values and functions
	return {
		families,
		selectedFamily,
		selectedCategory,
		selectedSubcategory,
		filteredCategories,
		filteredSubcategories,
		handleFamilyChange,
		handleCategoryChange,
		handleSubcategoryChange,
	};
};
export default useToolCategorizationEdit;
