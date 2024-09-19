import '@components/css/HeaderTitle.css';
function HeaderTitle({ title }: { title: string }) {
	return (
		<h3 className='header-title'>
			<span className='header-title__text'>{title}</span>
		</h3>
	);
}

export default HeaderTitle;
