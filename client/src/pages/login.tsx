import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const loginUser = async () => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/users/login`, {
            method: "POST",  // Specify the HTTP method
            headers: {
                "Content-Type": "application/json",  // Specify that we're sending JSON
            },
            body: JSON.stringify(user),  // The request body
            cache: "no-store",
        })

        if (!res.ok) {
            // Parse the error response
            const errorData = await res.json();
            if (errorData.errors) {
                console.log('Errors:', errorData.errors);
                errorData.errors.forEach((error: String) => {
                    console.error('Error:', error);
                });
            } else {
                console.error('Unexpected error response format', errorData);
                notify("Fail")
            }
        } else {
            notify("Success")

            setInterval(() => {
                router.push("/")
            }, 5000)

            const data = await res.json();
        }
    }

    const notify = (message: string) => toast(message)

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

            <input type="text" placeholder="Username"
                style={{ margin: '8px 0', padding: '8px', width: '200px' }}
                onChange={e => setUser({ ...user, email: e.target.value })}
            />

            <input type="password" placeholder="Password"
                style={{ margin: '8px 0', padding: '8px', width: '200px' }}
                onChange={e => setUser({ ...user, password: e.target.value })}
            />

            <button style={{
                marginTop: '16px',
                padding: '10px 20px',
                backgroundColor: '#4CAF50', // Green color
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                borderRadius: '4px'
            }}
                onClick={() => loginUser()}>
                Submit
            </button>
            <Toaster />
            {/* <Message/> */}
            <p style={{ marginTop: "1%", fontSize: ".9rem" }}>Not a user? <a onClick={() => router.push("signup")} style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}>signup</a></p>
        </div >
    );
};

export default Login;
