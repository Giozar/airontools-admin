import HeaderTitle from '@components/HeaderTitle';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/css/listofspecs.css';
import { useState } from 'react';
interface Specification {
	name: string;
	description: string;
	unit: string;
	family: string;
	category: string;
	subcategory: string;
}

// Sample data
const specifications: Specification[] = [
	{
		name: 'Resolución de Pantalla',
		description:
			'Número de píxeles que componen la imagen en la pantalla del dispositivo.',
		unit: 'píxeles',
		family: 'Electrónica',
		category: 'Smartphones',
		subcategory: 'Gama Alta',
	},
	{
		name: 'Capacidad de Batería',
		description:
			'Cantidad de energía que puede almacenar la batería del dispositivo.',
		unit: 'mAh',
		family: 'Electrónica',
		category: 'Smartphones',
		subcategory: 'Gama Alta',
	},
	{
		name: 'Memoria RAM',
		description:
			'Cantidad de memoria de acceso aleatorio para el funcionamiento del sistema y aplicaciones.',
		unit: 'GB',
		family: 'Electrónica',
		category: 'Smartphones',
		subcategory: 'Gama Media',
	},
	{
		name: 'Peso',
		description: 'Peso total del dispositivo incluyendo la batería.',
		unit: 'kg',
		family: 'Electrónica',
		category: 'Laptops',
		subcategory: 'Ultrabooks',
	},
	// Add more specifications as needed
];

function SpecificationsGrid() {
	const [searchTerm, setSearchTerm] = useState<string>('');

	// Filter specifications based on the search term
	const filteredSpecifications = specifications.filter(spec =>
		spec.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className='container'>
			<div className='search-bar'>
				<input
					type='text'
					placeholder='Buscar especificaciones...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>

			<div className='specifications-grid'>
				{filteredSpecifications.map((spec, index) => (
					<div key={index} className='specification-card'>
						<p className='spec-name'>{spec.name}</p>
						<p className='spec-description'>{spec.description}</p>
						<p className='spec-unit'>Unidad: {spec.unit}</p>
						<div className='spec-metadata'>
							<span className='meta-tag'>Familia: {spec.family}</span>
							<span className='meta-tag'>Categoría: {spec.category}</span>
							<span className='meta-tag'>Subcategoría: {spec.subcategory}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
function ContentMainPage() {
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Ver espeficaciones' />
				<SpecificationsGrid />
			</main>
		</BasePage>
	);
}

function ListOfSpecs() {
	return <ContentMainPage />;
}

export default ListOfSpecs;
