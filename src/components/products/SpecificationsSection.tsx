import TableRow from '@components/commons/TableRow';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import { useEffect } from 'react';
import useSpecificationsProductCategorization from './hooks/useSpecificationsProductCategorization';

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
	const { specificationList } = useSpecificationsProductCategorization({
		familyId,
		categoryId,
		subcategoryId,
	});
	const { specifications, setSpecifications, family, category, subcategory } =
		useProductCreateContext(); // Usar el contexto

	// Manejar el cambio en el valor de una especificación específica
	const handleSpecificationChange = (specId: string, newValue: string) => {
		// Actualizar el valor directamente en el contexto de especificaciones
		const updatedSpecifications = specifications.map(spec =>
			spec.specification === specId ? { ...spec, value: newValue } : spec,
		);

		// Si no existe la especificación, agregarla al array
		if (!updatedSpecifications.some(spec => spec.specification === specId)) {
			updatedSpecifications.push({ specification: specId, value: newValue });
		}

		// Actualizar el contexto
		setSpecifications(updatedSpecifications);
	};

	useEffect(() => {
		console.log(
			`FAMILIA: ${family},  CATEGORÍA: ${category}, SUBCATEGORÍA: ${subcategory}`,
		);
		// console.log(specifications);
		console.log(specificationList);
		if (specificationList.length > 0 && specifications.length > 0) {
			console.log(specificationList);
			// console.log('Voy a monitorear y reiniciar');
			const updatedSpecifications = specifications.filter(spec =>
				specificationList.some(listSpec => listSpec.id === spec.specification),
			);
			// console.log(updatedSpecifications);

			setSpecifications(updatedSpecifications); // Actualizar las especificaciones eliminando las no encontradas
		}
	}, [specificationList]);

	return (
		<>
			{specificationList && specificationList.length > 0 ? (
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
									// Buscar el valor en las especificaciones si existe, de lo contrario, dejar vacío
									value={
										specifications.find(
											productSpec => productSpec.specification === spec.id,
										)?.value || ''
									}
									onValueChange={newValue =>
										handleSpecificationChange(spec.id, newValue)
									}
								/>
							))}
						</tbody>
					</table>
					<p style={{ marginTop: '20px' }}>Nuevas especificaciones:</p>
				</div>
			) : (
				<p>No hay especificaciones disponibles.</p>
			)}
		</>
	);
}
