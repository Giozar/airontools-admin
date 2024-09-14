import { useSpecificationsByCategory } from '@hooks/specifications/useSpecificationsByCategory';
import { useSpecificationsByFamily } from '@hooks/specifications/useSpecificationsByFamily';
import { useSpecificationsBySubcategory } from '@hooks/specifications/useSpecificationsBySubcategory';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { useEffect, useState } from 'react';

export default function useSpecificationsProductCategorization({
	familyId,
	categoryId,
	subcategoryId,
}: {
	familyId: string;
	categoryId: string;
	subcategoryId: string;
}) {
	// Consultamos las especificaciones
	const { specificationsByFamilyId } = useSpecificationsByFamily(familyId);
	const { specificationsByCategoryId } =
		useSpecificationsByCategory(categoryId);
	const { specificationsBySubcategoryId } =
		useSpecificationsBySubcategory(subcategoryId);

	// Estado para almacenar la lista de las especificaciones
	const [specificationList, setSpecificationList] = useState<
		SpecDataFrontend[]
	>([]);

	// Cada vez que cambien los ids o los datos obtenidos se actualiza la lista de especificaciones
	useEffect(() => {
		// Filtrar y actualizar las especificaciones dependiendo de los IDs
		const updatedSpecifications: SpecDataFrontend[] = [
			...specificationsByFamilyId,
			...specificationsByCategoryId,
			...specificationsBySubcategoryId,
		];

		// Setear las especificaciones, eliminando posibles duplicados basados en el ID de la especificación
		const uniqueSpecifications = updatedSpecifications.reduce(
			(acc: SpecDataFrontend[], spec) => {
				if (!acc.some(existingSpec => existingSpec.id === spec.id)) {
					acc.push(spec);
				}
				return acc;
			},
			[],
		);

		// Actualizamos la lista con las especificaciones únicas
		setSpecificationList(uniqueSpecifications);
	}, [
		familyId,
		specificationsByFamilyId,
		categoryId,
		specificationsByCategoryId,
		subcategoryId,
		specificationsBySubcategoryId,
	]);

	return { specificationList };
}
