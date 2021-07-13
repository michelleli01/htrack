import React from 'react';
import Link from 'react-router-dom/Link';

export default function Signup() {
    return (
        <div>
            <h3>Signup</h3>
            <form>
                <label>Email</label>
                <input/>
                <label>Password</label>
                <input/>
                <label>Confirm Password</label>
                <input/>
                <button>Sign Up</button>
                <p>Have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    )
}
