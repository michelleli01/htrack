import { React, useRef } from 'react';
import Link from 'react-router-dom/Link';

export default function Signup() {
    const email = useRef();
    const password = useRef();
    const confirm_password = useRef();

    function handleSubmit(e){
        e.preventDefault();
        console.log(email.current.value, password.current.value, confirm_password.current.value)
    }

    return (
        <div>
            <h3>Signup</h3>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input ref={email} type="email"/>
                <label>Password</label>
                <input ref={password} type="password"/>
                <label>Confirm Password</label>
                <input ref={confirm_password} type="password"/>
                <button>Sign Up</button>
                <p>Have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    )
}
