import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToSignup }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('calendar_users') || '[]');
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

        if (user) {
            onLogin(user);
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p>Login to your personalized calendar</p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full">Login</button>
                </form>
                <p className="auth-footer">
                    Don't have an account? <span onClick={onSwitchToSignup}>Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
