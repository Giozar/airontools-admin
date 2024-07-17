import { useNavigate } from "react-router-dom";

function ActionCard({ title, path }: { title: string , path:string}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    };
    return (
        <button className="card" onClick={handleClick}>
            <dl>
                <dt>{title}</dt>
            </dl>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </button>
    );
}
export default ActionCard;