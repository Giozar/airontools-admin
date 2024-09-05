import SelectInput from '@components/commons/SelectInput';
import SpecificationForm from '@components/specifications/SpecificationForm';
import { useFamilySpecifications } from '@hooks/families/useFamilySpecifications';

export default function FamilySpecifications() {
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

	return (
		<>
			<div style={{ width: '50%' }}>
				<SelectInput
					id='familiaselect'
					name='Selecciona una familia'
					options={families}
					onChange={handleSelectFamily}
				/>
				{categories.length > 0 && (
					<SelectInput
						id='catselect'
						name='Selecciona una categoría'
						options={categories}
						onChange={handleSelectCategory}
					/>
				)}
				{subcategories.length > 0 && (
					<SelectInput
						id='subcatselect'
						name='Selecciona una subcategoría'
						options={subcategories}
						onChange={handleSelectSubcategory}
					/>
				)}
				<hr />
			</div>
			{selectedFamily && selectedCategory && selectedSubcategory && (
				<SpecificationForm
					familyId={selectedFamily}
					categoryId={selectedCategory}
					subcategoryId={selectedSubcategory}
				/>
			)}
		</>
	);
}
