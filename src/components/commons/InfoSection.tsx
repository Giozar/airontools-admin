interface InfoSectionProps {
	title: string;
	items: string[];
}

const InfoSection = ({ title, items }: InfoSectionProps) => {
	return (
		<div>
			<strong>{title}</strong>
			<ul>
				{items.length ? (
					items.map((item, index) => <li key={index}>{item}</li>)
				) : (
					<li>No hay elementos disponibles</li>
				)}
			</ul>
		</div>
	);
};
export default InfoSection;
