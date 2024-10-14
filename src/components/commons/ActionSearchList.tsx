import React from 'react';
import ActionCard from './ActionCard';

interface ActionSearchListProps {
	Actiontitle: string;
	ListTitle: string;
	path: string;
	placeholder: string;
	ListComponent: React.FC; // Componente de lista que se pasará como prop
}

const ActionSearchList: React.FC<ActionSearchListProps> = ({
	Actiontitle,
	ListTitle,
	path,
	placeholder,
	ListComponent,
}) => {
	return (
		<>
			<div className='options users'>
				<ActionCard title={Actiontitle} path={`${location.pathname}/${path}`} />
			</div>
			<h2>{ListTitle}</h2>
			<input type='search' placeholder={placeholder} />
			<ListComponent />
		</>
	);
};

export default ActionSearchList;
