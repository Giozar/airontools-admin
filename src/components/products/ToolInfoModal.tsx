import Info from '@components/commons/Info';
import InfoSection from '@components/commons/InfoSection';
import Slideshow from '@components/commons/Slideshow';
import CloseIcon from '@components/svg/CloseIcon';
import { ProductDataFrontend } from '@interfaces/Product.interface';
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
	const handlePdfGen = (id: string) => {
		const pdfUrl = 'http://localhost:4000/basic-reports/product/' + id;
		window.open(pdfUrl, '_blank');
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
							<button className='add' onClick={() => handlePdfGen(product.id)}>
								Ver Ficha Técnica (PDF)
							</button>
						</h2>
						<div
							style={{ maxHeight: '60vh', overflowY: 'auto', padding: '20px' }}
						>
							<Info title={'Fotos'} info={'-'} />
							<div className='grupo'>
								{product.images && <Slideshow images={product.images} />}
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
								items={product.opcionalAccessories || []}
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
