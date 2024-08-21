import { Activity, ComputerActivity } from '@interfaces/Monitoring.interface';
import BasePage from '@layouts/BasePage';
import fetchComputerActivities from '@services/monitoring/getMonitoring.service';
import { useEffect, useState } from 'react';
import './MonitoringMenu.css'; // Importa el CSS

const ShowMonitoringMenu = () => {
	const [computerActivities, setComputerActivities] = useState<
		ComputerActivity[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [sortBy, setSortBy] = useState<string>('fileName');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	useEffect(() => {
		const getComputerActivities = async () => {
			try {
				const data = await fetchComputerActivities();
				setComputerActivities(Array.isArray(data) ? data : []);
			} catch (err) {
				setError('Failed to load computer activities');
			} finally {
				setLoading(false);
			}
		};
		console.log(computerActivities);
		getComputerActivities();
	}, []);

	const handleToggle = (index: number) => {
		const newComputerActivities = [...computerActivities];
		newComputerActivities[index].activities = newComputerActivities[
			index
		].activities.map(activity => ({
			...activity,
			showDetails: !activity.showDetails,
		}));
		setComputerActivities(newComputerActivities);
	};

	const sortActivities = (activities: Activity[]) => {
		const sortedActivities = [...activities].sort((a, b) => {
			let aValue: any, bValue: any;

			switch (sortBy) {
				case 'fileName':
					aValue = a.fileName.toLowerCase();
					bValue = b.fileName.toLowerCase();
					break;
				case 'fileSize':
					aValue = a.fileSize;
					bValue = b.fileSize;
					break;
				case 'sourcePath':
					aValue = a.sourcePath.toLowerCase();
					bValue = b.sourcePath.toLowerCase();
					break;
				case 'destinationPath':
					aValue = a.destinationPath.toLowerCase();
					bValue = b.destinationPath.toLowerCase();
					break;
				case 'fileType':
					aValue = a.fileType.toLowerCase();
					bValue = b.fileType.toLowerCase();
					break;
				default:
					aValue = a.fileName.toLowerCase();
					bValue = b.fileName.toLowerCase();
					break;
			}

			if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
			if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
			return 0;
		});

		return sortedActivities;
	};

	if (loading) return <p>Cargando...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className='container'>
			<div className='sorting-options'>
				<label htmlFor='sortBy'>Ordenar por:</label>
				<select
					id='sortBy'
					value={sortBy}
					onChange={e => setSortBy(e.target.value)}
				>
					<option value='fileName'>Nombre del archivo</option>
					<option value='fileSize'>Tamaño del archivo</option>
					<option value='sourcePath'>Ruta de origen</option>
					<option value='destinationPath'>Ruta de destino</option>
					<option value='fileType'>Tipo de archivo</option>
					<option value='computerId'>ID de computadora</option>
				</select>

				<label htmlFor='sortOrder'>Orden:</label>
				<select
					id='sortOrder'
					value={sortOrder}
					onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
				>
					<option value='asc'>Ascendente</option>
					<option value='desc'>Descendente</option>
				</select>
			</div>

			{computerActivities.map((computerActivity, index) => {
				const sortedActivities = sortActivities(computerActivity.activities);
				return (
					<div key={computerActivity._id} className='activity-card'>
						<div className='activity-header'>
							<h2 className='activity-title'>{computerActivity.computerId}</h2>
							<button
								className='toggle-button'
								onClick={() => handleToggle(index)}
							>
								Ver detalles
							</button>
							<p>{new Date(computerActivity.createdAt).toLocaleString()}</p>
						</div>
						<ul className='activity-list'>
							{sortedActivities.map(activity => (
								<li key={activity._id} className='activity-item'>
									<div>
										<span className='activity-item-title'>
											{activity.fileName}
										</span>
										{activity.showDetails && (
											<div className='activity-details'>
												<p>Ruta de origen: {activity.sourcePath}</p>
												<p>Ruta de destino: {activity.destinationPath}</p>
												<p>Tamaño del archivo: {activity.fileSize}</p>
												<p>Tipo de archivo: {activity.fileType}</p>
												<p>
													¿Cuándo?:
													{new Date(activity.eventTimestamp).toLocaleString()}
												</p>
											</div>
										)}
									</div>
								</li>
							))}
						</ul>
					</div>
				);
			})}
		</div>
	);
};

function MonitoringMenu() {
	return (
		<BasePage title='Monitor'>
			<ShowMonitoringMenu />
		</BasePage>
	);
}
export default MonitoringMenu;
