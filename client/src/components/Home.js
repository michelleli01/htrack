import { React } from 'react'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Home() {
    const history = useHistory();

    function getUser(e){
        e.preventDefault();
        Axios({
            method: "GET", 
            withCredentials: true,
            url: "http://localhost:8080/auth/user"
        })
        .then(res => console.log(res.data))
    }

    function handleLogout(e){
        e.preventDefault();
        Axios({
            method: "GET", 
            withCredentials: true,
            url: "http://localhost:8080/auth/logout"
        })
        .then(res => {history.push('/login')});
    }   

    return (
        <div>
            <h3>Home</h3>
            <button onClick={handleLogout}>Log out</button>
            <button onClick={getUser}>Get User</button>
        </div>
    )
}
