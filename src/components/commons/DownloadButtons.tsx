// Importing necessary components, hooks, and libraries
import saveAs from 'file-saver';
import JSZip from 'jszip';

// Main component for displaying repair orders list
export default function DownloadButtons({ urls }: { urls: string[] }) {
	const handleDownload = async () => {
		try {
			// Realizar todas las peticiones en paralelo
			const promises = urls.map(async (url: string) => {
				const res = await fetch(url);
				const blob = await res.blob();
				return blob;
			});
			const responses = await Promise.all(promises);
			if (responses.length <= 5) {
				responses.forEach((blob, index) => {
					saveAs(blob, `archivo${index}.pdf`);
				});
			} else {
				const zip = new JSZip();
				responses.forEach((blob, index) => {
					zip.file(`archivo${index}.pdf`, blob);
				});
				const zipFile = await zip.generateAsync({ type: 'blob' });
				saveAs(zipFile, 'reportes.zip');
			}
		} catch (error) {
			console.error('Error al descargar los archivos:', error);
		}
	};

	return (
		<>
			<button onClick={handleDownload}>Descargar PDF</button>
		</>
	);
}
