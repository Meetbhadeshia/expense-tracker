import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'


const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const notify = (message: string) => toast(message)

    const fetchLogin = async (apiEndpoint: string, user: { email: string; password: string }) => {
        return await fetch(`${apiEndpoint}/api/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            cache: "no-store",
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const apiEndpoint = process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT || ''
            const res = await fetchLogin(apiEndpoint, user)
            const data = await res.json()

            if (res.ok === true) {
                if (rememberMe) {
                    localStorage.setItem("userEmail", user.email)
                }
                // Safer to authenticate login through backend
                // localStorage.setItem("authToken", data.token)
                notify("Login Successful!")
                setTimeout(() => router.push("/"), 1000)
            }

            if (res.ok === false) {
                notify(data.errors?.join(", ") || "Invalid email or password.")
            }

        } catch (error) {
            console.error("Login Error:", error)
            notify("Something went wrong")
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={user.email}
                        className="login-input"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />

                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            value={user.password}
                            className="login-input"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>

                    <div className="remember-me">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label>Remember Me</label>
                    </div>

                    <button type="submit" className="login-button">
                        Submit
                    </button>

                    <Toaster />

                    <div className="login-links">
                        <a onClick={() => router.push("/forgot-password")}>
                            Forgot Password?
                        </a>
                        {" | "}
                        <a onClick={() => router.push("/signup")}>
                            Signup
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login
