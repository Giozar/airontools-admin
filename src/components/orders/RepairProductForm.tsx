import DynamicSizeTable from '@components/commons/DynamicSizeTable';
import RowComponent from './RepairOrderRowComponent';

export default function RepairProductForm() {
	return (
		<>
			<DynamicSizeTable
				headers={['', '', '', '', '', '']}
				maxRows={5}
				RowComponent={RowComponent}
				vertical={true}
			/>

			{/* <SingleImageChange
				key={'foto'}
				title={'Foto de herramienta'}
				filePreview={rawImage ? URL.createObjectURL(rawImage) : ''}
				setFilePreview={setRawImage}
				capture={true}
			/> */}
		</>
	);
}
