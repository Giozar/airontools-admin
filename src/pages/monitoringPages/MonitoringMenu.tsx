import { ComputerActivity } from '@interfaces/Monitoring.interface';
import fetchComputerActivities from '@services/monitoring/getMonitoring.service';
import { useEffect, useState } from 'react';
import './MonitoringMenu.css'; // Importa el CSS

const MonitoringMenu = () => {
	const [computerActivities, setComputerActivities] = useState<
		ComputerActivity[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

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

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className='container'>
			{computerActivities.map((computerActivity, index) => (
				<div key={computerActivity._id} className='activity-card'>
					<div className='activity-header'>
						<h2 className='activity-title'>{computerActivity.computerId}</h2>
						<button
							className='toggle-button'
							onClick={() => handleToggle(index)}
						>
							Ver detalles
						</button>
					</div>
					<ul className='activity-list'>
						{computerActivity.activities.map(activity => (
							<li key={activity._id} className='activity-item'>
								<div>
									<span className='activity-item-title'>
										{activity.fileName}
									</span>
									{activity.showDetails && (
										<div className='activity-details'>
											<p>Source Path: {activity.sourcePath}</p>
											<p>Destination Path: {activity.destinationPath}</p>
											<p>File Size: {activity.fileSize}</p>
											<p>File Type: {activity.fileType}</p>
											<p>Event Timestamp: {activity.eventTimestamp}</p>
										</div>
									)}
								</div>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default MonitoringMenu;
