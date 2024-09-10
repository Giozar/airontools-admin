import { aiAPI } from '@configs/ai.config';
import { useState } from 'react';

interface CorrectorProps {
	textoinicial: string;
}

const Corrector = ({ textoinicial }: CorrectorProps) => {
	const [mensaje, setMensaje] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const corregirTexto = async () => {
		if (!textoinicial) return;

		setLoading(true);
		setMensaje('');
		setError('');

		try {
			// Enviar solicitud POST con streaming
			const content = `Corrige y reescribe estrictamente los errores gramaticales del texto del usuario al español estándar formal. 
Solo regresa el texto corregido. Todas las palabras deben de existir en la Real Academia Española. 
Mantén inalterados los términos técnicos, jergas regionales o específicos del contexto de descripción de herramienta, mecánica, carpintería, como "pija" (También se le conoce como tornillo para madera con punta avellanada)
Ejemplo de entrada: ellafue al merkado con unas pijas nuevas.
Ejemplo de salida: Ella fue al mercado con unas pijas nuevas.
`;
			const response = await fetch(`${aiAPI}/api/chat`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: 'llama3.1:latest',
					messages: [
						{
							role: 'system',
							content,
						},
						{
							role: 'user',
							content: textoinicial,
						},
					],
					options: {
						seed: 123,
						temperature: 0.2,
					},
				}),
			});

			if (!response.ok) {
				throw new Error('Error en la respuesta de la API');
			}
			// Configurar el lector de la respuesta en streaming
			const reader = response.body?.getReader();
			const decoder = new TextDecoder();
			let partialData = '';

			// Leer datos del stream
			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					// Decodificar y agregar al mensaje
					partialData += decoder.decode(value, { stream: true });
					console.log(partialData);
					const arreglo = partialData.split('\n');
					partialData = arreglo.pop() || ''; // Mantener los datos incompletos para la siguiente lectura

					// Actualizar el estado en tiempo real
					setMensaje(
						prevMensaje => prevMensaje + JSON.parse(arreglo[0]).message.content,
					);
				}
			}

			setLoading(false);
		} catch (error) {
			console.error('Error al corregir el texto:', error);
			setError('Error al corregir el texto.');
			setMensaje('');
			setLoading(false);
		}
	};

	return (
		<div>
			<button
				type='button'
				onClick={corregirTexto}
				className='edit'
				style={{ marginTop: '-10px', border: '0' }}
			>
				Corregir Texto
			</button>
			<div style={{ background: 'var(--bg-secondary)', padding: '10px' }}>
				{loading && <p>Cargando respuesta...</p>}
				{error && <p>{error}</p>}
				{mensaje && <p>{mensaje}</p>}
			</div>
		</div>
	);
};

