import Info from '@components/commons/Info';
import InfoSection from '@components/commons/InfoSection';
import ModalContent from '@components/commons/ModalContent';
import NoImageIcon from '@components/svg/NoImageIcon';
import { CategoryCreateContextProps } from '@interfaces/Category.interface';

export default function CategoryInfoModal({
	isOpen,
	onClose,
	category,
	familyName,
	subcategories,
}: {
	isOpen: boolean;
	onClose: () => void;
	familyName: string;
	category: CategoryCreateContextProps | null;
	subcategories: string[] | null;
}) {
	if (!category) return null;
	return (
		<ModalContent
			isOpen={isOpen}
			onClose={onClose}
			title={`Categoría: ${category.name || ''}`}
		>
			<div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '20px' }}>
				<Info title={'Imagen'} info={'-'} />
				<div className='grupo' style={{ margin: '1.5rem 0' }}>
					{category.image ? (
						<img
							src={category.image}
							alt={category.image}
							width={150}
							height={150}
						/>
					) : (
						<NoImageIcon width={150} height={150} />
					)}

					<div>
						<Info title={'Nombre'} info={category.name} />
						<Info title={'Familia'} info={familyName} />
						<Info title={'Descripción'} info={category.description} />
					</div>
				</div>

				<InfoSection title='Subcategorias' items={subcategories || []} />
			</div>
		</ModalContent>
	);
}
