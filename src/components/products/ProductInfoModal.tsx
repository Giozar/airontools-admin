import NumberSelect from '@components/commons/form/NumberSelect';
import Info from '@components/commons/Info';
import InfoSection from '@components/commons/InfoSection';
import ModalContent from '@components/commons/ModalContent';
import Slideshow from '@components/commons/Slideshow';
import { airontoolsAPI } from '@configs/api.config';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import { useState } from 'react';

export default function ToolInfoModal({
	isOpen,
	onClose,
	product,
}: {
	isOpen: boolean;
	onClose: () => void;
	product: ProductDataFrontend | null;
}) {
	const [selectedNumber, setSelectedNumber] = useState<number>(1);

	if (!isOpen || !product) return null;

	const handlePdfGen = (id: string) => {
		const pdfUrl = `${airontoolsAPI}/basic-reports/product/${id}?opt=${selectedNumber - 1}`;
		window.open(pdfUrl, '_blank');
	};

	// Función para manejar la selección del número
	const handleNumberSelect = (value: number) => {
		setSelectedNumber(value);
	};

	return (
		<ModalContent isOpen={isOpen} onClose={onClose} title={product.name || ''}>
			<h2 style={{ top: 'sticky', fontSize: '1.5rem' }}>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						marginTop: '20px',
						justifyContent: 'space-around',
						gap: '16px', // Añade espacio entre los elementos
					}}
				>
					{product.technicalDatasheet && (
						<p
							style={{
								flex: '1 1 100%',
								fontSize: '0.9rem', // Ajustar el tamaño de la letra del párrafo
								margin: '0', // Quitar el margen para mantener consistencia
							}}
						>
							Fecha de generación de ficha técnica:{' '}
							{product.technicalDatasheet.date}
						</p>
					)}
					<NumberSelect
						size={product.images?.length || 0}
						title={'Imagen para ficha técnica:'}
						onSelect={handleNumberSelect}
					/>

					<button
						className='add'
						onClick={() => handlePdfGen(product.id)}
						style={{ flex: '1 1 200px' }}
					>
						Ver Ficha Técnica (PDF)
					</button>
				</div>
			</h2>
			<div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '20px' }}>
				<Info title={'Fotos'} info={'-'} />
				<div className='grupo'>
					{product.images && (
						<Slideshow showNumbers={true} images={product.images} />
					)}
					<div>
						<Info title={'Nombre'} info={product.name} />
						<Info title={'Modelo'} info={product.model} />
						<Info
							title={'Familia'}
							info={product.family ? product.family.name : ''}
						/>
						<Info
							title={'Categoría'}
							info={product.category ? product.category.name : ''}
						/>
						<Info
							title={'Subcategoría'}
							info={product.subcategory ? product.subcategory.name : ''}
						/>
					</div>
				</div>
				<Info title={'Descripción'} info={product.description} />
				<InfoSection
					title='Especificaciones'
					items={
						product.specifications.map(
							spec =>
								`${spec.specification ? spec.specification.name : '**BORRADA**'}: ${spec.value} ${spec.specification ? spec.specification.unit : '**BORRADA**'}`,
						) || []
					}
				/>
				<InfoSection
					title='Características'
					items={product.characteristics || []}
				/>
				<InfoSection title='Aplicaciones' items={product.applications || []} />
				<InfoSection
					title='Recomendaciones'
					items={product.recommendations || []}
				/>
				<InfoSection
					title='Requisitos de operación'
					items={product.operationRequirements || []}
				/>
				<InfoSection
					title='Elementos incluidos'
					items={product.includedItems || []}
				/>
				<InfoSection
					title='Accesorios opcionales'
					items={product.optionalAccessories || []}
				/>
				<InfoSection title='Videos' items={product.videos || []} />
				<InfoSection title='Manuales' items={product.manuals || []} />
				<Info title={'Creado por'} info={product.createdBy.name} />
			</div>
		</ModalContent>
	);
}
