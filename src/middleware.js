import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    // Access the cookies
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken");


    if (!accessToken) {
        
        return NextResponse.redirect(new URL('/', request.url));
    }

    
    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*', // Apply this middleware to all routes under /admin
};