import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import Auth from '../../auth/Auth';

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
                history.push('/');
            } else{
                setError(res.data.message);
                email.current.value = "";
                password.current.value = "";
            }
        });
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <label>E-mail</label>
                <input ref={email} type="email"/>
                <label>Password</label>
                <input ref={password} type="password"/>
                <button>Login</button>
                <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
            </form>
        </div>
    )
}
