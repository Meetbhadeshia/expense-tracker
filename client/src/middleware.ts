import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // Check for authentication token in cookies (or other auth mechanism)
    const token = req.cookies.get("authToken"); // Modify as per your auth system
    // console.log('token', token)
    if (!token) {
        // If no token, redirect to the login page
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // If authenticated, allow access
    return NextResponse.next();
}

// Apply middleware only for the home page
export const config = {
    matcher: ['/', "/profile", '/expenses'], // Runs only for "/"
};
