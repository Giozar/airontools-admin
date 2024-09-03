import SelectInput from '@components/commons/SelectInput';
import { useFamilySpecifications } from '@hooks/families/useFamilySpecifications';
import React from 'react';

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

	const handleFamilyChange = (value: string) => {
		handleSelectFamily(value);
		console.log(selectedFamily);
		onChange(index, selectedFamily, '', '');
	};

	const handleCategoryChange = (value: string) => {
		handleSelectCategory(value);
		onChange(index, '', selectedCategory, '');
	};

	const handleSubcategoryChange = (value: string) => {
		handleSelectSubcategory(value);
		onChange(index, '', '', selectedSubcategory);
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
