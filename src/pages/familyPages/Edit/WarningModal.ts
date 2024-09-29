import fetchCounts from '@hooks/common/FetchCounts';

export const WarningModal = async (
	id: string,
	name: string,
	handleDelete: any,
	openModal: any,
	fetchCategories: boolean,
	fetchSubcategories: boolean,
	fetchSpecifications: boolean,
	fetchProducts: boolean,
	type?: string,
) => {
	try {
		const counts = await fetchCounts(
			id,
			{
				fetchCategories,
				fetchSubcategories,
				fetchSpecifications,
				fetchProducts,
			},
			type,
		);
		console.log(counts);
		const hasAssociatedItems = Object.values(counts).some(count => count > 0);

		if (hasAssociatedItems) {
			openModal(
				'Advertencia',
				`Esta **${name}** tiene elementos asociados. La eliminación afectará a: 
${counts.categories && counts.categories > 0 ? `- ${counts.categories} categorías.` : ''}
${counts.subcategories && counts.subcategories > 0 ? `- ${counts.subcategories} subcategorías.` : ''}
${counts.specifications && counts.specifications > 0 ? `- ${counts.specifications} especificaciones.` : ''}
${counts.products && counts.products > 0 ? `- ${counts.products} productos.` : ''}

¿Estás seguro de que quieres continuar?`,
				handleDelete,
				true,
				true,
				true,
			);
		} else {
			openModal(
				`Eliminar ${name}`,
				`Vas a eliminar esta ${name}. ¿Estás seguro de que quieres continuar?`,
				handleDelete,
				false,
				false,
			);
		}
	} catch (error) {
		openModal(
			'Error',
			'Ha ocurrido un error al verificar los datos asociados. Por favor, inténtalo de nuevo más tarde.',
			() => {},
			false,
			false,
		);
	}
};