/* import axios from 'axios';
import { useState } from 'react';
import { useCompletion } from 'ai/react';

interface CorrectorProps {
	textoinicial: string;
}
const Corrector = ({ textoinicial }: CorrectorProps) => {
	const [mensaje, setMensaje] = useState('');
	const [error, setError] = useState('');
	const [fragmentos, setFragmentos] = useState('');
	const [loading, setLoading] = useState(false);
	const corregirTexto = async () => {
		if (!textoinicial) return;
		try {
			console.log('Envie el pedido...');
			setLoading(true);
			const content = `Revisa y corrige de manera precisa los errores gramaticales del texto proporcionado, ajustándolo al español estándar Mexicano. Limítate a devolver el texto corregido, asegurándote de que todas las palabras estén registradas en la Real Academia Española. Mantén inalterados los términos técnicos, jergas regionales o específicos del contexto, como "pija" en México (También se le conoce como tornillo para madera con punta avellanada), que son correctos en el contexto regional y especializado.
Ejemplo de entrada: ellafue al merkado con unas pijas nuevas.
Ejemplo de salida: Ella fue al mercado con unas pijas nuevas.
`;
			const response = await axios.post(
				`${aiAPI}/api/chat`,
				{
					model: 'llama3.1:latest',
					messages: [
						{
							role: 'system',
							content,
						},
						{
							role: 'user',
							content: textoinicial,
						},
					],
					options: {
						seed: 10,
						temperature: 0,
					},
				},
			);
			setLoading(false);
			console.log('Recibi el pedido...');
			console.log(response.data);
			const arreglo = response.data.split('\n');
			arreglo.map((chunk: string) => {
				if (chunk.trim()) {
					try {
						const json = JSON.parse(chunk);
						setFragmentos(
							prevFragmentos => prevFragmentos + json.message.content,
						);
					} catch (e) {
						console.error('Error al parsear el fragmento JSON:', e);
					}
				}
			});
			setMensaje(`Texto corregido: ${fragmentos}`);
			setError('');
		} catch (error) {
			console.log(error);
			setError('Error al corregir el texto.');
			setMensaje('');
		}
	};

	return (
		<div>
			<button
				type='button'
				onClick={corregirTexto}
				className='edit'
				style={{ marginTop: '-10px', border: '0' }}
			>
				Corregir Texto
			</button>
			<div style={{ background: 'var(--bg-secondary)', padding: '10px' }}>
				{error && <p>{error}</p>}
				{mensaje && <p>{mensaje}</p>}
				{fragmentos && <p>{fragmentos}</p>}
				{loading && <p>Cargando respuesta...</p>}
			</div>
		</div>
	);
};
*/
/*
const Corrector: React.FC<CorrectorProps> = textoinicial => {
	console.log(textoinicial);
	const [texto, setTexto] = useState(textoinicial);
	const [mensaje, setMensaje] = useState('');

	const corregirTexto = async () => {
		try {
			// Espera la respuesta de handleCorregirTexto
			const respuesta = await handleCorregirTexto();
			console.log(respuesta);
			// Asegúrate de que tienes el campo correcto en la respuesta
			const textoCorregido = respuesta?.data.response || '';

			// Actualiza el mensaje con el texto corregido
			setMensaje(`Texto corregido: ${textoCorregido}`);
		} catch (error) {
			console.error('Error al corregir el texto:', error);
			setMensaje('Error al corregir el texto.');
		}
	};

	const handleCorregirTexto = async () => {
		try {
		/*const prompt = `[INST] Corrige y reescribe los errores gramaticales del texto del usuario delimitado por triples acentos graves al español estándar.
            Texto=\`\`\`ella no fue al mercado\`\`\` [/INST]
            [INST] Salida: Ella no fue al mercado. [/INST]
            [INST] Texto=\`\`\`${texto}\`\`\` [/INST]
            [INST] Salida:`;
			const response = await axios.post(
				`${aiAPI}/api/generate`,
				{
					model: 'llama3.1:latest',
					prompt,
					raw: true,
					options: {
						seed: 1,
						temperature: 0.1,
						stop: ['[/INST]'],
					},
				},
			); */
// Envía la solicitud a la API
// const prompt = `Regresa el texto corregido a español estandar: "${texto}"`;
/*	const prompt = `[INST] Corrige y reescribe los errores gramaticales del texto del usuario delimitado por triples acentos graves al español estándar.
            Texto=\`\`\`ella no fue al mercado\`\`\` [/INST]
            [INST] Salida: Ella no fue al mercado. [/INST]
            [INST] Texto=\`\`\`${texto.textoinicial}\`\`\` [/INST]
            [INST] Salida:`;
			console.log(prompt);
			console.log(texto);
			const response = await axios.post(
				`${aiAPI}/api/generate`,
				{
					model: 'llama3.1:latest',
					prompt,
					raw: true,
					options: {
						seed: 1,
						temperature: 0.1,
						stop: ['[/INST]'],
					},
				},
			);
			console.log(response);
			return response;
		} catch (error) {
			console.error('Error en la solicitud a la API:', error);
			throw error; // Propaga el error para que pueda ser manejado en corregirTexto
		}
	};
	return (
		<div className='max-w-md mx-auto p-4 mt-10 bg-white rounded-md shadow-md'>
			<button
				type='button'
				onClick={corregirTexto}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'
			>
				Corregir texto
			</button>
			<p className='mt-4 text-gray-600'>{mensaje}</p>
		</div>
	);
};
*/
export default Corrector;
