import {
	SpecsFrontend,
	transformSpecsData,
} from '@adapters/specifications.adapter';
import HeaderTitle from '@components/HeaderTitle';
import TrashIcon from '@components/svg/TrashIcon';
import useFetchCategories from '@hooks/useFetchCategories';
import useFetchFamilies from '@hooks/useFetchFamilies';
import useFetchSubcategories from '@hooks/useFetchSubcategories';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/toolPages/createtool.css';
import { getSpecifications } from '@services/specifications/getSpecifications.service';
import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Item {
	id: number;
	value: string;
}
const useSpecs = () => {
	const { families } = useFetchFamilies();
	const { categories, filteredCategories, setFilteredCategories } =
		useFetchCategories();
	const { subcategories, filteredSubcategories, setFilteredSubcategories } =
		useFetchSubcategories();
	const [selectedFamilyId, setSelectedFamilyId] = useState('');
	const [selectedCategoryId, setSelectedCategoryId] = useState('');
	const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
	const [specifications, setSpecifications] = useState<SpecsFrontend[]>([]);
	const [filteredSpecifications, setFilteredSpecifications] = useState<
		SpecsFrontend[]
	>([]);
	const [specValues, setSpecValues] = useState<Record<string, string>>({});

	useEffect(() => {
		const fetchSpecifications = async () => {
			try {
				const specs = await getSpecifications();
				setSpecifications(specs.map(transformSpecsData));
				console.log(specs);
			} catch (error) {
				console.error(error);
			}
		};
		fetchSpecifications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleFamilyChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const familyId = event.target.value;
		setSelectedFamilyId(familyId);
		const filteredCategories = categories.filter(
			category => category.familyId === familyId,
		);
		setFilteredCategories(filteredCategories);
	};
	const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const categoryId = event.target.value;
		setSelectedCategoryId(categoryId);
		const filteredSubcategories = subcategories.filter(
			subcategory => subcategory.categoryId === categoryId,
		);
		setFilteredSubcategories(filteredSubcategories);
		const filteredSpecifications = specifications.filter(
			spec => spec.categoryId === categoryId,
		);
		setFilteredSpecifications(filteredSpecifications);
	};
	const handleSubcategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const subcategoryId = event.target.value;
		setSelectedSubcategoryId(subcategoryId);
		if (subcategoryId !== '') {
			setFilteredSpecifications(
				specifications.filter(spec => spec.subcategoryId === subcategoryId),
			);
		} else {
			setFilteredSpecifications(
				specifications.filter(spec => spec.categoryId === selectedCategoryId),
			);
		}
	};

	const handleInputChange = (id: string, value: string) => {
		setSpecValues(prevValues => ({
			...prevValues,
			[id]: value,
		}));
	};

	return {
		families,
		filteredCategories,
		filteredSubcategories,
		selectedFamilyId,
		selectedCategoryId,
		selectedSubcategoryId,
		filteredSpecifications,
		specValues,
		handleFamilyChange,
		handleCategoryChange,
		handleSubcategoryChange,
		handleInputChange,
	};
};

function Manuals() {
	const [manuals, setManuals] = useState<Item[]>([
		{ id: Date.now(), value: '...hola.pdf' },
	]);
	const addManual = () => {
		setManuals([...manuals, { id: Date.now(), value: '' }]);
	};

	const removeManual = (id: number) => {
		setManuals(manuals.filter(item => item.id !== id));
	};

	const updateManual = (id: number, value: string) => {
		setManuals(
			manuals.map(item => (item.id === id ? { ...item, value } : item)),
		);
	};
	return (
		<div className='file-upload'>
			{manuals.map(manual => (
				<div key={manual.id} className='manual-item'>
					<input type='text' value={manual.value} readOnly />
					<button type='button' onClick={() => updateManual(manual.id, '')}>
						Subir manual
					</button>
					<button
						type='button'
						className='delete'
						onClick={() => removeManual(manual.id)}
					>
						<TrashIcon />
					</button>
				</div>
			))}
			<button
				type='button'
				className='add'
				style={{ marginTop: '10px' }}
				onClick={addManual}
			>
				Añadir manual
			</button>
		</div>
	);
}

function Videos() {
	const [videos, setVideos] = useState<Item[]>([{ id: Date.now(), value: '' }]);
	const addVideo = () => {
		setVideos([...videos, { id: Date.now(), value: '' }]);
	};

	const removeVideo = (id: number) => {
		setVideos(videos.filter(item => item.id !== id));
	};

	const updateVideo = (id: number, value: string) => {
		setVideos(videos.map(item => (item.id === id ? { ...item, value } : item)));
	};
	return (
		<div className='file-upload'>
			{videos.map(video => (
				<div key={video.id} className='video-item'>
					<input
						type='text'
						placeholder='URL del video'
						value={video.value}
						onChange={e => updateVideo(video.id, e.target.value)}
					/>
					<button
						type='button'
						className='delete'
						onClick={() => removeVideo(video.id)}
					>
						<TrashIcon />
					</button>
				</div>
			))}
			<button
				type='button'
				className='add'
				style={{ marginTop: '10px' }}
				onClick={addVideo}
			>
				Añadir video
			</button>
		</div>
	);
}

