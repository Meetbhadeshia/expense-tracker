import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

const Signup = () => {
    const router = useRouter()

    const [user, setUser] = useState(
        {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    )

    const submitUser = async () => {
        let newUser: Object = {
            name: user.name,
            email: user.email,
            password: user.password
        }
        if (user.password === user.confirmPassword) {

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/users`, {
                method: "POST",  // Specify the HTTP method
                headers: {
                    "Content-Type": "application/json",  // Specify that we're sending JSON
                },
                body: JSON.stringify(newUser),  // The request body
                cache: "no-store",
            })

            // if (res.ok) {
            // router.push("/login")
            // clearVariable()
            // } else {
            //     alert('Failed to register user')
            // }
            if (!res.ok) {
                // Parse the error response
                const errorData = await res.json();
                if (errorData.errors) {
                    errorData.errors.forEach((error: String) => {
                        console.error('Error:', error);
                    });
                } else {
                    console.error('Unexpected error response format', errorData);
                }
            } else {
                const data = await res.json();
                console.log('Success:', data);
                router.push("/login")
                clearVariable()
                // Handle successful response
            }

        } else {
            alert('Password and confirm password do not match')
        }
    }

    const clearVariable = () => {
        setUser({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

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

            <input
                type="text"
                placeholder="name"
                style={{ margin: '8px 0', padding: '8px', width: '200px' }}
                onChange={e => setUser({ ...user, name: e.target.value })}
            />

            <input
                type="email"
                placeholder="email"
                style={{ margin: '8px 0', padding: '8px', width: '200px' }}
                onChange={e => setUser({ ...user, email: e.target.value })}
            />

            <input
                type="password"
                placeholder="password"
                style={{ margin: '8px 0', padding: '8px', width: '200px' }}
                onChange={e => setUser({ ...user, password: e.target.value })}
            />

            <input
                type="password"
                placeholder="confirm password"
                style={{ margin: '8px 0', padding: '8px', width: '200px' }}
                onChange={e => setUser({ ...user, confirmPassword: e.target.value })}
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
            }} onClick={() => submitUser()}>
                Submit
            </button>
        </div>
    );
};

export default Signup;
