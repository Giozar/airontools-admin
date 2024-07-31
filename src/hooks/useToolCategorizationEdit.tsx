import useFetchCategories from '@hooks/useFetchCategories';
import useFetchFamilies from '@hooks/useFetchFamilies';
import useFetchSubcategories from '@hooks/useFetchSubcategories';
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
	const { categories, filteredCategories, setFilteredCategories } =
		useFetchCategories();
	const { subcategories, filteredSubcategories, setFilteredSubcategories } =
		useFetchSubcategories();

	useEffect(() => {
		const family = families.find(f => f.id === familyId);
		setFamilyName(family ? family.name : '');

		const category = filteredCategories.find(c => c.id === categoryId);
		setCategoryName(category ? category.name : '');

		const subcategory = filteredSubcategories.find(s => s.id === subcategoryId);
		setSubcategoryName(subcategory ? subcategory.name : '');
	}, [
		families,
		filteredCategories,
		filteredSubcategories,
		familyId,
		categoryId,
		subcategoryId,
	]);

	const handleFamilyIdUpdate = (newValue: string) => {
		setFamilyId(newValue);
		const family = families.find(f => f.id === newValue);
		setFamilyName(family ? family.name : '');
		setFilteredCategories(categories.filter(f => f.familyId === newValue));
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
			subcategories.filter(f => f.categoryId === newValue),
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
