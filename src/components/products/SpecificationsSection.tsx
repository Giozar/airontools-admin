import TableRow from '@components/commons/TableRow';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import { useSpecificationsByCategory } from '@hooks/specifications/useSpecificationsByCategory';
import { useSpecificationsByFamily } from '@hooks/specifications/useSpecificationsByFamily';
import { useSpecificationsBySubcategory } from '@hooks/specifications/useSpecificationsBySubcategory';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { useEffect, useState } from 'react';

interface SpecificationsSectionProps {
	familyId: string;
	categoryId: string;
	subcategoryId: string;
}

export default function SpecificationsSection({
	familyId,
	categoryId,
	subcategoryId,
}: SpecificationsSectionProps) {
	// Consultamos las especificaciones
	const { specificationsByFamilyId } = useSpecificationsByFamily(familyId);
	const { specificationsByCategoryId } =
		useSpecificationsByCategory(categoryId);
	const { specificationsBySubcategoryId } =
		useSpecificationsBySubcategory(subcategoryId);

	const { setApplications } = useProductCreateContext();

	// Estado para almacenar las especificaciones de cada origen y sus valores
	const [specificationList, setSpecificationList] = useState<
		SpecDataFrontend[]
	>([]);
	const [specificationValues, setSpecificationValues] = useState<{
		[key: string]: string;
	}>({});

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

	// Cada vez que cambien los valores de las especificaciones, se actualiza el contexto
	useEffect(() => {
		const valuesArray = Object.values(specificationValues);
		setApplications(valuesArray); // Actualiza las aplicaciones en el contexto con los valores actuales
	}, [specificationValues, setApplications]);

	// Manejar el cambio en el valor de una especificación específica
	const handleSpecificationChange = (specId: string, newValue: string) => {
		setSpecificationValues(prevValues => ({
			...prevValues,
			[specId]: newValue,
		}));
	};

	return (
		<>
			{specificationList.length > 0 && (
				<div style={{ marginBottom: '100px' }}>
					<label htmlFor='spec'>Lista de Especificaciones</label>
					<table id='spec'>
						<tbody>
							{specificationList.map(spec => (
								<TableRow
									key={spec.id}
									label={spec.name}
									unit={spec.unit || ''}
									placeholder={`Agregar ${spec.name || ''}`}
									onValueChange={newValue =>
										handleSpecificationChange(spec.id, newValue)
									}
								/>
							))}
						</tbody>
					</table>
					<p style={{ marginTop: '20px' }}>Nuevas especificaciones:</p>
				</div>
			)}
		</>
	);
}
