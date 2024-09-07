import DynamicInputs from '@components/commons/DynamicInputs';

interface DynamicInputSectionProps {
	label: string;
	onValuesChange: (values: string[]) => void;
	placeholder: string;
}

export const DynamicInputSection = ({
	label,
	onValuesChange,
	placeholder,
}: DynamicInputSectionProps) => {
	return (
		<div>
			<DynamicInputs
				label={label}
				onValuesChange={onValuesChange}
				placeholder={placeholder}
			/>
		</div>
	);
};
