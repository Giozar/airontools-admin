const Info = ({ title, info }: { title: string; info?: string }) => {
	return (
		<>
			{info ? (
				<p>
					<strong>{title}:</strong> {info}
				</p>
			) : (
				<p>No hay {title} disponible</p>
			)}
		</>
	);
};
export default Info;
