import { useProductCreateContext } from '@contexts/product/ProductContext';
import { useSpecificationsByCategory } from '@hooks/specifications/useSpecificationsByCategory';
import { useSpecificationsByFamily } from '@hooks/specifications/useSpecificationsByFamily';
import { useSpecificationsBySubcategory } from '@hooks/specifications/useSpecificationsBySubcategory';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { useEffect, useState } from 'react';

export default function useSpecificationsProductCategorization() {
	const { family, category, subcategory } = useProductCreateContext();
	// Consultamos las especificaciones
	const { specificationsByFamilyId } = useSpecificationsByFamily(family);
	const { specificationsByCategoryId } = useSpecificationsByCategory(category);
	const { specificationsBySubcategoryId } =
		useSpecificationsBySubcategory(subcategory);

	// Estado para almacenar la lista de especificaciones finales
	const [specificationList, setSpecificationList] = useState<
		SpecDataFrontend[]
	>([]);

	// useEffect para manejar la lógica de recuperación, eliminación de duplicados y filtrado secuencial
	useEffect(() => {
		// console.log('Familia', family);
		// console.log('Categoría', category);
		// console.log('Subcategoría', subcategory);
		// 1. Recuperar todas las especificaciones de familia, categoría y subcategoría
		const allSpecifications: SpecDataFrontend[] = [
			...specificationsByFamilyId,
			...specificationsByCategoryId,
			...specificationsBySubcategoryId,
		];

		// 2. Eliminar duplicados basados en el 'id' de la especificación
		const uniqueSpecifications = allSpecifications.reduce(
			(acc: SpecDataFrontend[], currentSpec) => {
				if (!acc.some(spec => spec.id === currentSpec.id)) {
					acc.push(currentSpec);
				}
				return acc;
			},
			[],
		);

		// 3. Aplicar el filtrado según family, category, y subcategory
		let filteredSpecs: SpecDataFrontend[] = [];

		// Filtrar por familia si existe
		if (family.length > 0) {
			filteredSpecs = uniqueSpecifications.filter(spec =>
				spec.families.some(
					fam =>
						fam === family &&
						spec.categories.length === 0 &&
						spec.subcategories.length === 0,
				),
			);
		}

		// Filtrar por categoría si existe, sin eliminar las especificaciones de familia
		if (category.length > 0) {
			filteredSpecs = uniqueSpecifications.filter(
				spec =>
					spec.families.some(fam => fam === family) && // Coincide con la familia
					(spec.categories.length === 0 ||
						spec.categories.some(cat => cat === category)) &&
					spec.subcategories.length === 0,
			);
		}

		// Filtrar por subcategoría si existe, sin eliminar las especificaciones de familia o categoría
		if (subcategory.length > 0) {
			filteredSpecs = uniqueSpecifications.filter(
				spec =>
					spec.families.some(fam => fam === family) && // Coincide con la familia
					(spec.categories.length === 0 ||
						spec.categories.some(cat => cat === category)) && // Coincide con la categoría o no tiene categoría
					(spec.subcategories.length === 0 ||
						spec.subcategories.some(sub => sub === subcategory)), // Coincide con la subcategoría o no tiene subcategoría
			);
		}

		// 4. Actualizar el estado con el resultado final filtrado
		setSpecificationList(filteredSpecs);
	}, [
		family,
		category,
		subcategory,
		specificationsByFamilyId,
		specificationsByCategoryId,
		specificationsBySubcategoryId,
	]);

	return { specificationList, setSpecificationList };
}
