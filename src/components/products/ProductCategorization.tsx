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
	const { categories } = useFetchCategoriesByFamily(family);
	const { subcategories } = useFetchSubcategoriesByFamily(category);
	useEffect(() => {}, [family, category, subcategory]);
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
					onChange={setFamily}
				/>
				{family.length > 0 && (
					<SelectInput
						id='catselect'
						name='Selecciona una categoría'
						options={categories.map(category => ({
							value: category.id,
							label: category.name,
						}))}
						onChange={setCategory}
					/>
				)}
				{category.length > 0 && (
					<SelectInput
						id='subcatselect'
						name='Selecciona una subcategoría'
						options={subcategories.map(subcategory => ({
							value: subcategory.id,
							label: subcategory.name,
						}))}
						onChange={setSubcategory}
					/>
				)}
			</div>
		</>
	);
}
