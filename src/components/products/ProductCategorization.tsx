import SelectInput from '@components/commons/SelectInput';

interface ProductCategorizationProps {
	families: { id: string; name: string }[];
	selectedFamily: { id: string; name: string } | null;
	handleFamilyChange: (value: string) => void;
	filteredCategories: { id: string; name: string }[];
	selectedCategory: { id: string; name: string } | null;
	handleCategoryChange: (value: string) => void;
	filteredSubcategories: { id: string; name: string }[];
	selectedSubcategory: { id: string; name: string } | null;
	handleSubcategoryChange: (value: string) => void;
}

export function ProductCategorization({
	families,
	handleFamilyChange,
	filteredCategories,
	handleCategoryChange,
	filteredSubcategories,
	handleSubcategoryChange,
}: ProductCategorizationProps) {
	return (
		<>
			<div>
				<SelectInput
					id='familiaselect'
					name='Selecciona una familia'
					options={families.map(family => ({
						value: family.id,
						label: family.name,
					}))}
					onChange={handleFamilyChange}
				/>
				{filteredCategories.length > 0 && (
					<SelectInput
						id='catselect'
						name='Selecciona una categoría'
						options={filteredCategories.map(category => ({
							value: category.id,
							label: category.name,
						}))}
						onChange={handleCategoryChange}
					/>
				)}
				{filteredSubcategories.length > 0 && (
					<SelectInput
						id='subcatselect'
						name='Selecciona una subcategoría'
						options={filteredSubcategories.map(subcategory => ({
							value: subcategory.id,
							label: subcategory.name,
						}))}
						onChange={handleSubcategoryChange}
					/>
				)}
			</div>
		</>
	);
}
