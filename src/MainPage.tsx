import './MainPage.css';
import HeaderApp from './HeaderApp';
import Sidebar from './Sidebar';

function ContentMainPage() {
    return (
        <div className='content'>
            <HeaderApp/>
            <main>
                <div className="options">
                    {[  "Usuarios",
                        "Ver modificaciones de productos",
                        "Productos pendientes de aprobación",
                        "Ver catálogo completo de productos",
                        "Empleados"
                    ].map((title, index) => (
                        <ActionCard key={index} title={title} />
                    ))}
                </div>
            </main>
        </div>
    );
}

function ActionCard({ title }: { title: string }) {
    return (
        <button className="card">
            <dl>
                <dt>{title}</dt>
            </dl>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </button>
    );
}

function Home(){
    return (
    <div className='mainPage'>
        <Sidebar/>
        <ContentMainPage/>  
    </div>
    );
}
export default Home;