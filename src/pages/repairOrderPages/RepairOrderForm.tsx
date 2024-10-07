import DatalistOption from '@components/commons/DatalistOption';
import TextInput from '@components/commons/TextInput';
import { useState } from 'react';

export default function RepairOrderForm() {
	const [procedencia, setProcedencia] = useState('');
	const [tiempoEntrega, setTiempoEntrega] = useState('');
	const [responsable, setResponsable] = useState('');
	const [telefono, setTelefono] = useState('');
	return (
		<form>
			<button> Generar Orden </button>
			Fecha: {Date().toString()}
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
			<TextInput
				id={'tiempoEntrega'}
				label={'Tiempo de entrega'}
				value={tiempoEntrega}
				placeholder={'Tiempo de entrega'}
				onChange={e => setTiempoEntrega(e.target.value)}
			/>
		</form>
	);
}
