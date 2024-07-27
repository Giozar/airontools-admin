import HeaderTitle from '@components/HeaderTitle';
import TrashIcon from '@components/svg/TrashIcon';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/toolPages/createtool.css';
import { useState } from 'react';
interface Item {
	id: number;
	value: string;
}
function Specs() {
	return (
		<>
			{/* añadir componente que busque familia */}
			<label>Especificaciones</label>
			<div className='specifications'>
				<div>
					<label htmlFor='corona'>Corona</label>
					<div className='input-container'>
						<input type='number' id='corona' />
						<span>ud.</span>
					</div>
				</div>
			</div>
		</>
	);
}

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
function Characteristics() {
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
	return (
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
	);
}
function ToolForm() {
	const [toolName, setToolName] = useState<string>('Herramienta 1');
	const [toolModel, setToolModel] = useState<string>('');
	const [toolDescription, setToolDescription] = useState<string>('');

	return (
		<form className='createtoolform'>
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
			<Characteristics />

			<Specs />

			<label>Manuales</label>
			<Manuals />

			<label>Videos</label>
			<Videos />
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
