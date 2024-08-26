import NumberSelect from '@components/commons/form/NumberSelect';
import Info from '@components/commons/Info';
import InfoSection from '@components/commons/InfoSection';
import Slideshow from '@components/commons/Slideshow';
import CloseIcon from '@components/svg/CloseIcon';
import { airontoolsAPI } from '@configs/api.config';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import { useState } from 'react';

const ToolInfoModal = ({
	isOpen,
	onClose,
	product,
}: {
	isOpen: boolean;
	onClose: () => void;
	product: ProductDataFrontend | null;
}) => {
	if (!isOpen) return null;
	const [selectedNumber, setSelectedNumber] = useState<number>(1);

	const handlePdfGen = (id: string) => {
		const pdfUrl = `${airontoolsAPI}/basic-reports/product/${id}?opt=${selectedNumber - 1}`;
		window.open(pdfUrl, '_blank');
	};

	// Función para manejar la selección del número
	const handleNumberSelect = (value: number) => {
		setSelectedNumber(value);
	};
	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<button className='modal-close' onClick={onClose}>
					<CloseIcon />
				</button>
				{product && (
					<div>
						<h2 style={{ top: 'sticky' }}>
							{product.name}
							<div>
								<div>
									<NumberSelect
										size={product.images?.length || 0}
										title={'Imagen para ficha técnica'}
										onSelect={handleNumberSelect}
									/>
								</div>
								<button
									className='add'
									onClick={() => handlePdfGen(product.id)}
								>
									Ver Ficha Técnica (PDF)
								</button>
							</div>
						</h2>
						<div
							style={{ maxHeight: '60vh', overflowY: 'auto', padding: '20px' }}
						>
							<Info title={'Fotos'} info={'-'} />
							<div className='grupo'>
								{product.images && (
									<Slideshow showNumbers={true} images={product.images} />
								)}
								<div>
									<Info title={'Nombre'} info={product.name} />
									<Info title={'Modelo'} info={product.model} />
									<Info title={'Familia'} info={product.family.name} />
									<Info title={'Categoría'} info={product.category.name} />
									<Info
										title={'Subcategoría'}
										info={product.subcategory.name}
									/>
								</div>
							</div>
							<Info title={'Descripción'} info={product.description} />
							<InfoSection
								title='Especificaciones'
								items={
									product.specifications.map(
										spec =>
											`${spec.specification.name}: ${spec.value} ${spec.specification.unit}`,
									) || []
								}
							/>
							<InfoSection
								title='Características'
								items={product.characteristics || []}
							/>
							<InfoSection
								title='Aplicaciones'
								items={product.applications || []}
							/>
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
					</div>
				)}
			</div>
		</div>
	);
};

export default ToolInfoModal;
