import { React, useRef, useState } from 'react';
import Link from 'react-router-dom/Link';
import Axios from 'axios';

export default function Signup() {
    const email = useRef();
    const password = useRef();
    const confirm_password = useRef();
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
            url: "http://localhost:8080/auth/signup"
        })
        .then((res) => setError(res.data));
    };

    function handleChange(e){
        e.preventDefault();

        if(password.current.value !== confirm_password.current.value){
            setError("Password and confirm password must match")
        }
        else{
            setError("");
        }
    }

    return (
        <div>
            <h3>Signup</h3>
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <label>Email</label>
                <input ref={email} type="email"/>
                <label>Password</label>
                <input ref={password} type="password" onChange={handleChange}/>
                <label>Confirm Password</label>
                <input ref={confirm_password} type="password" onChange={handleChange}/>
                <button>Sign Up</button>
                <p>Have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    )
}
