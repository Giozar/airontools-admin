import CheckboxInputList from '@components/commons/CheckboxInputList';
import SelectInput from '@components/commons/SelectInput';
import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import { useMultipleFamilySpecifications } from '@hooks/families/useMultipleFamilySpecifications';
import React, { useEffect } from 'react';
import { Categorization } from './types';

interface CategorizationSectionProps {
	index: number;
}

const handleCategorizationChange = (
	categorizations: Categorization[],
	setCategorizations: (value: Categorization[]) => void,
	index: number,
	selectedFamily: string,
	selectedCategories: string[],
	selectedSubcategories: string[],
) => {
	const updatedCategorizations = categorizations.map((cat, i) => {
		if (i === index) {
			return {
				selectedFamily: selectedFamily || cat.selectedFamily,
				selectedCategories: selectedCategories || cat.selectedCategories,
				selectedSubcategories:
					selectedSubcategories || cat.selectedSubcategories,
			};
		}
		return cat;
	});

	setCategorizations(updatedCategorizations);
};

const CategorizationSection: React.FC<CategorizationSectionProps> = ({
	index,
}) => {
	const { categorizations, setCategorizations } = useSpecificationContext();
	const {
		families,
		categories,
		subcategories,
		selectedFamily,
		selectedCategory,
		selectedSubcategory,
		handleSelectFamily,
		handleSelectCategory,
		handleSelectSubcategory,
	} = useMultipleFamilySpecifications();

	// Usar useEffect para manejar los cambios de selección en tiempo real
	useEffect(() => {
		// console.log(`Familia seleccionada en sección ${index}:`, selectedFamily);
		// console.log(
		// 	`Categoría seleccionada en sección ${index}:`,
		// 	selectedCategory,
		// );
		// console.log(
		// 	`Subcategoría seleccionada en sección ${index}:`,
		// 	selectedSubcategory,
		// );
		handleCategorizationChange(
			categorizations,
			setCategorizations,
			index,
			selectedFamily || '',
			selectedCategory,
			selectedSubcategory,
		);
	}, [selectedFamily, selectedCategory, selectedSubcategory, index]);

	const handleFamilyChange = (value: string) => {
		handleSelectFamily(value);
		// console.log(`Cambio de familia a: ${value}`);
	};

	const handleCategoryChange = (value: string[]) => {
		handleSelectCategory(value);
		// console.log(`Cambio de categoría a: ${value}`);
	};

	const handleSubcategoryChange = (value: string[]) => {
		handleSelectSubcategory(value);
		// console.log(`Cambio de subcategoría a: ${value}`);
	};

	return (
		<div style={{ width: '50%' }}>
			<SelectInput
				id={`familiaselect-${index}`}
				name='Selecciona una familia'
				options={families}
				setValue={handleFamilyChange}
			/>
			{selectedFamily && selectedFamily.length > 0 && (
				<CheckboxInputList
					id={`catselect-${index}`}
					name='Selecciona las categorías'
					options={categories}
					onChange={handleCategoryChange}
				/>
			)}
			{selectedCategory && selectedCategory.length > 0 && (
				<CheckboxInputList
					id={`subcatselect-${index}`}
					name='Selecciona una subcategoría'
					options={subcategories}
					onChange={handleSubcategoryChange}
				/>
			)}
			<hr />
		</div>
	);
};

export default CategorizationSection;
