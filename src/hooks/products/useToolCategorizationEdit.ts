import useFetchCategories from '@hooks/categories/useFetchCategories';
import useFetchFamilies from '@hooks/families/useFetchFamilies';
import useFetchSubcategories from '@hooks/subcategories/useFetchSubcategories';
import { CategoryDataFrontend } from '@interfaces/Category.interface';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { useEffect, useState } from 'react';
function useToolCategorizationEdit({
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
		setCategoryId(newValue);
		const category = filteredCategories.find(f => f.id === newValue);
		setCategoryName(category ? category.name : '');
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

export default useToolCategorizationEdit;
