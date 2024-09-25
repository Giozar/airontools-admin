import CheckboxInputList from '@components/commons/CheckboxInputList';
import SelectInput from '@components/commons/SelectInput';
import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import useFetchCategorization from '@hooks/families/useFetchCategorization';
import { useEffect, useState } from 'react';

export default function Categorizations({ index }: { index: number }) {
	const {
		categorizations,
		updateFamily,
		updateCategories,
		updateSubcategories,
	} = useSpecificationContext();
	const { families, loading } = useFetchCategorization();
	// Malabares pero funciona
	const [familyList, setFamilyList] = useState<
		{ value: string; label: string }[]
	>([]);
	const [categoryList, setCategoryList] = useState<
		{ family: string; options: { value: string; label: string } }[]
	>([]);
	const [subcategoryList, setSubcategoryList] = useState<
		{ category: string; options: { value: string; label: string } }[]
	>([]);

	useEffect(() => {
		if (families.length > 0) {
			setFamilyList(
				families.map(fam => ({
					value: fam.id,
					label: fam.name,
				})),
			);
			setCategoryList(
				families.flatMap(fam =>
					fam.categories
						? fam.categories.map(cat => ({
								family: cat.family.id || '',
								options: {
									value: cat.id,
									label: cat.name,
								},
							}))
						: [],
				),
			);

			setSubcategoryList(
				families.flatMap(fam =>
					fam.subcategories
						? fam.subcategories.map(subcat => ({
								category: subcat.category._id || '',
								options: {
									value: subcat.id,
									label: subcat.name,
								},
							}))
						: [],
				),
			);
		}
	}, [families]);

	return (
		<div style={{ width: '50%' }}>
			{!loading && (
				<>
					<SelectInput
						id={`familiaselect-${index}`}
						name='Selecciona una familia'
						options={familyList.filter(
							fam =>
								!categorizations.some(cat => cat.selectedFamily === fam.value),
						)}
						label={
							familyList.find(
								fam => fam.value === categorizations[index].selectedFamily,
							)?.label
						}
						value={categorizations[index].selectedFamily}
						setValue={selectedValues => updateFamily(index, selectedValues)}
					/>
					{categorizations[index].selectedFamily && (
						<CheckboxInputList
							id={`catselect-${index}`}
							name='Selecciona las categorías'
							options={categoryList
								.filter(
									cat => cat.family === categorizations[index].selectedFamily,
								)
								.map(cat => cat.options)}
							preselectedValues={categorizations[index].selectedCategories}
							onChange={selectedValues =>
								updateCategories(index, selectedValues)
							}
						/>
					)}
					{categorizations[index].selectedFamily &&
						categorizations[index].selectedCategories && (
							<CheckboxInputList
								id={`subcatselect-${index}`}
								name='Selecciona una subcategoría'
								options={subcategoryList
									.filter(subcat =>
										categorizations[index].selectedCategories.includes(
											subcat.category,
										),
									)
									.map(cat => cat.options)}
								preselectedValues={categorizations[index].selectedSubcategories}
								onChange={selectedValues =>
									updateSubcategories(index, selectedValues)
								}
							/>
						)}
					<hr />
				</>
			)}
		</div>
	);
}
