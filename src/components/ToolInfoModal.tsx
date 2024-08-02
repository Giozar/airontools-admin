import { ProductFrontend } from '@adapters/products.adapter';
import Slideshow from './Slideshow';
import CloseIcon from './svg/CloseIcon';

const ToolInfoModal = ({
	isOpen,
	onClose,
	product,
}: {
	isOpen: boolean;
	onClose: () => void;
	product: ProductFrontend | null;
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
							{product.imagesUrl}
							{product.imagesUrl && <Slideshow imagesUrl={product.imagesUrl} />}
							<div>
								<p>
									<strong>Nombre:</strong> {product.name}
								</p>
								<p>
									<strong>Modelo:</strong> {product.model}
								</p>
								<p>
									<strong>Family ID:</strong> {product.familyId}
								</p>
								<p>
									<strong>Category ID:</strong> {product.categoryId}
								</p>
								<p>
									<strong>Subcategory ID:</strong>{' '}
									{product.subcategoryId || '---'}
								</p>
							</div>
						</div>
						<p>
							<strong>Descripción:</strong> <br /> {product.description}
						</p>

						<div style={{ margin: '20px 0' }}>
							<strong>Características:</strong>
							<ul>
								{product.characteristics.map(char => (
									<li key={char}>{char}</li>
								))}
							</ul>
						</div>

						<div style={{ margin: '20px 0' }}>
							<strong>Especificaciones:</strong>
							<ul>
								{product.specifications.length ? (
									product.specifications.map((spec, index) =>
										Object.entries(spec).map(([key, value]) => (
											<li key={key + index}>
												{key}: {value}
											</li>
										)),
									)
								) : (
									<li>No hay especificaciones disponibles</li>
								)}
							</ul>
						</div>

						<p>
							<strong>Creado por:</strong> {product.createdBy}
						</p>
						<button className='edit'>Editar</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ToolInfoModal;
