import React from 'react';

export interface TableData {
	headers: string[];
	rows: (string | number | React.ReactNode)[][];
}
