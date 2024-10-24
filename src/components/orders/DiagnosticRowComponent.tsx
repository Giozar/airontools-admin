import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import WebcamCapture from '@components/commons/WebcamCaptureC';
import { useState } from 'react';
import { useOrderProduct } from './hooks/useRepairProductUpdate';

interface RowComponentProps {
	index: number;
}

export default function DiagnosticRowComponent({ index }: RowComponentProps) {
	const { updateProduct, product } = useOrderProduct(index);
	if (!product) return null; // Return null if product is not available

	const [webcamError, setWebcamError] = useState<boolean>(false);
	const {
		quantity,
		brand,
		model,
		serialNumber,
		description,
		observation,
		rawImage,
	} = product;

	// You need to define webcamError, imageUrl, imageRaw, setImageRaw, setImageUrl, setImageRemoved, and imageRemoved

	const columns = [
		<p key='quantity'>Cantidad: {quantity}</p>,
		<p key='brand'>Marca: {brand}</p>,
		<p key='model'>Modelo: {model}</p>,
		<p key='serialNumber'>Número de serie: {serialNumber}</p>,
		<p key='description'>Descripción: {description}</p>,
		<p key='observation'>Observación: {observation}</p>,
		<TextAreaInput
			id='diagnostico'
			label='Diagnóstico'
			value={description} // Bind to an appropriate property
			onChange={() => {}} // Implement onChange functionality as needed
			disabled={true}
		/>,
	];

	const imageComponent = webcamError ? (
		<SingleImageChange
			key={`imagen-${index}`}
			title='Foto de herramienta'
			filePreview={rawImage ? URL.createObjectURL(rawImage) : ''}
			setFilePreview={file => updateProduct({ rawImage: file })}
			capture={true}
			size={'large'}
		/>
	) : (
		<WebcamCapture
			fileUrl={rawImage ? URL.createObjectURL(rawImage) : ''}
			setFile={file => updateProduct({ rawImage: file })}
			setError={setWebcamError} // Ensure this function is defined
		/>
	);

	columns.push(imageComponent); // Add the image component to columns

	return (
		<>
			{columns.map((column, i) => (
				<td key={i}>{column}</td>
			))}
		</>
	);
}
