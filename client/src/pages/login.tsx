import React from 'react';
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',  // Centers horizontally
            alignItems: 'center',      // Centers vertically
            width: '100vw',            // Full viewport width
            height: '100vh',           // Full viewport height
            flexDirection: 'column'    // Stacks children vertically
        }}>
            <h1>Login</h1>
            <input type="text" placeholder="Username" style={{ margin: '8px 0', padding: '8px', width: '200px' }} />
            <input type="password" placeholder="Password" style={{ margin: '8px 0', padding: '8px', width: '200px' }} />
            <button style={{
                marginTop: '16px',
                padding: '10px 20px',
                backgroundColor: '#4CAF50', // Green color
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                borderRadius: '4px'
            }}>
                Submit
            </button>
            <p style={{ marginTop: "1%", fontSize: ".9rem" }}>Not a user? <a onClick={() => router.push("signup")} style={{ textDecoration: "underline", color: "blue" }}>signup</a></p>
        </div>
    );
};

export default Login;
