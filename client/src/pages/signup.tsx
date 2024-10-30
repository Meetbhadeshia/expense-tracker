import React from 'react';
import { useRouter } from 'next/navigation'

const Signup = () => {
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
            <h1>Sign up</h1>
            <input type="text" placeholder="name" style={{ margin: '8px 0', padding: '8px', width: '200px' }} />
            <input type="email" placeholder="email" style={{ margin: '8px 0', padding: '8px', width: '200px' }} />
            <input type="password" placeholder="confirmPassword" style={{ margin: '8px 0', padding: '8px', width: '200px' }} />
            <input type="password" placeholder="confirmPassword" style={{ margin: '8px 0', padding: '8px', width: '200px' }} />
            <button style={{
                marginTop: '16px',
                padding: '10px 20px',
                backgroundColor: '#4CAF50', // Green color
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                borderRadius: '4px'
            }} onClick={() => router.push('/login')}>
                Submit
            </button>
        </div>
    );
};

export default Signup;
