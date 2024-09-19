import SelectInput from '@components/commons/SelectInput';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import useFetchCategoriesByFamily from '@hooks/categories/useFetchCategoriesByFamily';
import useFetchFamilies from '@hooks/families/useFetchFamilies';
import useFetchSubcategoriesByFamily from '@hooks/subcategories/useFetchSubcategoriesByFamily';

export function ProductCategorization() {
	const {
		family,
		setFamily,
		category,
		setCategory,
		subcategory,
		setSubcategory,
	} = useProductCreateContext();

	// Fetch families, categories, and subcategories based on current selections
	const { families } = useFetchFamilies();
	const { categories } = useFetchCategoriesByFamily(family);
	const { subcategories } = useFetchSubcategoriesByFamily(category);

	// Handle changes when family changes
	const handleFamilyChange = (newFamily: string) => {
		setFamily(newFamily);
		// Reset category and subcategory when family changes
		setCategory('');
		setSubcategory('');
	};

	// Handle changes when category changes
	const handleCategoryChange = (newCategory: string) => {
		setCategory(newCategory);
		// Reset subcategory when category changes
		setSubcategory('');
	};

	return (
		<div>
			<SelectInput
				id='familiaselect'
				name='Selecciona una familia'
				options={families.map(f => ({
					value: f.id,
					label: f.name,
				}))}
				value={family || ''} // Preselect the current family, fallback to an empty string
				onChange={handleFamilyChange} // Handle family change
			/>
			{family && (
				<SelectInput
					id='catselect'
					name='Selecciona una categoría'
					options={categories.map(cat => ({
						value: cat.id,
						label: cat.name,
					}))}
					value={category || ''} // Preselect the current category, fallback to an empty string
					onChange={handleCategoryChange} // Handle category change
				/>
			)}
			{category && (
				<SelectInput
					id='subcatselect'
					name='Selecciona una subcategoría'
					options={subcategories.map(subcat => ({
						value: subcat.id,
						label: subcat.name,
					}))}
					value={subcategory || ''} // Preselect the current subcategory, fallback to an empty string
					onChange={setSubcategory} // Directly set subcategory
				/>
			)}
		</div>
	);
}
