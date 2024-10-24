const Info = ({
	title,
	info,
	titleClass,
	infoClass,
}: {
	title: string;
	info?: string;
	titleClass?: string;
	infoClass?: string;
}) => {
	return (
		<>
			{info ? (
				<p className={titleClass || ''}>
					<strong>{title}:</strong> {info}
				</p>
			) : (
				<p className={infoClass || ''}>No hay {title} disponible</p>
			)}
		</>
	);
};
export default Info;
