import {React, useRef} from 'react';
import Link from 'react-router-dom/Link';

export default function Login() {
    const email = useRef();
    const password = useRef();

    function handleSubmit(){
        
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
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
