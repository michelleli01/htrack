import React from 'react'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Auth from '../../auth/Auth';
import NavBar from '../NavBar/NavBar';

export default function Home() {
    const history = useHistory();

    function handleLogout(e){
        e.preventDefault();
        Axios({
            method: "GET", 
            withCredentials: true,
            url: "http://localhost:8080/auth/logout"
        })
        Auth.deauthenticateUser();
        history.push('/')
    }   

    return (

        <div>
            <NavBar isUserAuthenticated={Auth.isUserAuthenticated()} handleLogout={handleLogout}/>
            <h3>Home</h3>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}
