import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import RightArrow from './svg/RightArrow';
import '@components/css/breadcrumb.css';

function Breadcrumb({ separator = (
    <RightArrow/>
) }: {
    separator?: React.ReactNode; 
}) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x); // Obtener las partes de la ruta y filtrar las partes vacías

  const renderBreadcrumbs = () => {
      let fullPath = '';
      return (
        <>
          {pathnames.map((part, index) => {
            fullPath += `/${part}`;
            const isLast = index === pathnames.length - 1;
            const displayName = part.includes('-') ? part.split('-').join(' ') : part;
            //Para que el ultimo no sea un link
            if (isLast) {
              return (
              <span key={part}>
                    {displayName}
              </span>
              );
            }

            return (
            <span key={part}>
                <Link to={fullPath}>{displayName}</Link>
                <span className="separator">{separator}</span>
            </span>
            );
          })}
        </>
      );
  };

  return (
    <div className="breadcrumb">
      {pathnames.length > 0 && <span className="separator">{separator}</span>}
      {renderBreadcrumbs()}
    </div>
  );
}

export default Breadcrumb;
