import React, { useRef, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Axios from 'axios';

import './Signup.css';

export default function Signup() {
    const email = useRef();
    const password = useRef();
    const confirm_password = useRef();
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
            url: "/auth/signup"
        })
        .then(res => {
            if(res.data.success){
                console.log(res.data.message);
                history.push('/login');
            } else{
                setError(res.data.message);
                email.current.value = "";
                password.current.value = "";
                confirm_password.current.value = "";
            }
        });
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
        <div className="signup-container">
            <h3 className="signup-header">Signup</h3>
            <form onSubmit={handleSubmit} className="signup-form">
                {error && <p className="signup-error">{error}</p>}
                <label className="signup-label">Email</label>
                <input ref={email} type="email" className="signup-input"/>
                <label className="signup-label">Password</label>
                <input ref={password} type="password" onChange={handleChange} className="signup-input"/>
                <label className="signup-label">Confirm Password</label>
                <input ref={confirm_password} type="password" onChange={handleChange} className="signup-input"/>
                <button className="signup-button">Sign Up</button>
                <p className="login">Have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    )
}
