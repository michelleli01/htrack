import {React, useRef, useState} from 'react';
import Link from 'react-router-dom/Link';
import Axios from 'axios';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState();

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
        .then(res => setError(res.data));
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
