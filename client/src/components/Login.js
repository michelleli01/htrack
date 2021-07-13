import React from 'react';
import Link from 'react-router-dom/Link';

export default function Login() {
    return (
        <div>
            <h3>Login</h3>
            <form>
                <label>E-mail</label>
                <input/>
                <label>Password</label>
                <input/>
                <button>Login</button>
                <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
            </form>
        </div>
    )
}
