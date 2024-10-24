import Info from '@components/commons/Info';
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
		<hr></hr>,
		<h3>Herramienta {index + 1}</h3>,
		<Info
			title={'Cantidad'}
			info={quantity.toString()}
			infoClass='info no-margin'
		/>,
		<Info title={'Marca'} info={brand} infoClass='info no-margin' />,
		<Info title={'Modelo'} info={model} infoClass='info no-margin' />,
		<Info
			title={'Número de serie'}
			info={serialNumber}
			infoClass='info no-margin'
		/>,
		<Info
			title={'Descripción'}
			info={description}
			infoClass='info no-margin'
		/>,
		<Info
			title={'Observación'}
			info={observation}
			infoClass='info no-margin'
		/>,
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
	columns.push(<hr></hr>);
	return (
		<>
			{columns.map((column, i) => (
				<td key={i}>{column}</td>
			))}
		</>
	);
}
