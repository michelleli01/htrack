import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import Auth from '../../auth/Auth';

import './Login.css'

export default function Login() {
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState();
    const history = useHistory();

    function handleSubmit(e){
        e.preventDefault();
        Axios({
            method: "POST",
            data: {
                email: email.current.value,
                password: password.current.value
            },
            withCredentials: true,
            url: "http://localhost:8080/auth/login"
        })
        .then(res => {
            if(res.data.success){
                console.log(res.data.message);
                console.log(res.data)
                Auth.authenticateUser(res.data.user._id, res.data.user.email);
                history.push('/user');
            } else{
                setError(res.data.message);
                email.current.value = "";
                password.current.value = "";
            }
        });
    }

    return (
        <div className="login-container">
            <h3 className="login-header">Login</h3>
            <form onSubmit={handleSubmit} className="login-form">
                {error && <p className="login-error">{error}</p>}
                <label className="login-label">E-mail</label>
                <input ref={email} type="email" className="login-input"/>
                <label className="login-label">Password</label>
                <input ref={password} type="password" className="login-input"/>
                <button className="login-button">Login</button>
                <p className="register">Don't have an account? <Link to="/signup">Sign up here</Link></p>
            </form>
        </div>
    )
}
