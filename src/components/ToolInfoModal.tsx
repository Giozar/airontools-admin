import { ProductDataFrontend } from '@interfaces/Product.interface';
import Slideshow from './Slideshow';
import CloseIcon from './svg/CloseIcon';

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
	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<button className='modal-close' onClick={onClose}>
					<CloseIcon />
				</button>
				{product && (
					<div>
						<h1>{product.name}</h1>
						<p>
							<strong>Fotos:</strong>
						</p>
						<div className='grupo'>
							{product.images && <Slideshow images={product.images} />}
							<div>
								<p>
									<strong>Nombre:</strong> {product.name}
								</p>
								<p>
									<strong>Modelo:</strong> {product.model}
								</p>
								<p>
									<strong>Family:</strong> {product.family.name}
								</p>
								<p>
									<strong>Category:</strong> {product.category.name}
								</p>
								<p>
									<strong>Subcategory:</strong>{' '}
									{product.subcategory.name || '---'}
								</p>
							</div>
						</div>
						<p>
							<strong>Descripción:</strong> <br /> {product.description}
						</p>

						<div style={{ margin: '20px 0' }}>
							<strong>Características:</strong>
							<ul>
								{product.characteristics?.map((char, index) => (
									<li key={index}>{char}</li>
								))}
							</ul>
						</div>

						<div style={{ margin: '20px 0' }}>
							<strong>Especificaciones:</strong>
							<ul>
								{product.specifications.length ? (
									product.specifications.map(spec => (
										<li key={spec.id}>
											{spec.specification.name}: {spec.value}{' '}
											{spec.specification.unit}
										</li>
									))
								) : (
									<li>No hay especificaciones disponibles</li>
								)}
							</ul>
						</div>

						<p>
							<strong>Creado por:</strong> {product.createdBy.name}
						</p>
						<button className='edit'>Editar</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ToolInfoModal;
