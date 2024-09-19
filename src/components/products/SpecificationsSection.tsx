import TableRow from '@components/commons/TableRow';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import { useEffect } from 'react';
import useSpecificationsProductCategorization from './hooks/useSpecificationsProductCategorization';

export default function SpecificationsSection() {
	const { specificationList } = useSpecificationsProductCategorization();
	const { specifications, setSpecifications } = useProductCreateContext(); // Usar el contexto

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
		// console.log(specifications);
		// console.log(specificationList);
		if (specificationList.length > 0 && specifications.length > 0) {
			// console.log('Voy a monitorear y reiniciar');
			/**
			 * Filtra las especificaciones de la herramienta para ver si en las lista de especificaciones categorizadas hay alguna
			 * especificación categorizada que su id se igual a alguna especificación de la herramienta, si es así
			 * la guarda y actualiza las especificaciones de la herramienta
			 */
			const updatedSpecifications = specifications.filter(spec =>
				specificationList.some(listSpec => listSpec.id === spec.specification),
			);

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
