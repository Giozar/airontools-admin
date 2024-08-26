import BotIcon from '@components/svg/BotIcon';
import { aiAPI } from '@configs/ai.config';
import Markdown from 'markdown-to-jsx';
import React, { useLayoutEffect, useState } from 'react';
import './chatBubble.css';
interface Message {
	text: string;
	isUser: boolean;
}

const ChatBubble: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>(() => {
		const storedMessages = localStorage.getItem('chat');
		return storedMessages
			? JSON.parse(storedMessages)
			: [{ text: 'Hola, ¿en qué puedo ayudarte?', isUser: false }];
	});
	const [newMessage, setNewMessage] = useState('');
	const [answer, setAnswer] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	useLayoutEffect(() => {
		localStorage.setItem('chat', JSON.stringify(messages));
	}, [messages]);

	const handleSendMessage = () => {
		if (newMessage.trim() === '') return; // Evitar enviar mensajes vacíos

		setMessages(prevMessages => [
			...prevMessages,
			{ text: newMessage, isUser: true },
		]);
		setNewMessage('');
		enviarMensaje();
	};

	const enviarMensaje = async () => {
		if (!newMessage.trim()) return;

		setLoading(true);
		setAnswer('');
		setError('');

		try {
			const content = `Eres un trabajador llamado Juan, del departamento de TI, de una empresa llamada AironTools, dentro del sector Industrial y productivo de México. Dedicada a la fabricación y comercialización especializada de Herramientas Neumáticas Industriales y Equipos de Torque, así como sus accesorios. respondes de una forma concisa y objetiva`;
			console.log(`${aiAPI}/api/chat`);
			const response = await fetch(`${aiAPI}/api/chat`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: 'llama3.1:latest',
					messages: [
						{ role: 'system', content },
						{ role: 'user', content: newMessage },
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

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();
			let partialData = '';
			let completeResponse = '';

			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					partialData += decoder.decode(value, { stream: true });
					const arreglo = partialData.split('\n');
					partialData = arreglo.pop() || '';

					if (arreglo.length > 0) {
						const parsedData = arreglo
							.map(line => JSON.parse(line))
							.filter(data => data.message);

						completeResponse += parsedData
							.map(data => data.message.content)
							.join('');
						setAnswer(
							prevAnswer =>
								prevAnswer +
								parsedData.map(data => data.message.content).join(''),
						);
					}
				}
				setMessages(prevMessages => [
					...prevMessages,
					{ text: completeResponse, isUser: false },
				]);
				setAnswer('');
			}
		} catch (error) {
			console.error('Error al enviar el mensaje:', error);
			setError('Error al enviar el mensaje.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='chat-container'>
			<div className='message-list'>
				{messages.map((message, index) => (
					<div
						key={index}
						className={`message ${
							message.isUser ? 'message-user' : 'message-other'
						}`}
					>
						{message.isUser ? (
							message.text
						) : (
							<>
								<BotIcon />
								<br></br>
								<Markdown>{message.text}</Markdown>
							</>
						)}
					</div>
				))}
				{loading && (
					<div className='message message-other'>
						{loading && <span className='loader'></span>}
						{error && <p className='error-text'>{error}</p>}
						{answer && <Markdown className='answer-text'>{answer}</Markdown>}
					</div>
				)}
			</div>

			<div className='input-container'>
				<input
					type='text'
					value={newMessage}
					onChange={e => setNewMessage(e.target.value)}
					className='input-field'
					placeholder='Escribe un mensaje...'
				/>
				<button onClick={handleSendMessage} className='send-button'>
					Enviar
				</button>
			</div>
		</div>
	);
};

export default ChatBubble;

/*
interface Message {
	text: string;
	isUser: boolean;
}

const ChatBubble = () => {
	const [messages, setMessages] = useState<Message[]>([
		{ text: 'Hola, ¿en qué puedo ayudarte?', isUser: false },
	]);
	const [newMessage, setNewMessage] = useState('');

	const handleSendMessage = () => {
		setMessages(prevMessages => [
			...prevMessages,
			{ text: newMessage, isUser: true },
		]);
		setNewMessage('');
	};

	return (
		<div className='chat-container'>
			<div className='message-list'>
				{messages.map((message, index) => (
					<div
						key={index}
						className={`message ${
							message.isUser ? 'message-user' : 'message-other'
						}`}
					>
						{message.text}
					</div>
				))}
			</div>
			<div className='input-container'>
				<input
					type='text'
					value={newMessage}
					onChange={e => setNewMessage(e.target.value)}
					className='input-field'
					placeholder='Escribe un mensaje...'
				/>
				<button onClick={handleSendMessage} className='send-button'>
					Enviar
				</button>
			</div>
		</div>
	);
};

export default ChatBubble;
*/
