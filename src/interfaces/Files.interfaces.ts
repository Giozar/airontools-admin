import { SetStateAction } from 'react';

// Interface para el estado de los archivos
export interface FilesState {
	files: File[];
}

// Interface para el estado de las vistas previas o nombres
export interface FileDataState {
	data: string[];
}

// Interfaz para las acciones de seteo del estado
export interface SetFilesAction {
	(value: SetStateAction<File[]>): void;
}

export interface SetFileDataAction {
	(value: SetStateAction<string[]>): void;
}
