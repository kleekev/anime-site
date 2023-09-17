import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { ExclamationCircleFilled } from '@ant-design/icons'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await signup(username, email, password);
        console.log(error)
    }
    return (
        <div className="form">
            <form className="signup-form" onSubmit={handleSubmit} noValidate>
                <p>Sign Up</p>

                <label>Username:</label>
                <input 
                    type="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />

                <label>Email:</label>
                <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label>Password:</label>
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error"><ExclamationCircleFilled className="exclamation-error"/> {error}</div>}
            </form>
        </div>
        
    )
}

export default Signup