const useCharacteristics = () => {
	const [characteristics, setCharacteristics] = useState<Item[]>([
		{ id: Date.now(), value: '' },
	]);

	const addCharacteristic = () => {
		setCharacteristics([...characteristics, { id: Date.now(), value: '' }]);
	};

	const removeCharacteristic = (id: number) => {
		setCharacteristics(characteristics.filter(item => item.id !== id));
	};

	const updateCharacteristic = (id: number, value: string) => {
		setCharacteristics(
			characteristics.map(item => (item.id === id ? { ...item, value } : item)),
		);
	};

	return {
		characteristics,
		addCharacteristic,
		removeCharacteristic,
		updateCharacteristic,
	};
};

function ToolForm() {
	const [toolName, setToolName] = useState<string>('Herramienta 1');
	const [toolModel, setToolModel] = useState<string>('');
	const [toolDescription, setToolDescription] = useState<string>('');
	const {
		characteristics,
		addCharacteristic,
		removeCharacteristic,
		updateCharacteristic,
	} = useCharacteristics();
	const {
		families,
		filteredCategories,
		filteredSubcategories,
		selectedFamilyId,
		selectedCategoryId,
		selectedSubcategoryId,
		filteredSpecifications,
		specValues,
		handleFamilyChange,
		handleCategoryChange,
		handleSubcategoryChange,
		handleInputChange,
	} = useSpecs();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const createToolData = {
				name: toolName,
				model: toolModel,
				characteristics,
				familyId: selectedFamilyId,
				categoryId: selectedCategoryId,
				subcategoryId: selectedSubcategoryId,
				description: toolDescription,
				specifications: specValues,
			};
			await axios.post(
				import.meta.env.VITE_API_URL + `/products`,
				createToolData,
			);
		} catch (error) {
			console.error('Error creando herramienta:', error);
		}
	};

	return (
		<form className='createtoolform' onSubmit={handleSubmit}>
			<div className='toolinfo'>
				<div>
					<label htmlFor='toolName'>Nombre de herramienta</label>
					<input
						type='text'
						id='toolName'
						value={toolName}
						onChange={e => setToolName(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor='toolModel'>Modelo de herramienta</label>
					<input
						type='text'
						id='toolModel'
						placeholder='----'
						value={toolModel}
						onChange={e => setToolModel(e.target.value)}
					/>
				</div>
			</div>

			<label>Fotos de herramienta</label>
			<div className='image-upload'>
				<div className='image-placeholder'>Foto de herramienta</div>
				<div className='image-placeholder add-image'>Subir imagen +</div>
			</div>

			<label htmlFor='toolDescription'>Descripción de herramienta</label>
			<textarea
				id='toolDescription'
				rows={3}
				placeholder='Descripción general de la herramienta'
				value={toolDescription}
				onChange={e => setToolDescription(e.target.value)}
			/>

			<label>Características</label>
			<div className='characteristics'>
				{characteristics.map(char => (
					<div key={char.id} className='characteristic-item'>
						<input
							type='text'
							placeholder='Característica'
							value={char.value}
							onChange={e => updateCharacteristic(char.id, e.target.value)}
						/>
						<button
							type='button'
							className='delete'
							onClick={() => removeCharacteristic(char.id)}
						>
							<TrashIcon />
						</button>
					</div>
				))}
				<button type='button' className='add' onClick={addCharacteristic}>
					Añadir característica
				</button>
			</div>

			<div className='selectfamily'>
				<label>Familia:</label>
				<select onChange={handleFamilyChange}>
					<option value=''>Selecciona una familia</option>
					{families.map(family => (
						<option key={family.id} value={family.id}>
							{family.name}
						</option>
					))}
				</select>

				{filteredCategories.length > 0 && selectedFamilyId && (
					<>
						<label>Categorías:</label>
						<select onChange={handleCategoryChange}>
							<option value=''>Selecciona una categoría</option>
							{filteredCategories.map(category => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</>
				)}

				{filteredSubcategories.length > 0 &&
					selectedFamilyId &&
					selectedCategoryId && (
						<>
							<label>Subcategorías:</label>
							<select onChange={handleSubcategoryChange}>
								<option value=''>Selecciona una subcategoría</option>
								{filteredSubcategories.map(subcategory => (
									<option key={subcategory.id} value={subcategory.id}>
										{subcategory.name}
									</option>
								))}
							</select>
						</>
					)}

				{filteredSpecifications.length > 0 && (
					<>
						<label>Especificaciones</label>
						<div className='specifications'>
							{filteredSpecifications.map(spec => (
								<div key={spec.id}>
									<label htmlFor={spec.id}>{spec.name}</label>
									<div className='input-container'>
										<input
											type='text'
											id={spec.id}
											required
											value={specValues[spec.id || ''] || ''}
											onChange={(e: ChangeEvent<HTMLInputElement>) =>
												handleInputChange(spec.id || '', e.target.value)
											}
										/>
										<span>{spec.unit}</span>
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</div>

			<label>Manuales</label>
			<Manuals />

			<label>Videos</label>
			<Videos />
			<input type='submit' value='Send Request' />
		</form>
	);
}

function ContentMainPage() {
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Herramientas' />
				<ToolForm />
			</main>
		</BasePage>
	);
}

function CreateTool() {
	return <ContentMainPage />;
}

export default CreateTool;
