import SelectInput from '@components/commons/SelectInput';
import { useFamilySpecifications } from '@hooks/families/useFamilySpecifications';
import React, { useEffect } from 'react';

interface CategorizationSectionProps {
	index: number;
	onChange: (
		index: number,
		selectedFamily: string,
		selectedCategory: string,
		selectedSubcategory: string,
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
	} = useFamilySpecifications();

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
		onChange(index, selectedFamily, selectedCategory, selectedSubcategory);
	}, [selectedFamily, selectedCategory, selectedSubcategory, index]);

	const handleFamilyChange = (value: string) => {
		handleSelectFamily(value);
		// console.log(`Cambio de familia a: ${value}`);
	};

	const handleCategoryChange = (value: string) => {
		handleSelectCategory(value);
		// console.log(`Cambio de categoría a: ${value}`);
	};

	const handleSubcategoryChange = (value: string) => {
		handleSelectSubcategory(value);
		// console.log(`Cambio de subcategoría a: ${value}`);
	};

	return (
		<div style={{ width: '50%' }}>
			<SelectInput
				id={`familiaselect-${index}`}
				name='Selecciona una familia'
				options={families}
				onChange={handleFamilyChange}
			/>
			{selectedFamily && selectedFamily.length > 0 && (
				<SelectInput
					id={`catselect-${index}`}
					name='Selecciona una categoría'
					options={categories}
					onChange={handleCategoryChange}
				/>
			)}
			{selectedCategory && selectedCategory.length > 0 && (
				<SelectInput
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
