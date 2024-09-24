import CheckboxInputList from '@components/commons/CheckboxInputList';
import SelectInput from '@components/commons/SelectInput';
import { useMultipleFamilySpecifications } from '@hooks/families/useMultipleFamilySpecifications';
import React, { useEffect } from 'react';

interface CategorizationSectionProps {
	index: number;
	onChange: (
		index: number,
		selectedFamily: string,
		selectedCategories: string[],
		selectedSubcategories: string[],
	) => void;
}

const CategorizationSection: React.FC<CategorizationSectionProps> = ({
	index,
	onChange,
}) => {
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
		onChange(
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
