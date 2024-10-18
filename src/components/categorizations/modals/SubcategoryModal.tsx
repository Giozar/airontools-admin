import Info from '@components/commons/Info';
import InfoSection from '@components/commons/InfoSection';
import ModalContent from '@components/commons/ModalContent';
import NoImageIcon from '@components/svg/NoImageIcon';
import { SubcategoryCreateContextProps } from '@interfaces/subcategory.interface';

export default function SubcategoryInfoModal({
	isOpen,
	onClose,
	familyName,
	categoryName,
	subcategory,
	products,
}: {
	isOpen: boolean;
	onClose: () => void;
	familyName: string;
	categoryName: string;
	subcategory: SubcategoryCreateContextProps | null;
	products: string[];
}) {
	if (!subcategory) return null;
	return (
		<ModalContent
			isOpen={isOpen}
			onClose={onClose}
			title={`Subcategoría: ${subcategory.name || ''}`}
		>
			<div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '20px' }}>
				<Info title={'Imagen'} info={'-'} />
				<div className='grupo' style={{ margin: '1.5rem 0' }}>
					{subcategory.image ? (
						<img
							src={subcategory.image}
							alt={subcategory.image}
							width={150}
							height={150}
						/>
					) : (
						<NoImageIcon width={150} height={150} />
					)}

					<div>
						<Info title={'Nombre'} info={subcategory.name} />
						<Info title={'Familia'} info={familyName} />
						<Info title={'Categoría'} info={categoryName} />
						<Info title={'Descripción'} info={subcategory.description} />
					</div>
				</div>

				<InfoSection title='Productos' items={products || []} />
			</div>
		</ModalContent>
	);
}
