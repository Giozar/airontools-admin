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

	const { specifications, setSpecifications } = useProductCreateContext(); // Usar el contexto

	// Estado para almacenar el valor de las especificaciones del producto
	const [specificationValues, setSpecificationValues] = useState<{
		[key: string]: string;
	}>({});

	// Al cargar el componente, inicializamos los valores si ya existen especificaciones en el estado
	useEffect(() => {
		if (specifications && specifications.length > 0) {
			const initialValues = specifications.reduce(
				(acc, spec) => {
					acc[spec.specification] = spec.value; // Mapea el valor del contexto
					return acc;
				},
				{} as { [key: string]: string },
			);
			setSpecificationValues(initialValues); // Establece los valores en el estado
		}
	}, []);

	// Cada vez que cambien los valores de las especificaciones, se actualiza el contexto
	useEffect(() => {
		// Mapeamos los valores actuales a la interfaz ProductSpecification
		const specificationArray = Object.entries(specificationValues).map(
			([specId, value]) => ({
				specification: specId,
				value,
			}),
		);

		setSpecifications(specificationArray); // Actualiza las especificaciones en el contexto con el formato correcto
	}, [specificationValues]);

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
									value={specificationValues[spec.id] || ''} // Muestra el valor si existe
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
