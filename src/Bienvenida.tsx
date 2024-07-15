import { useContext } from 'react'
import { AuthContext } from './App';

function Home(){
    const authContext = useContext(AuthContext);

    return (<>
    <h1>Bienvenido </h1>
    ID: {authContext?.user?.id}
    <br></br>
    USERNAME: {authContext?.user?.fullName}
    <br></br>
    Roles: {authContext?.user?.roles}
    

    </>);
}
export default Home;