import { NextRequest, NextResponse } from 'next/server'
 
const allowedOrigins = ['http://localhost:3000/', 'https://deployment.d320zbb017ekp0.amplifyapp.com/']
 
// const corsOptions = {
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// }
 
export function middleware(request: NextRequest) {
    // Get the origin domain from the request headers
    const origin = request.headers.get('Origin')
    console.log('origin', origin)

    // if origin is not allowed, return a 400 response
    if (origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: 'Bad Request, origin not allowed',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}
 
export const config = {
  matcher: '/api/:path*',
}