import DatalistOption from '@components/commons/DatalistOption';
import DatePicker from '@components/commons/DateInput';
import TableComponent from '@components/commons/DynamicTable';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useState } from 'react';

export default function RepairOrderForm() {
	const [procedencia, setProcedencia] = useState('');
	const [tiempoEntrega, setTiempoEntrega] = useState('');
	const [responsable, setResponsable] = useState('');
	const [telefono, setTelefono] = useState('');
	const [observaciones, setObservaciones] = useState('');
	const [rawImage, setRawImage] = useState<File | null>(null);
	const [date, setDate] = useState<Date>(new Date());

	const tableData = {
		headers: ['', '', '', '', '', ''],
		rows: Array.from({ length: 9 }, () => [
			<TextInput
				id={'cantidad'}
				label={'Cantidad'}
				value={tiempoEntrega}
				placeholder={'Cantidad'}
				onChange={e => setTiempoEntrega(e.target.value)}
			/>,
			<TextInput
				id={'modelo'}
				label={'Modelo'}
				value={tiempoEntrega}
				placeholder={'Modelo de herramienta'}
				onChange={e => setTiempoEntrega(e.target.value)}
			/>,
			<TextInput
				id={'marca'}
				label={'Marca'}
				value={tiempoEntrega}
				placeholder={'Marca de herramienta'}
				onChange={e => setTiempoEntrega(e.target.value)}
			/>,
			<TextInput
				id={'numerodeserie'}
				label={'Número de serie'}
				value={tiempoEntrega}
				placeholder={'Número de serie'}
				onChange={e => setTiempoEntrega(e.target.value)}
			/>,
			<TextAreaInput
				id={'descripcion'}
				label={'Descripción'}
				value={observaciones}
				placeholder={'Descripción del estado de la herramienta'}
				onChange={e => setObservaciones(e.target.value)}
			/>,
			<SingleImageChange
				title={'Foto de herramienta'}
				filePreview={rawImage ? URL.createObjectURL(rawImage) : ''}
				setFilePreview={setRawImage}
				capture={true}
			/>,
		]),
	};
	console.log(date + '🤣😂');
	return (
		<form>
			<button> Generar Orden </button>
			<DatePicker label='Fecha de autorización' setDate={setDate} date={date} />
			<DatalistOption
				id={'procedencia'}
				name={'Procedencia'}
				type='text'
				placeholder='Empresa de procedencia'
				options={['hola', 'mundo']}
				value={procedencia}
				setValue={setProcedencia}
			/>
			<DatalistOption
				id={'responsable'}
				name={'Responsable'}
				type='text'
				placeholder='Responsable por parte de la empresa'
				options={['hola', 'mundo']}
				value={responsable}
				setValue={setResponsable}
			/>
			<DatalistOption
				id={'telefono'}
				name={'Teléfono'}
				type='tel'
				placeholder='1111-1111-1111'
				options={['2222-2222-2222', '3333-3333-3333']}
				value={telefono}
				setValue={setTelefono}
			/>
			<TextAreaInput
				id={'observaciones'}
				label={'Observaciones'}
				value={observaciones}
				onChange={e => setObservaciones(e.target.value)}
			/>
			<TextInput
				id={'tiempoEntrega'}
				label={'Tiempo de entrega'}
				value={tiempoEntrega}
				placeholder={'Tiempo de entrega'}
				onChange={e => setTiempoEntrega(e.target.value)}
			/>
			Fecha de autorización: {Date().toString()}
			<SingleImageChange
				title={'Foto general de herramientas'}
				filePreview={rawImage ? URL.createObjectURL(rawImage) : ''}
				setFilePreview={setRawImage}
				capture={true}
				size='large'
			/>
			<h2>Datos de la herramienta</h2>
			<TableComponent data={tableData} vertical={true} />
		</form>
	);
}
