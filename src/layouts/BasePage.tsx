import { ReactNode } from 'react';
import './BasePage.css';
import Sidebar from './Sidebar';

type BasePageProps = {
  children: ReactNode;
};

function BasePage({ children }: BasePageProps) {
  return (
    <div className='mainPage'>
      <Sidebar />
      <div className='content'>
        {children}
      </div>
    </div>
  );
}

export default BasePage;
