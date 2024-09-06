import TableRow from '@components/commons/TableRow';
import { SpecDataToSend } from '@interfaces/Specifications.interface';

interface SpecificationsSectionProps {
	specifications: SpecDataToSend[];
	specificationValues: { specification: string; value: string }[];
	handleSpecUpdate: (newValue: string, index: number) => void;
	handleFlagChange: (flag: boolean) => void;
}

export default function SpecificationsSection({
	specifications,
	specificationValues,
	handleSpecUpdate,
}: SpecificationsSectionProps) {
	return (
		<>
			{specifications.length > 0 && (
				<div style={{ marginBottom: '100px' }}>
					<label htmlFor='spec'>Especificaciones</label>
					<table id='spec'>
						<tbody>
							{specifications.map((spec, index) => (
								<TableRow
									key={spec._id}
									label={spec.name}
									unit={spec.unit || ''}
									value={specificationValues[index]?.value || ''}
									onValueChange={newValue => handleSpecUpdate(newValue, index)}
								/>
							))}
						</tbody>
					</table>
					<p style={{ marginTop: '20px' }}>Nuevas especificaciones:</p>
				</div>
			)}
		</>
	);
}
