import '@components/css/Info.css';
const Info = ({
	title,
	info,
	titleClass,
	infoClass,
	noinfoClass,
}: {
	title: string;
	info?: string;
	titleClass?: string;
	infoClass?: string;
	noinfoClass?: string;
}) => {
	return (
		<>
			{info ? (
				<p className={infoClass || 'info'}>
					<strong className={titleClass || 'title'}>{title}:</strong> {info}
				</p>
			) : (
				<p className={noinfoClass || 'no-info'}>No hay {title} disponible</p>
			)}
		</>
	);
};
export default Info;
