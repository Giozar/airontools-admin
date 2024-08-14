import useFetchCategories from '@hooks/useFetchCategories';
import useFetchFamilies from '@hooks/useFetchFamilies';
import useFetchSubcategories from '@hooks/useFetchSubcategories';
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

/* function useToolCategorizationEdit({
	initialFamilyId,
	initialCategoryId,
	initialSubcategoryId,
}: {
	initialFamilyId: string;
	initialCategoryId: string;
	initialSubcategoryId?: string;
}) {
	const [familyId, setFamilyId] = useState(initialFamilyId);
	const [categoryId, setCategoryId] = useState(initialCategoryId);
	const [subcategoryId, setSubcategoryId] = useState(initialSubcategoryId);

	const [familyName, setFamilyName] = useState('');
	const [categoryName, setCategoryName] = useState('');
	const [subcategoryName, setSubcategoryName] = useState('');

	const { families } = useFetchFamilies();
	const { categories } = useFetchCategories();
	const { subcategories } = useFetchSubcategories();
	const [filteredCategories, setFilteredCategories] = useState<
		CategoryDataFrontend[]
	>([]);
	const [filteredSubcategories, setFilteredSubcategories] = useState<
		SubcategoryDataFrontend[]
	>([]);

	useEffect(() => {
		if (categories) {
			setFilteredCategories(categories.filter(c => c.family.id === familyId));
		}
	}, [categories, familyId]);
	useEffect(() => {
		if (categories) {
			setFilteredSubcategories(
				subcategories.filter(c => c.category._id === categoryId),
			);
		}
	}, [subcategories, categoryId, categories]);

	useEffect(() => {
		const family = families.find(f => f.id === familyId);
		setFamilyName(family ? family.name : '');

		const category = filteredCategories.find(c => c.id === categoryId);
		setCategoryName(category ? category.name : '');

		const subcategory = filteredSubcategories.find(s => s.id === subcategoryId);
		setSubcategoryName(subcategory ? subcategory.name : '');
	}, [
		families,
		familyId,
		categoryId,
		subcategoryId,
		filteredCategories,
		filteredSubcategories,
	]);

	const handleFamilyIdUpdate = (newValue: string) => {
		setFamilyId(newValue);
		const family = families.find(f => f.id === newValue);
		setFamilyName(family ? family.name : '');
		setFilteredCategories(categories.filter(f => f.family.id === newValue));
		setCategoryId('');
		setCategoryName('');
		setSubcategoryId('');
		setSubcategoryName('');
	};

	const handleCategoryIdUpdate = (newValue: string) => {
		console.log('Selected value:', newValue); // Verifica el valor seleccionado

		setCategoryId(newValue);
		const category = filteredCategories.find(f => f.id === newValue);
		setCategoryName(category ? category.name : '');
		console.log(category ? category.name : '');
		setFilteredSubcategories(
			subcategories.filter(f => f.category._id === newValue),
		);
		setSubcategoryId('');
		setSubcategoryName('');
	};

	const handleSubcategoryIdUpdate = (newValue: string) => {
		setSubcategoryId(newValue);
		const subcategory = filteredSubcategories.find(f => f.id === newValue);
		setSubcategoryName(subcategory ? subcategory.name : '');
	};

	return {
		families,
		familyId,
		setFamilyId,
		filteredCategories,
		categoryId,
		setCategoryId,
		filteredSubcategories,
		subcategoryId,
		setSubcategoryId,
		familyName,
		categoryName,
		subcategoryName,
		handleFamilyIdUpdate,
		handleCategoryIdUpdate,
		handleSubcategoryIdUpdate,
	};
}
*/
/*
	const {
	  familyId,
	  setFamilyId,
	  categoryId,
	  setCategoryId,
	  subcategoryId,
	  setSubcategoryId,
	  familyName,
	  categoryName,
	  subcategoryName,
	  specifications,
	  handleFamilyIdUpdate,
	  handleCategoryIdUpdate,
	  handleSubcategoryIdUpdate
	} = useToolCategorizationEdit({
	  initialFamilyId: toolToEdit.familyId,
	  initialCategoryId: toolToEdit.categoryId,
	  initialSubcategoryId: toolToEdit.subcategoryId
	}); */
export default useToolCategorizationEdit;
