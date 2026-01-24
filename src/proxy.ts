
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get token from cookies
    const token = request.cookies.get('accessToken')?.value;

    // Protected routes prefixes
    const protectedPrefixes = ['/admin', '/host', '/user', '/doctor', '/catering'];
    const isProtectedRoute = protectedPrefixes.some(prefix => pathname.startsWith(prefix));

    // Redirect unauthenticated users from protected routes
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If authenticated user tries to access login/register, redirect based on role
    if ((pathname === '/login' || pathname === '/signup') && token) {
        try {
            const decoded: any = jwtDecode(token);
            const userRole = decoded.role;
            
            // Redirect to appropriate dashboard based on role
            if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
                return NextResponse.redirect(new URL('/admin', request.url));
            } else if (userRole === 'HOST') {
                return NextResponse.redirect(new URL('/host', request.url));
            } else if (userRole === 'DOCTOR') {
                return NextResponse.redirect(new URL('/doctor', request.url));
            } else if (userRole === 'CATERING_SERVICE') {
                return NextResponse.redirect(new URL('/catering', request.url));
            } else {
                return NextResponse.redirect(new URL('/user', request.url));
            }
        } catch (error) {
            // If token is invalid, redirect to login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/host/:path*', '/user/:path*', '/doctor/:path*', '/catering/:path*', '/login', '/signup'],
};
