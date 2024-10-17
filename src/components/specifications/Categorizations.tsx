import CheckboxInputList from '@components/commons/CheckboxInputList';
import SelectInput from '@components/commons/SelectInput';
import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import useFetchCategorization from '@hooks/categorizations/useFetchCategorization';
import { FamilyDataFrontend } from '@interfaces/Family.interface';
import { useMemo } from 'react';

const useCategorizationData = (families: FamilyDataFrontend[]) => {
	const familyList = useMemo(
		() =>
			families.map(fam => ({
				value: fam.id,
				label: fam.name,
			})),
		[families],
	);

	const categoryList = useMemo(
		() =>
			families.flatMap(fam =>
				fam.categories
					? fam.categories.map(cat => ({
							family: cat.family.id || '',
							options: { value: cat.id, label: cat.name },
						}))
					: [],
			),
		[families],
	);

	const subcategoryList = useMemo(
		() =>
			families.flatMap(fam =>
				fam.subcategories
					? fam.subcategories.map(subcat => ({
							category: subcat.category._id || '',
							options: { value: subcat.id, label: subcat.name },
						}))
					: [],
			),
		[families],
	);

	return { familyList, categoryList, subcategoryList };
};

export default function Categorizations({ index }: { index: number }) {
	const {
		categorizations,
		updateFamily,
		updateCategories,
		updateSubcategories,
	} = useSpecificationContext();
	const { families, loading } = useFetchCategorization();

	const { familyList, categoryList, subcategoryList } =
		useCategorizationData(families);

	const handleFamilyChange = (selectedValues: string) => {
		updateFamily(index, selectedValues);
		updateCategories(index, []);
		updateSubcategories(index, []);
	};

	const handleCategoryChange = (selectedValues: string[]) => {
		updateCategories(index, selectedValues);
	};

	const handleSubcategoryChange = (selectedValues: string[]) => {
		updateSubcategories(index, selectedValues);
	};

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
						setValue={handleFamilyChange}
					/>
					{categorizations[index].selectedFamily && (
						<>
							<CheckboxInputList
								id={`catselect-${index}`}
								name='Selecciona las categorías'
								options={categoryList
									.filter(
										cat => cat.family === categorizations[index].selectedFamily,
									)
									.map(cat => cat.options)}
								preselectedValues={categorizations[index].selectedCategories}
								onChange={handleCategoryChange}
							/>
							{categorizations[index].selectedCategories.length > 0 && (
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
									preselectedValues={
										categorizations[index].selectedSubcategories
									}
									onChange={handleSubcategoryChange}
								/>
							)}
						</>
					)}
					<hr />
				</>
			)}
		</div>
	);
}
