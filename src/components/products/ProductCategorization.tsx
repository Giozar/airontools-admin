import SelectInput from '@components/commons/SelectInput';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import useFetchCategoriesByFamilyId from '@hooks/categories/useFetchCategoriesByFamilyId';
import useFetchFamilies from '@hooks/categorizations/useFetchFamilies';
import useFetchSubcategoriesByCategoryId from '@hooks/subcategories/useFetchSubcategoriesByCategoryId';

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
	const { categories } = useFetchCategoriesByFamilyId(family);
	const { subcategories } = useFetchSubcategoriesByCategoryId(category);

	// Handle family change and reset category and subcategory
	const handleFamilyChange = (newFamily: string) => {
		setFamily(newFamily);
		setCategory(''); // Reset category when family changes
		setSubcategory(''); // Reset subcategory when family changes
	};

	// Handle category change and reset subcategory
	const handleCategoryChange = (newCategory: string) => {
		setCategory(newCategory);
		setSubcategory(''); // Reset subcategory when category changes
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
				setValue={handleFamilyChange} // Handle family change with reset logic
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
					setValue={handleCategoryChange} // Handle category change with reset logic
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
					setValue={setSubcategory} // Handle subcategory selection
				/>
			)}
		</div>
	);
}
