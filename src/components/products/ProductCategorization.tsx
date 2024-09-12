import SelectInput from '@components/commons/SelectInput';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import useFetchCategoriesByFamily from '@hooks/categories/useFetchCategoriesByFamily';
import useFetchFamilies from '@hooks/families/useFetchFamilies';
import useFetchSubcategoriesByFamily from '@hooks/subcategories/useFetchSubcategoriesByFamily';
import { useEffect } from 'react';

export function ProductCategorization() {
	const { families } = useFetchFamilies();
	const {
		family,
		setFamily,
		category,
		setCategory,
		subcategory,
		setSubcategory,
	} = useProductCreateContext();

	// Fetch categories and subcategories based on family and category selections
	const { categories } = useFetchCategoriesByFamily(family);
	const { subcategories } = useFetchSubcategoriesByFamily(category);

	// Ensure that selected family, category, and subcategory are updated when editing an existing product
	useEffect(() => {
		if (family) {
			setFamily(family);
		}
		if (category) {
			setCategory(category);
		}
		if (subcategory) {
			setSubcategory(subcategory);
		}
	}, [family, category, subcategory, setFamily, setCategory, setSubcategory]);

	return (
		<div>
			<SelectInput
				id='familiaselect'
				name='Selecciona una familia'
				options={families.map(family => ({
					value: family.id,
					label: family.name,
				}))}
				value={family} // Preselect the current family
				onChange={setFamily}
			/>
			{family && family.length > 0 && (
				<SelectInput
					id='catselect'
					name='Selecciona una categoría'
					options={categories.map(category => ({
						value: category.id,
						label: category.name,
					}))}
					value={category} // Preselect the current category
					onChange={setCategory}
				/>
			)}
			{category && category.length > 0 && (
				<SelectInput
					id='subcatselect'
					name='Selecciona una subcategoría'
					options={subcategories.map(subcategory => ({
						value: subcategory.id,
						label: subcategory.name,
					}))}
					value={subcategory} // Preselect the current subcategory
					onChange={setSubcategory}
				/>
			)}
		</div>
	);
}
