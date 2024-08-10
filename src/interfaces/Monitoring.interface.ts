export interface Activity {
	activityType: string;
	fileName: string;
	sourcePath: string;
	destinationPath: string;
	fileSize: number;
	fileType: string;
	eventTimestamp: string;
	_id: string;
	showDetails?: boolean; // Agregado para manejar el toggle de detalles
}

export interface ComputerActivity {
	_id: string;
	userId: string;
	computerId: string;
	activities: Activity[];
	fileHash: string;
	status: string;
	remarks: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
