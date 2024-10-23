import '@components/css/WebcamCapture.css';
import { useEffect, useRef, useState } from 'react';
interface CapturedImage {
	file: File | null;
	dataUrl: string | null;
}

export default function WebcamCapture({
	setFile,
	setError,
}: {
	setFile: (value: File | null) => void;
	setError: (value: boolean) => void;
}) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [capturedImage, setCapturedImage] = useState<CapturedImage>({
		file: null,
		dataUrl: null,
	});

	useEffect(() => {
		const startWebcam = async () => {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					video: true,
				});
				setStream(mediaStream);
				if (videoRef.current) {
					videoRef.current.srcObject = mediaStream;
				}
				setError(false);
			} catch (error) {
				console.error('Error accessing webcam:', error);
				setError(true);
			}
		};

		startWebcam();

		return () => {
			if (stream) {
				stream.getTracks().forEach(track => track.stop());
			}
		};
	}, []);

	const capturePhoto = () => {
		if (videoRef.current && canvasRef.current) {
			const video = videoRef.current;
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');

			if (context) {
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				context.drawImage(video, 0, 0, canvas.width, canvas.height);

				canvas.toBlob(blob => {
					if (blob) {
						const file = new File([blob], 'captured-photo.jpg', {
							type: 'image/jpeg',
						});
						const dataUrl = canvas.toDataURL('image/jpeg');
						setCapturedImage({ file, dataUrl });
						setFile(file);
					}
				}, 'image/jpeg');
			}
		}
	};

	return (
		<div className='webcam-capture'>
			<video ref={videoRef} autoPlay playsInline muted />
			<button onClick={capturePhoto} type='button' className='takephoto-button'>
				Tomar Foto
			</button>
			<canvas ref={canvasRef} style={{ display: 'none' }} />
			{capturedImage.dataUrl && (
				<div className='captured-image'>
					<img src={capturedImage.dataUrl} alt='Captured' />
					<p>Imagen capturada con éxito</p>
				</div>
			)}
		</div>
	);
}
